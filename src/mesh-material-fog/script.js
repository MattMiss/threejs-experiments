import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector("canvas.threejs");

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1,1);

const material = new THREE.MeshBasicMaterial({
  color: "limeGreen",
  side: THREE.DoubleSide 
});

const material2 = new THREE.MeshBasicMaterial({
  color: "limeGreen",
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide 
});
material2.fog = false;

const material3 = new THREE.MeshBasicMaterial({
  color: "limeGreen",
  side: THREE.DoubleSide, 
  fog: false
});

const fog = new THREE.Fog('gray', 1, 10);
scene.fog = fog;
scene.background = new THREE.Color('gray');

const cubeMesh = new THREE.Mesh(cubeGeometry, material);
const cubeMesh2 = new THREE.Mesh(cubeGeometry, material2);
cubeMesh2.position.z = 1.5;

const plane = new THREE.Mesh(planeGeometry, material3);
plane.position.z = -1.5;

scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(plane);

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



