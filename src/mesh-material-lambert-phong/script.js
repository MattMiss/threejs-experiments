import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from "tweakpane";

const canvas = document.querySelector("canvas.threejs");

// initialize a pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const torusGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1,1);

// initialize the mesh lambert material
const material = new THREE.MeshLambertMaterial();
material.color = new THREE.Color('blue');

// initialize the mesh phong material
const material2 = new THREE.MeshPhongMaterial();
material2.color = new THREE.Color('red');
material2.specular = new THREE.Color('white');

const phongFolder = pane.addFolder({
  title: 'Mesh Phong'
})

// Add slider for MeshPhongMaterial shininess value
phongFolder.addBinding(material2, 'shininess', {
  min: 0,
  max: 100,
  step: 1
})

// initialize the mesh standard material
const material3 = new THREE.MeshStandardMaterial();
material3.color = new THREE.Color('green');
material3.specular = new THREE.Color('white');

const standardFolder = pane.addFolder({
  title: 'Mesh Standard'
})

// Add slider for MeshStandardMaterial metalness value
standardFolder.addBinding(material3, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01
})

// Add slider for MeshStandardMaterial roughness value
standardFolder.addBinding(material3, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01
})

// initialize the mesh physical material
const material4 = new THREE.MeshPhysicalMaterial();
material4.color = new THREE.Color('purple');
material4.specular = new THREE.Color('white');

const physicalFolder = pane.addFolder({
  title: 'Mesh Physical'
})

// Add slider for MeshPhysicalMaterial metalness value
physicalFolder.addBinding(material4, 'metalness', {
  min: 0,
  max: 1,
  step: 0.01
})

// Add slider for MeshPhysicalMaterial roughness value
physicalFolder.addBinding(material4, 'roughness', {
  min: 0,
  max: 1,
  step: 0.01
})

// Add slider for MeshPhysicalMaterial reflectivity value
physicalFolder.addBinding(material4, 'reflectivity', {
  min: 0,
  max: 1,
  step: 0.01
})

// Add slider for MeshPhysicalMaterial clearcoat value
physicalFolder.addBinding(material4, 'clearcoat', {
  min: 0,
  max: 1,
  step: 0.01
})

const torusMesh = new THREE.Mesh(torusGeometry, material2);
const torusMesh2 = new THREE.Mesh(torusGeometry, material3);
torusMesh2.position.x = 3;
const torusMesh3 = new THREE.Mesh(torusGeometry, material4);
torusMesh3.position.x = 5;
const cubeMesh = new THREE.Mesh(cubeGeometry, material);
cubeMesh.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material2);
plane.position.x = -1.5;

scene.add(torusMesh);
scene.add(torusMesh2);
scene.add(torusMesh3);
scene.add(cubeMesh);
scene.add(plane);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 55);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

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
camera.position.x = 2;

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



