import { Geometry, Vector3, Line, LineBasicMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

class ArcLine extends Line {
    constructor(material) {
        super(new Geometry(), new LineBasicMaterial(material))
    }

    expandTo(fromSpericalCoords, toSpericalCoords, duration) {
        const currentSpericalCoords = { ...fromSpericalCoords }

        this.geometry.vertices = []

        return new Promise((resolve, reject) => {
            new TWEEN.Tween(currentSpericalCoords)
                .to(toSpericalCoords, duration)
                .onUpdate(() => {
                    const geo = new Geometry()

                    geo.vertices = [...this.geometry.vertices, new Vector3().setFromSphericalCoords(1, currentSpericalCoords.psi, currentSpericalCoords.theta)]
                    this.geometry.dispose()
                    this.geometry = geo
                })
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(resolve)
                .start()
            }
        )
    }
}

export default ArcLine
