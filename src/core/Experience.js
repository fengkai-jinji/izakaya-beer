import { Engine } from './Engine.js';
import { CameraRig } from './CameraRig.js';
import { ScrollManager } from './ScrollManager.js';
import { Scene01Fridge } from '../scenes/Scene01Fridge.js';
import { PhysicsSystem } from '../systems/PhysicsSystem.js';
import { ParticleSystem } from '../systems/ParticleSystem.js';
import { AudioManager } from '../systems/AudioManager.js';
import { Overlay } from '../ui/Overlay.js';
export class Experience {
 constructor(canvas,overlayRoot){this.engine=new Engine(canvas);this.cameraRig=new CameraRig(this.engine.camera);this.audio=new AudioManager();this.physics=new PhysicsSystem(this.audio);this.particles=new ParticleSystem(this.engine.scene);this.overlay=new Overlay(overlayRoot,this.audio);this.scene=new Scene01Fridge(this.engine,{physics:this.physics,particles:this.particles,audio:this.audio});this.elapsed=0;this.last=0;this.frame=this.frame.bind(this);}
 async init(){await this.engine.init();await this.physics.init();await this.scene.init();this.scene.onEnter();this.scroll=new ScrollManager(p=>{this.scene.setProgress(p);this.cameraRig.setProgress(p);this.overlay.setProgress(p);});this.frameId=requestAnimationFrame(this.frame);}
 frame(time){if(this.disposed)return;const dt=Math.min(.05,this.last?(time-this.last)/1000:1/60);this.last=time;this.elapsed+=dt;this.scroll.update(dt);this.physics.update(dt);this.scene.update(dt,this.elapsed);this.particles.update(dt);this.engine.render();this.frameId=requestAnimationFrame(this.frame);}
 dispose(){if(this.disposed)return;this.disposed=true;cancelAnimationFrame(this.frameId);this.scroll?.dispose();this.scene.dispose();this.particles.dispose();this.physics.dispose();this.audio.dispose();this.overlay.dispose();this.engine.dispose();}
}
