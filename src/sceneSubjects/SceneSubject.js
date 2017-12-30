class SceneSubject{

    constructor(scene){
        // this.radius = 2;
        // this.mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(this.radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));
        // this.mesh.position.set(0, 0, -20);
        let geometry = new THREE.SphereBufferGeometry(5,16,16);
        let material = new THREE.MeshBasicMaterial( {color: 0x000000} );
        this.mesh = new THREE.Mesh( geometry, material );
        global.point = this.mesh;
        scene.add(this.mesh);
    }

    update(n) {
        // const scale = Math.sin(n)+2;
        // this.mesh.scale.set(scale, scale, scale);
        let choice = this._getRandomInt(0,4);
        if(choice == 0){
            this.mesh.position.x++;
        }else if(choice == 1){
            this.mesh.position.x--;
        }else if(choice == 2){
            this.mesh.position.y++;
        }else{
            this.mesh.position.y--;
        }
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
}
export default SceneSubject;