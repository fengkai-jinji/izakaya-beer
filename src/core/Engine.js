import * as THREE from 'three';
import { createEnvironment } from '../utils/assets.js';
import { PALETTE } from '../utils/constants.js';
export class Engine {
 constructor(canvas){this.canvas=canvas;this.scene=new THREE.Scene();this.scene.fog=new THREE.FogExp2(PALETTE.bgDeep,.028);this.camera=new THREE.PerspectiveCamera(34,innerWidth/innerHeight,.1,100);this.camera.position.set(0,1.55,4.8);this.camera.lookAt(0,1,0);this.renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});const r=this.renderer;r.setClearColor(PALETTE.bgDeep);r.outputColorSpace=THREE.SRGBColorSpace;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.15;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;this.resize=this.resize.bind(this);addEventListener('resize',this.resize);this.resize();}
 async init(){this.environment=await createEnvironment(this.renderer);this.scene.environment=this.environment.texture;}
 resize(){this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));this.renderer.setSize(innerWidth,innerHeight,false);this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();}
 render(){this.renderer.render(this.scene,this.camera);if(import.meta.env.DEV&&this.reported!==this.renderer.info.render.calls){this.reported=this.renderer.info.render.calls;console.info('Izakaya render statistics',JSON.stringify(this.renderer.info.render));}}
 dispose(){removeEventListener('resize',this.resize);this.environment?.dispose();this.renderer.dispose();}
}
