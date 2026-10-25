import './ui/overlay.css';
import { Experience } from './core/Experience.js';
const experience=new Experience(document.querySelector('#scene'),document.querySelector('#overlay'));
experience.init().catch(error=>{console.error(error);experience.dispose();const panel=document.createElement('div');panel.className='startup-error';panel.textContent='体験を読み込めませんでした。\nUnable to start the experience.\n'+error.message;document.body.append(panel);});
if(import.meta.hot)import.meta.hot.dispose(()=>experience.dispose());
addEventListener('pagehide',()=>experience.dispose(),{once:true});
