import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector("canvas.threejs");

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

// create custom geometry
const vertices = new Float32Array([
  0, 0, 0,  // first point
  0, 2, 0,  // second point
  2, 0, 0   // third point
]);

const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

const triangleGeometry = new THREE.BufferGeometry();
triangleGeometry.setAttribute('position', bufferAttribute);

const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

const triangleMesh = new THREE.Mesh(triangleGeometry, cubeMaterial)
triangleMesh.rotation.y = THREE.MathUtils.degToRad(180);

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.position.x = 1;

scene.add(triangleMesh);
scene.add(cubeMesh);

// initialize the perspective camera
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight,
  0.1,
  200
)

// position the camera
camera.position.z = 5;
camera.position.y = 5;

// initialize the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}

renderloop();

const setCameraAspect = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

setCameraAspect();

window.addEventListener('resize', () => {
  setCameraAspect();
});



