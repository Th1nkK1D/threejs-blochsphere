import { LineLoop, CircleGeometry, LineBasicMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

class Ripple extends LineLoop {
    constructor(radius, material) {
        const circleGeo = new CircleGeometry(1.01, 64)

        circleGeo.vertices.shift()

        super(
            circleGeo,
            new LineBasicMaterial(material)
        )

        this.rippleRadius = { value: radius }
    }

    animateFromVector(vectorFromOrigin) {
        new TWEEN.Tween(this.rippleRadius)
            .to({ value: 0 }, 2000)
            .onUpdate(() => {
                this.lookAt(vectorFromOrigin.geometry.vertices[1])
                this.position.setFromSphericalCoords(
                    this.rippleRadius.value,
                    vectorFromOrigin.state.psi,
                    vectorFromOrigin.state.theta
                )
                this.scale.setScalar(Math.sqrt(1-this.rippleRadius.value*this.rippleRadius.value))
                this.material.opacity = this.rippleRadius.value
            })
            .easing(TWEEN.Easing.Quadratic.Out)
            .repeat(Infinity)
            .start()
    }
}

export default Ripple
