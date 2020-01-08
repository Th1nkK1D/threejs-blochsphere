import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

import UnitSphere from './objects/UnitSphere'
import VectorFromOrigin from './objects/VectorFromOrigin'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)

function run() {
    animateScene()
    // animateRipple()
}

function animateScene() {
    requestAnimationFrame(animateScene)
    TWEEN.update()
	renderer.render(scene, camera)
}

const sphere = new UnitSphere({ color: 0xffffff, transparent: true, opacity: 0.3 })
const xAxisLine = new VectorFromOrigin(1.5, Math.PI/2, Math.PI/2, 0xff0000)
const yAxisLine = new VectorFromOrigin(1.5, 0, Math.PI/2, 0x00ff00)
const zAxisLine = new VectorFromOrigin(1.5, Math.PI/2, 0, 0x0000ff)
const stateArrow = new VectorFromOrigin(1, Math.PI/2, 0, 0xffffff)

const rippleRadius = { value: 1 }
const circleGeo = new THREE.CircleGeometry(1.01, 64)

circleGeo.vertices.shift()

const ripple = new THREE.LineLoop(
    circleGeo,
    new THREE.LineBasicMaterial({ color: 0xffff00, transparent: true })
)

// ripple.position.setFromSphericalCoords(rippleRadius.value, state.psi, state.theta)

scene
    .add(sphere)
    .add(xAxisLine)
    .add(yAxisLine)
    .add(zAxisLine)
    .add(stateArrow)
    .add(ripple)

function rotateStateArrowBy(psi, theta) {
    stateArrow.rotateToSphericalCoords(
        stateArrow.state.psi + psi,
        stateArrow.state.theta + theta,
        1000
    )
}

// function animateRipple() {
//     new TWEEN.Tween(rippleRadius)
//         .to({ value: 0 }, 2000)
//         .onUpdate(() => {
//             ripple.lookAt(stateArrow.geometry.vertices[1])
//             ripple.position.setFromSphericalCoords(rippleRadius.value, state.psi, state.theta)
//             ripple.scale.setScalar(Math.sqrt(1-rippleRadius.value*rippleRadius.value))
//             ripple.material.opacity = rippleRadius.value
//         })
//         .easing(TWEEN.Easing.Quadratic.Out)
//         .repeat(Infinity)
//         .start()
// }

window.sphere = {
    run,
    rotateStateArrowBy,
}
