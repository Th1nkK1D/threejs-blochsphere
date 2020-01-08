import { Geometry, Vector3, Line, LineBasicMaterial } from 'three'
import TWEEN from '@tweenjs/tween.js'

class ArcLine extends Line {
    constructor(material) {
        const geo = new Geometry()

        geo.vertices.push(
            new Vector3(),
            new Vector3(),
        )

        super(geo, new LineBasicMaterial(material))
    }

    expandTo(fromSpericalCoords, toSpericalCoords, duration) {
        this.geometry.vertices.forEach(vertice =>
            vertice.setFromSphericalCoords(1, fromSpericalCoords.psi, fromSpericalCoords.theta)
        )

        return new Promise((resolve, reject) => {
            new TWEEN.Tween(this.geometry.vertices[1])
                .to(new Vector3().setFromSphericalCoords(1, toSpericalCoords.psi, toSpericalCoords.theta), duration)
                .onUpdate(() => {
                    this.geometry.verticesNeedUpdate = true
                })
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(resolve)
                .start()
            }
        )
    }
}

export default ArcLine
