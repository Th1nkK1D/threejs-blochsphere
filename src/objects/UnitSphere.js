import { Mesh, SphereGeometry, MeshBasicMaterial } from 'three'

class UnitSphere extends Mesh {
    constructor(material) {
        super(
            new SphereGeometry(1, 90, 90),
            new MeshBasicMaterial(material)
        )
    }
}

export default UnitSphere
