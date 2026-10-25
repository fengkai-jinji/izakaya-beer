float edgeGlint=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),4.0);
diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.82,.92,1.0),edgeGlint*.12);
