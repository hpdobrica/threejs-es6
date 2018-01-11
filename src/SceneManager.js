import GeneralLights from './sceneSubjects/GeneralLights.js';
import SceneSubject from './sceneSubjects/SceneSubject.js';

export default class SceneManager{
    constructor(canvas){
        let {width, height} = canvas;
        this.screenConfig = {
            width: width,
            height: height,
            near: 0.1,
            far: 2000,
            fov: 75
        };
        // this.clock = THREE.Clock();
        this.speed = 0.001;

        this.postprocessing = {
            enabled: false
        };

        this._buildScene();
        this._buildRender(this.screenConfig, canvas);
        this._buildCamera(this.screenConfig);
        // this._initPostprocessing();
        this._createSceneSubjects(this.scene);
    }

    update() {

        for(let i=0; i<this.sceneSubjects.length; i++){
            this.sceneSubjects[i].update(Date.now()*this.speed);
        }

        this.cameraControls.update();

        if (this.postprocessing.enabled) {
            this.effectComposer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize(canvas) {
        const { width, height } = canvas;

        this.screenConfig.width = width;
        this.screenConfig.height = height;

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
            alpha: true
        });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        this.renderer.setPixelRatio(DPR);
        this.renderer.setSize(width, height);

        // this.renderer.setClearColor(0xff0000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
    }

    _buildCamera({ width, height, near, far, fov }){
        const aspectRatio = width / height;
        this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
        this.camera.position.z = 1;
        this.camera.position.y = -5;
        window.camera = this.camera;
        this._buildCameraControls();
    }

    _createSceneSubjects(){
        this.sceneSubjects = [
            new GeneralLights(this.scene, this.screenConfig),
            new SceneSubject(this.scene)
        ];

    }


    _buildCameraControls() {

        this.cameraControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        let settings = {
            maxPolarAngle: Math.PI / 2 + 1,
            autoRotate: false,
            autoRotateSpeed: 1,
            minDistance: 0,
            maxDistance: 100
        };
        for (let key in settings) {
            this.cameraControls[key] = settings[key];
        }

    }

    _initPostprocessing() {
        this.postprocessing.enabled = true;
        this.renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.ssaoPass = new THREE.SSAOPass(this.scene, this.camera);
        this.ssaoPass.renderToScreen = true;
        global.ssao = this.ssaoPass;
        this.effectComposer = new THREE.EffectComposer(this.renderer);
        this.effectComposer.addPass(this.renderPass);
        this.effectComposer.addPass(this.ssaoPass);
    }


}
