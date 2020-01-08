import { Geometry, Vector3, Line, LineBasicMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

class VectorFromOrigin extends Line {
    constructor(rad, psi, theta, color) {
        const geo = new Geometry()

        geo.vertices.push(
            new Vector3(0, 0, 0),
            new Vector3().setFromSphericalCoords(rad, psi, theta),
        )

        super(geo, new LineBasicMaterial({ color }))
        this.state = { psi, theta }
    }

    rotateToSphericalCoords(psi, theta, duration) {
        return new Promise((resolve, reject) => {
            new TWEEN.Tween(this.state)
                .to({ psi, theta }, duration)
                .onUpdate(() => {
                    this.geometry.vertices[1].setFromSphericalCoords(1, this.state.psi, this.state.theta)
                    this.geometry.verticesNeedUpdate = true
                })
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(resolve)
                .start()
        })
    }
}

export default VectorFromOrigin
