import { sampleCamera } from '../utils/constants.js';
export { sampleCamera } from '../utils/constants.js';
export class CameraRig {constructor(camera){this.camera=camera;}setProgress(p){const k=sampleCamera(p);this.camera.position.fromArray(k.position);this.camera.lookAt(...k.lookAt);if(this.camera.fov!==k.fov){this.camera.fov=k.fov;this.camera.updateProjectionMatrix();}}}
