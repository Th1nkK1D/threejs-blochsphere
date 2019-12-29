import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

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

function createUnitVectorLineFromOrigin(rad, psi, theta, color) {
    const geo = new THREE.Geometry()

    geo.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3().setFromSphericalCoords(rad, psi, theta),
    )

    return new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color })
    )
}

const xAxisLine = createUnitVectorLineFromOrigin(1.5, Math.PI/2, Math.PI/2, 0xff0000)
const yAxisLine = createUnitVectorLineFromOrigin(1.5, 0, Math.PI/2, 0x00ff00)
const zAxisLine = createUnitVectorLineFromOrigin(1.5, Math.PI/2, 0, 0x0000ff)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 90, 90),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
)

let state = { psi: Math.PI/2, theta: 0 }

const stateArrow = createUnitVectorLineFromOrigin(1, state.psi, state.theta, 0xffffff)

scene
    .add(sphere)
    .add(xAxisLine)
    .add(yAxisLine)
    .add(zAxisLine)
    .add(stateArrow)

function rotateStateArrow(psi, theta, duration) {
    new TWEEN.Tween(state)
        .to({ psi, theta }, duration)
        .onUpdate(() => {
            stateArrow.geometry.vertices[1].setFromSphericalCoords(1, state.psi, state.theta)
            stateArrow.geometry.verticesNeedUpdate = true
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
}

window.sphere = {
    animate,
    state,
    rotateStateArrow,
}
