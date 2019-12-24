const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)

function animate() {
    requestAnimationFrame(animate)
    TWEEN.update()
	renderer.render(scene, camera)
}

function createLineFromOrigin(x, y, z, color) {
    const geo = new THREE.Geometry()

    geo.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
    )

    return new THREE.Line(
        geo,
        new THREE.LineBasicMaterial( { color } )
    )
}

const xAxisLine = createLineFromOrigin(2, 0, 0, 0xff0000)
const yAxisLine = createLineFromOrigin(0, 2, 0, 0x00ff00)
const zAxisLine = createLineFromOrigin(0, 0, 2, 0x0000ff)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 90, 90),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
)

const stateArrow = createLineFromOrigin(0, 0, 1, 0xffffff)

scene
    .add(sphere)
    .add(xAxisLine)
    .add(yAxisLine)
    .add(zAxisLine)
    .add(stateArrow)

function rotateStateArrow(x, y, z, duration) {
    new TWEEN.Tween(stateArrow.rotation)
        .to({
            x: stateArrow.rotation.x + x,
            y: stateArrow.rotation.y + y,
            z: stateArrow.rotation.z + z,
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
}

animate()