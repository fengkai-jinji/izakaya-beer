uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
float fbm(vec2 p){float n=0.0,a=.5;for(int i=0;i<4;i++){n+=a*noise(p);p=p*2.03+4.7;a*=.5;}return n;}
void main(){float n=fbm(vUv*3.0+uTime*.12);float edge=smoothstep(.15,.55,n)*.08*uIntensity;gl_FragColor=vec4(.55,.72,.92,edge);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}
