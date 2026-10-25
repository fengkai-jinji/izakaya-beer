vec2 grainUv=vSurfaceUv;
float plank=floor(grainUv.x*80.0);
float seed=fract(sin(plank*127.1)*43758.5453);
float vein=sin(grainUv.y*650.0+sin(grainUv.y*47.0+plank)*3.0+seed*13.0);
float fine=sin(grainUv.y*2100.0+grainUv.x*150.0);
float seam=1.0-smoothstep(.0,.015,min(fract(grainUv.x*80.0),1.0-fract(grainUv.x*80.0)));
vec3 woodColor=mix(vec3(.023,.009,.005),vec3(.147,.055,.020),.34+.22*seed+.09*vein+.025*fine);
diffuseColor.rgb=woodColor*(1.0-seam*.5);
