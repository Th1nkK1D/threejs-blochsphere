import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

import UnitSphere from './objects/UnitSphere'
import VectorFromOrigin from './objects/VectorFromOrigin'
import Ripple from './objects/Ripple'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

const sphere = new UnitSphere({ color: 0xffffff, transparent: true, opacity: 0.3 })
const xAxisLine = new VectorFromOrigin(1.5, Math.PI/2, Math.PI/2, 0xff0000)
const yAxisLine = new VectorFromOrigin(1.5, 0, Math.PI/2, 0x00ff00)
const zAxisLine = new VectorFromOrigin(1.5, Math.PI/2, 0, 0x0000ff)
const stateArrow = new VectorFromOrigin(1, Math.PI/2, 0, 0xffffff)
const ripple = new Ripple(1, { color: 0xffff00, transparent: true })

function run() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)

    scene
        .add(sphere)
        .add(xAxisLine)
        .add(yAxisLine)
        .add(zAxisLine)
        .add(stateArrow)
        .add(ripple)

    animateScene()
    ripple.animateFromVector(stateArrow)
}

function animateScene() {
    requestAnimationFrame(animateScene)
    TWEEN.update()
	renderer.render(scene, camera)
}

function rotateStateArrowBy(psi, theta) {
    stateArrow.rotateToSphericalCoords(
        stateArrow.state.psi + psi,
        stateArrow.state.theta + theta,
        1000
    )
}

window.sphere = {
    run,
    rotateStateArrowBy,
}
