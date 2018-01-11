
export default class ModelLoader{ // ABSTRACT CLASS
    constructor() {
        //make class abstract
        if (this.constructor === ModelLoader) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        if(this.load === undefined){
            throw new TypeError("Must override the load function");
        }

    }

    static loadModel(url){
        return this._fetchModel(url)
            .then(function success(zip) {
                for(let key in zip.files){
                    if(key.split('.').pop() === 'glb'){
                        console.log("file async blob");
                        return zip.files[key].async('blob');
                    }
                }

            }, function error(e) {
                console.log(e);
            }).then(function(blob){
                return URL.createObjectURL(blob);;
            }, function error(e){
                console.log(e);
            })
    }


    static _fetchModel(url){
        let jszip = require('jszip');
        return fetch(url)
            .then(function (response) {
                if (response.status === 200 || response.status === 0) {
                    return Promise.resolve(response.blob());
                } else {
                    return Promise.reject(new Error(response.statusText));
                }
            }, function(e){
                console.log(e);
            })
            .then(jszip.loadAsync);
    }
}