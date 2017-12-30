import GeneralLights from './sceneSubjects/GeneralLights.js';
import SceneSubject from './sceneSubjects/SceneSubject.js';

export default class SceneManager{



    constructor(canvas){
        let {width, height} = canvas;
        this.screenDimensions = {
            width: width,
            height :height
        };
        // this.clock = THREE.Clock();
        this.speed = 0.001;

        this._buildScene();
        this._buildRender(this.screenDimensions, canvas);
        this._buildCamera(this.screenDimensions);
        this._createSceneSubjects(this.scene);
    }

    update() {

        for(let i=0; i<this.sceneSubjects.length; i++){
            this.sceneSubjects[i].update(Date.now()*this.speed);
        }
        this.count+= 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize(canvas) {
        const { width, height } = canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    _buildScene(){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#000");
    }

    _buildRender({width, height}, canvas){
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
             preserveDrawingBuffer: true
        });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        this.renderer.setPixelRatio(DPR);
        this.renderer.setSize(width, height);
        this.renderer.autoClearColor   = false;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
    }

    _buildCamera({width,height}){
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 2000;
        this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        this.camera.position.z = 2000;

        global.camera = this.camera;
    }
    _createSceneSubjects(){
        this.sceneSubjects = [
            new GeneralLights(this.scene),
            new SceneSubject(this.scene)
        ];

    }


}
