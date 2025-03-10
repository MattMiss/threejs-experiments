import * as THREE from 'three';

const canvas = document.querySelector("canvas.threejs");

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

console.log(cubeMesh);
console.log(scene);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  30
)

// position the camera
camera.position.z = 5;

// initialize the renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);