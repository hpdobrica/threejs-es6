import * as THREE from './vendor/three.module.js';
import SceneManager from './SceneManager.js';

global.THREE = THREE;

const canvas = document.getElementById('app');
const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
}

function render() {
    requestAnimationFrame(render);
    sceneManager.update();
};

function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize(canvas);
}