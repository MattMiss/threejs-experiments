import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

const canvas = document.querySelector("canvas.threejs");

const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// add objects to the scene (uv2 is used for ambient occlusion maps)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeUv2 = new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2);
cubeGeometry.setAttribute('uv2', cubeUv2);

const torusGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const torusUv2 = new THREE.BufferAttribute(torusGeometry.attributes.uv.array, 2);
torusGeometry.setAttribute('uv2', torusUv2);

const planeGeometry = new THREE.PlaneGeometry(1,1);
const planeUv2 = new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2);
planeGeometry.setAttribute('uv2', planeUv2);

const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const sphereUv2 = new THREE.BufferAttribute(sphereGeometry.attributes.uv.array, 2);
sphereGeometry.setAttribute('uv2', sphereUv2);

const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const cylinderUv2 = new THREE.BufferAttribute(cylinderGeometry.attributes.uv.array, 2);
cylinderGeometry.setAttribute('uv2', cylinderUv2);


// initialize the grass textures (downloaded from: https://freepbr.com/product/wispy-grass-meadow/)
const grassAlbedo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png');
const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png');
const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png');
const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png');
const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png');
const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png');

// initialize the space cruiser textures (downloaded from: https://freepbr.com/product/space-cruiser-panels2-pbr/)
const spaceCruiserAlbedo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png');
const spaceCruiserAo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png');
const spaceCruiserHeight = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png');
const spaceCruiserMetallic = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png');
const spaceCruiserNormal = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png');
const spaceCruiserRoughness = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png');

// initialize the boulder textures (downloaded from: https://freepbr.com/product/badlands-boulders-pbr/)
const boulderAlbedo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png');
const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png');
const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png');
const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png');
const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png');
const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png');

// Repeat/wrap texture if needed
// textureTest.repeat.set(2, 2);
// textureTest.wrapS = THREE.RepeatWrapping;
// textureTest.wrapT = THREE.RepeatWrapping;

// pane.addBinding(textureTest, 'offset', {
//   x: {
//     min: 0,
//     max: 1,
//     step: 0.001
//   },
//   y: {
//     min: 0,
//     max: 1,
//     step: 0.001
//   }
// })


// initialize grass material
const grassMaterial = new THREE.MeshStandardMaterial();
grassMaterial.map = grassAlbedo;
grassMaterial.aoMap = grassAo;
grassMaterial.roughnessMap = grassRoughness;
grassMaterial.metalnessMap = grassMetallic;
grassMaterial.normalMap = grassNormal;
grassMaterial.displacementMap = grassHeight; //will mess the models up a bit
grassMaterial.displacementScale = 0.1;

const grassFolder = pane.addFolder({
  title: 'Grass Material',
  expanded: true
})

grassFolder.addBinding(grassMaterial, 'metalness', {min: 0, max: 1, step: 0.01});
grassFolder.addBinding(grassMaterial, 'roughness', {min: 0, max: 1, step: 0.01});
grassFolder.addBinding(grassMaterial, 'displacementScale', {min: 0, max: 1, step: 0.01});
grassFolder.addBinding(grassMaterial, 'aoMapIntensity', {min: 0, max: 1, step: 0.01});

// initialize the boulder material
const boulderMaterial = new THREE.MeshStandardMaterial();
boulderMaterial.map = boulderAlbedo;
boulderMaterial.aoMap = boulderAo;
boulderMaterial.roughnessMap = boulderRoughness;
boulderMaterial.metalnessMap = boulderMetallic;
boulderMaterial.normalMap = boulderNormal;
boulderMaterial.displacementMap = boulderHeight; //will mess the models up a bit
boulderMaterial.displacementScale = 0.1;

const boulderFolder = pane.addFolder({
  title: 'Boulder Material',
  expanded: true
})

boulderFolder.addBinding(boulderMaterial, 'metalness', {min: 0, max: 1, step: 0.01});
boulderFolder.addBinding(boulderMaterial, 'roughness', {min: 0, max: 1, step: 0.01});
boulderFolder.addBinding(boulderMaterial, 'displacementScale', {min: 0, max: 1, step: 0.01});
boulderFolder.addBinding(boulderMaterial, 'aoMapIntensity', {min: 0, max: 1, step: 0.01});

// initialize the space cruiser material
const spaceCruiserMaterial = new THREE.MeshStandardMaterial();
spaceCruiserMaterial.map = spaceCruiserAlbedo;
spaceCruiserMaterial.aoMap = spaceCruiserAo;
spaceCruiserMaterial.roughnessMap = spaceCruiserRoughness;
spaceCruiserMaterial.metalnessMap = spaceCruiserMetallic;
spaceCruiserMaterial.normalMap = spaceCruiserNormal;
spaceCruiserMaterial.displacementMap = spaceCruiserHeight; //will mess the models up a bit
spaceCruiserMaterial.displacementScale = 0.1;

const spaceCruiserFolder = pane.addFolder({
  title: 'Space Cruiser Material',
  expanded: true
})

spaceCruiserFolder.addBinding(spaceCruiserMaterial, 'metalness', {min: 0, max: 1, step: 0.01});
spaceCruiserFolder.addBinding(spaceCruiserMaterial, 'roughness', {min: 0, max: 1, step: 0.01});
spaceCruiserFolder.addBinding(spaceCruiserMaterial, 'displacementScale', {min: 0, max: 1, step: 0.01});
spaceCruiserFolder.addBinding(spaceCruiserMaterial, 'aoMapIntensity', {min: 0, max: 1, step: 0.01});

// initialize a group
// const meshGroup = new THREE.Group();

// const cubeMesh = new THREE.Mesh(cubeGeometry, material);
// const torusMesh = new THREE.Mesh(torusGeometry, material);
// torusMesh.position.x = 1.5;
// const sphereMesh = new THREE.Mesh(sphereGeometry, material);
// sphereMesh.position.z = 1.5;
// const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
// cylinderMesh.position.z = -1.5;
// const plane = new THREE.Mesh(planeGeometry, material);
// plane.position.x = -1.5;

// // Add meshes to the scene
// meshGroup.add(torusMesh, sphereMesh, cylinderMesh, cubeMesh, plane);
// scene.add(meshGroup);

// initialize sphereGroup
const sphereGroup = new THREE.Group();

const sphere1Mesh = new THREE.Mesh(sphereGeometry, grassMaterial);
const sphere2Mesh = new THREE.Mesh(sphereGeometry, boulderMaterial);
sphere2Mesh.position.x = 1.5;
const sphere3Mesh = new THREE.Mesh(sphereGeometry, spaceCruiserMaterial);
sphere3Mesh.position.x = -1.5;

sphereGroup.add(sphere1Mesh, sphere2Mesh, sphere3Mesh);
scene.add(sphereGroup);

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
  // rotate each mesh in the meshGroup
  sphereGroup.children.forEach(child => {
    if (child instanceof THREE.Mesh){
      child.rotation.y += THREE.MathUtils.degToRad(.05);
    }
  })

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



