import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export class ScrollManager {
 constructor(onProgress){this.onProgress=onProgress;this.progress=0;this.target=0;this.lastTime=performance.now();this.trigger=ScrollTrigger.create({trigger:'#scroll-track',start:()=>0,end:()=>innerHeight*1.6,invalidateOnRefresh:true,onUpdate:self=>{this.target=self.progress;}});this.target=this.trigger.progress;}
 update(){const now=performance.now(),dt=Math.min(1,(now-this.lastTime)/1000);this.lastTime=now;this.progress+=(this.target-this.progress)*(1-Math.exp(-dt/ .24));if(Math.abs(this.target-this.progress)<.00001)this.progress=this.target;this.onProgress(this.progress);}
 dispose(){this.trigger.kill();}
}
