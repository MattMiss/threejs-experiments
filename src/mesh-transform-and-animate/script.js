import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector("canvas.threejs");

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMaterial);
cubeMesh.rotation.y = THREE.MathUtils.degToRad(45); // same as Math.PI * 0.25;
const cubeMesh2 = new THREE.Mesh(cubeGeometry,cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new THREE.Mesh(cubeGeometry,cubeMaterial);
cubeMesh3.position.z = 2;

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);
group.scale.setScalar(2)

console.log(cubeMesh);
console.log(scene);

scene.add(group);

// cubeMesh.position.y = 1;
// cubeMesh.scale.y = 2;

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// initialize the perspective camera
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight,
  0.1,
  200
)

// position the camera
camera.position.z = 10;
camera.position.y = 10;

// initialize the renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // rotate cubemesh slowly
  cubeMesh.rotation.y -= THREE.MathUtils.degToRad(1) * delta * 40;

  // oscillate cubemesh scale
  cubeMesh.scale.setScalar(Math.sin(currentTime) + 1); 

  //console.log(Math.sin(currentTime));

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



