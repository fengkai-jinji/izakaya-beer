import * as THREE from 'three';
export async function paintMenu(){await Promise.race([document.fonts.load('14px "Noto Sans JP"'),new Promise(resolve=>setTimeout(resolve,1800))]);const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;const c=canvas.getContext('2d');const words=['生ビール','冷酒','焼酎','ハイボール','お通し','刺身','煮物','揚物'];c.font='14px "Noto Sans JP",serif';c.fillStyle='rgba(26,20,16,.55)';
 for(let col=0;col<6;col++)for(let row=0;row<4;row++){const word=words[(col*7+row*3)%words.length];for(let k=0;k<word.length;k++){c.save();c.translate(90+col*158+k*15,58+row*115);c.rotate(Math.sin(col*71+row*13+k)*.08);c.fillText(word[k],0,0);c.restore();}}
 const t=new THREE.CanvasTexture(canvas);t.colorSpace=THREE.SRGBColorSpace;return t;}
