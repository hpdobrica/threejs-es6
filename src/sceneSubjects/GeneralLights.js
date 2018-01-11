import { PointLightHelper } from "../vendor/three.module";

class GeneralLights{
    constructor(scene, {near,far}){
        this.lights = [];

        this.lights[0] = new THREE.PointLight(0xffffff, 1, 10);
        this.lights[0].position.set(0, 0, 3);

        this.lights[1] = new THREE.PointLight(0xffffff, 1, 10);
        this.lights[1].position.set(0, 0, -3);

        this.lights[2] = new THREE.PointLight(0xffffff, 1, 10);
        this.lights[2].position.set(3, 0, 0);

        this.lights[3] = new THREE.PointLight(0xffffff, 1, 10);
        this.lights[3].position.set(-3, 0, 0);
        // this.lights[3].isShadowLight = true;

        this.lights[4] = new THREE.AmbientLight( 0x404040 );


        this.lights.forEach(function (light) {

            if (light.isShadowLight) {
                light.castShadow = true;
                light.shadow.mapSize.width = 4096;
                light.shadow.mapSize.height = 4096;
                light.shadow.bias = -0.0001;
                light.shadow.camera.near = near;
                light.shadow.camera.far = far;
                light.shadow.radius = 10;
            }
            scene.add(light);
            // let helper = new THREE.PointLightHelper(light, 1, 0x00ff00);
            // scene.add( helper );
        });
    }

    update(time) {
        this.lights[0].intensity = (Math.sin(time)+1.5)/1.5;
        this.lights[0].color.setHSL( Math.sin(time), 0.5, 0.5 );
    }
}
export default GeneralLights;