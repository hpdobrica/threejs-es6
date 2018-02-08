import * as THREE from './vendor/three.module';

window.THREE = THREE;
require('./lib/orbitControls.js');
require('./lib/gltfLoader.js');
require('./lib/effectComposer.js');

import SceneManager from './SceneManager'; // eslint-disable-line import/first

const canvas = document.getElementById('app');
const sceneManager = new SceneManager(canvas);


function bindEventListeners() {
  window.onresize = function onresize() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize(canvas);
  };

  // start render loop on Anim3D custom event (when model is loaded)
  // document.addEventListener('Anim3D', function (e) {
  //     render();
  // });
}

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}

bindEventListeners();

// automatically start render loop, comment out to stop
render();

