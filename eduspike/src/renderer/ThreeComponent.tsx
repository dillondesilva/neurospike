import * as THREE from 'three';
import './App.css';

function ThreeComponent() {
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );

  camera.position.z = 1;

  const scene = new THREE.Scene();
  const loader = new THREE.ObjectLoader();
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);

//   const reader = new FileReader();

//   const value = reader.readAsDataURL('../../assets/models/atom.obj');
//   loader.load(
//     // resource URL
//     'assets/models/atom.obj',

//     // onLoad callback
//     // Here the loaded data is assumed to be an object
//     function (obj) {
//       // Add the loaded object to the scene
//       scene.add(obj);
//     },

//     // onProgress callback
//     function (xhr) {
//       console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
//     },

//     // onError callback
//     function (err) {
//       console.error(err);
//     }
//   );

    const geometry = new THREE.SphereGeometry(0.1, 0.2, 0.1);
    const material = new THREE.MeshNormalMaterial();

  //   const mesh = new THREE.Mesh(geometry, material);
  //   scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   const animation = (time: number) => {
  //     mesh.rotation.x = time / 2000;
  //     mesh.rotation.y = time / 1000;
  //     renderer.render(scene, camera);
  //   };

  //   renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  return (
    <div>
      <h1>hlelo</h1>
    </div>
  );
}

export default ThreeComponent;
