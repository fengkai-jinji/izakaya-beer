export const PALETTE={bgDeep:0x0a0705,wallTile:0xd8d2c8,woodDark:0x2a1a10,woodWarm:0x6b4226,steel:0xb8bcc4,steelDark:0x2a2c30,lampWarm:0xffa04a,lampWarmHi:0xffd9a0,fridgeCold:0x6fa8dc,fridgeColdHi:0xa8d8f0,glassEdge:0xe8f4ff,beerAmber:0xd4881a,beerDark:0x2a1408,foamWhite:0xf4f0e8,sapporoGold:0xf0b400};
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export function smooth(a,b,p){const t=clamp((p-a)/(b-a));return t*t*(3-2*t);}
export function cinematicSmooth(x){
 x=clamp(x);let lo=0,hi=1,t=x;
 for(let i=0;i<24;i++){t=(lo+hi)/2;const s=1-t;const px=3*s*s*t*.25+3*s*t*t*.25+t*t*t;if(px<x)lo=t;else hi=t;}
 const s=1-t;return 3*s*s*t*.1+3*s*t*t+t*t*t;
}
export const CAMERA_KEYS=[
 {p:0,position:[0,1.55,4.8],lookAt:[0,1,0],fov:34},
 {p:.3,position:[0,1.4,2.6],lookAt:[0,1.05,0],fov:32},
 {p:.55,position:[.2,1.3,1.6],lookAt:[.05,1.1,0],fov:30},
 {p:.8,position:[.25,1.25,1.4],lookAt:[.08,1.1,0],fov:30},
 {p:1,position:[.25,1.25,1.4],lookAt:[.08,1.1,0],fov:30}];
export function sampleCamera(p){
 p=clamp(p);const exact=CAMERA_KEYS.find(k=>k.p===p);if(exact)return {position:[...exact.position],lookAt:[...exact.lookAt],fov:exact.fov};
 const i=CAMERA_KEYS.findIndex(k=>k.p>p);const a=CAMERA_KEYS[i-1],b=CAMERA_KEYS[i];const t=cinematicSmooth((p-a.p)/(b.p-a.p));
 return {position:a.position.map((v,j)=>lerp(v,b.position[j],t)),lookAt:a.lookAt.map((v,j)=>lerp(v,b.lookAt[j],t)),fov:lerp(a.fov,b.fov,t)};
}
export function getChoreography(p){p=clamp(p);const e=smooth(.65,1,p);return {doorAngle:.62*Math.PI*smooth(.45,.75,p),frostIntensity:lerp(1,.12,smooth(.4,.75,p)),heroPosition:[lerp(0,.05,e),lerp(.32,.95,e),lerp(0,.85,e)],heroScale:lerp(1,1.45,e),dragEnabled:p>.7,physicsActive:p>.35};}
export const INVENTORY=[['sapporo','sapporo','sapporo'],['kirin','kirin','asahiCan'],['suntory','suntory','suntoryCan'],['asahi','asahi','asahi']].flatMap((row,shelf)=>row.map((variant,column)=>({variant,shelf,column,hero:shelf===0&&column===1})));
export function collisionSound(a,b,speed){if(a==='item'&&b==='item'&&speed>1.2)return 'clink';if(((a==='item'&&b==='floor')||(a==='floor'&&b==='item'))&&speed>1.8)return 'break';return null;}
