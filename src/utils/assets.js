import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PALETTE } from './constants.js';
function assetUrl(url){return import.meta.env.BASE_URL+url.replace(/^\//,'');}
async function localBuffer(url){const r=await fetch(assetUrl(url));if(!r.ok)return null;const type=r.headers.get('content-type')||'';if(type.includes('text/html'))return null;return r.arrayBuffer();}
export async function loadModel(url){try{const data=await localBuffer(url);if(!data||new DataView(data).getUint32(0,true)!==0x46546c67)return null;return (await new GLTFLoader().parseAsync(data,assetUrl(url).slice(0,assetUrl(url).lastIndexOf('/')+1))).scene;}catch{return null;}}
export async function createEnvironment(renderer){
 let texture;
 try {const data=await localBuffer('/textures/env-izakaya.hdr');if(data){const hdr=new RGBELoader().parse(data);texture=new THREE.DataTexture(hdr.data,hdr.width,hdr.height,THREE.RGBAFormat,hdr.type);texture.needsUpdate=true;}}catch{}
 if(!texture){const w=512,h=256,data=new Uint8Array(w*h*4);const c=new THREE.Color(),a=new THREE.Color(),b=new THREE.Color();
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const u=x/w,v=y/h;if(v<.5){a.setHex(PALETTE.lampWarm);b.setHex(0x4a2a10);c.copy(a).lerp(b,v*2);}else{a.setHex(0x0a1420);b.setHex(0x050505);c.copy(a).lerp(b,(v-.5)*2);}
 const warm=Math.exp(-((x-w*.25)**2+(y-h*.35)**2)/(2*40**2));const cold=Math.exp(-((x-w*.75)**2+(y-h*.4)**2)/(2*30**2));c.lerp(a.setHex(0xffd0a0),warm*.95);c.lerp(b.setHex(0xa8d8f0),cold*.9);c.convertLinearToSRGB();const i=(y*w+x)*4;data[i]=c.r*255;data[i+1]=c.g*255;data[i+2]=c.b*255;data[i+3]=255;}
 texture=new THREE.DataTexture(data,w,h,THREE.RGBAFormat);texture.colorSpace=THREE.SRGBColorSpace;texture.needsUpdate=true;}
 texture.mapping=THREE.EquirectangularReflectionMapping;const generator=new THREE.PMREMGenerator(renderer);generator.compileEquirectangularShader();const target=generator.fromEquirectangular(texture);texture.dispose();generator.dispose();return target;
}
