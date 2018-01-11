import GltfLoader from '../Utilities/Loader/GltfLoader';

class SceneSubject{

    constructor(scene){
        this.radius = 2;
        this.mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(this.radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));
        this.mesh.position.set(0, 0, 0);

        // GltfLoader.load("http://localhost:9000/models/model.zip",
        //     (gltf) => {
        //         this._loadModelCallback(gltf, scene);
        //         this._bindEventListeners();
        //         // this._addText('testttttt');
        //     },
        //     (xhr) => {
        //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        //     },
        //     (error) => {
        //         console.log('Error!', error);
        //         return null;
        //     });


        // this.envMap = new THREE.CubeTextureLoader()
        //     .setPath('textures/cube/')
        //     .load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);


        scene.add(this.mesh);
    }

    update(n) {
        // const scale = Math.sin(n)+2;
        // this.mesh.scale.set(scale, scale, scale);
    }


    // _loadModelCallback(gltf, scene) {
    //     this.mesh = gltf.scene;

    //     scene.add(this.mesh);

    //     this.mesh.traverse((node) => {
    //         if (node.material && 'envMap' in node.material) {
    //             node.material.envMap = this.envMap;
    //             node.material.needsUpdate = true;

    //         }
    //     })

    //     document.dispatchEvent(new Event('Anim3D'));

    // }
}
export default SceneSubject;