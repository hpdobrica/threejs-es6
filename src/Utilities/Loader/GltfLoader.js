import ModelLoader from './ModelLoader';

export default class GltfLoader extends ModelLoader{
    constructor(){
        super();
    }

    static load(url, success, progress, error){
        let loader  = new THREE.GLTFLoader();
        loader.setCrossOrigin(true);
        this.loadModel(url).then((modelUrl) => {
            loader.load(modelUrl,
                success,
                progress,
                error)

        });
    }


}