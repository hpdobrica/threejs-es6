class SceneSubject{

    constructor(scene){
        this.radius = 2;
        this.mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(this.radius, 2), new THREE.MeshStandardMaterial({ flatShading: true }));
        this.mesh.position.set(0, 0, -20);

        scene.add(this.mesh);
    }

    update(n) {
        const scale = Math.sin(n)+2;
        this.mesh.scale.set(scale, scale, scale);
    }
}
export default SceneSubject;