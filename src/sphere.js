import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

import UnitSphere from './objects/UnitSphere'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.set(5, 5, 5)
camera.lookAt(0, 0, 0)

function run() {
    animateScene()
    animateRipple()
}

function animateScene() {
    requestAnimationFrame(animateScene)
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

const sphere = new UnitSphere({ color: 0xffffff, transparent: true, opacity: 0.3 })

let state = { psi: Math.PI/2, theta: 0 }

const stateArrow = createUnitVectorLineFromOrigin(1, state.psi, state.theta, 0xffffff)

const rippleRadius = { value: 1 }
const circleGeo = new THREE.CircleGeometry(1.01, 64)

circleGeo.vertices.shift()

const ripple = new THREE.LineLoop(
    circleGeo,
    new THREE.LineBasicMaterial({ color: 0xffff00, transparent: true })
)

ripple.position.setFromSphericalCoords(rippleRadius.value, state.psi, state.theta)

scene
    .add(sphere)
    .add(xAxisLine)
    .add(yAxisLine)
    .add(zAxisLine)
    .add(stateArrow)
    .add(ripple)

function rotateStateArrow(psi, theta, duration) {
    new TWEEN.Tween(state)
        .to({ psi, theta }, duration)
        .onUpdate(() => {
            stateArrow.geometry.vertices[1].setFromSphericalCoords(1, state.psi, state.theta)
            stateArrow.geometry.verticesNeedUpdate = true
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .start()
}

function animateRipple() {
    new TWEEN.Tween(rippleRadius)
        .to({ value: 0 }, 2000)
        .onUpdate(() => {
            ripple.lookAt(stateArrow.geometry.vertices[1])
            ripple.position.setFromSphericalCoords(rippleRadius.value, state.psi, state.theta)
            ripple.scale.setScalar(Math.sqrt(1-rippleRadius.value*rippleRadius.value))
            ripple.material.opacity = rippleRadius.value
        })
        .easing(TWEEN.Easing.Quadratic.Out)
        .repeat(Infinity)
        .start()
}

window.sphere = {
    run,
    state,
    rotateStateArrow,
}
