// Add decorations in the model's coordinate system, so they follow camera movement and existing hover animations.
function customize(){
 const T=window.__tingRoomCustomization;if(!T||T.root.userData.decorUpdated)return;T.root.userData.decorUpdated=true;
 const {Mesh,Group,BoxGeometry,PlaneGeometry,BufferGeometry,Float32BufferAttribute,MeshBasicMaterial,TextureLoader,SRGBColorSpace,DoubleSide}=T;
 const frames=[];let kirby;T.root.traverse(o=>{if(/^Frame_[123]_Second/.test(o.name))frames.push(o);if(o.name==='Kirby_Third_Hover_Raycaster')kirby=o});
 const posterLoader=new TextureLoader();
 // Replace only the large wall-poster UV island in the existing baked atlas.
 const wallPoster=posterLoader.load('/textures/decor/sailor-moon-posters.png');wallPoster.colorSpace=SRGBColorSpace;wallPoster.flipY=false;
 const patched=new Set();T.root.traverse(o=>{const m=o.material;if(!m?.uniforms||m.uniforms.uTextureSet?.value!==2||patched.has(m))return;patched.add(m);m.uniforms.uSailorPoster={value:wallPoster};m.fragmentShader='uniform sampler2D uSailorPoster;\n'+m.fragmentShader;m.fragmentShader=m.fragmentShader.replace('vec3 finalColor = mix(dayColor, nightColor, uMixRatio);',`if(vUv.x > 0.003 && vUv.x < 0.370 && vUv.y > 0.034 && vUv.y < 0.588) {
 vec2 posterUV = vec2((vUv.x-0.003)/0.367/3.0, (vUv.y-0.034)/0.554);
 dayColor = pow(texture2D(uSailorPoster, posterUV).rgb, vec3(2.2));
 nightColor = dayColor * vec3(0.38, 0.32, 0.49);
 }
 vec3 finalColor = mix(dayColor, nightColor, uMixRatio);`);m.needsUpdate=true;});
 frames.sort((a,b)=>a.name.localeCompare(b.name)).forEach((frame,i)=>{frame.geometry.computeBoundingBox();const box=frame.geometry.boundingBox,size={x:box.max.x-box.min.x,y:box.max.y-box.min.y,z:box.max.z-box.min.z};const map=posterLoader.load('/textures/decor/sailor-moon-posters.png');map.colorSpace=SRGBColorSpace;map.flipY=true;map.repeat.set(1/3,1);map.offset.set(i/3,0);const art=new Mesh(new PlaneGeometry(size.z*.86,size.y*.86),new MeshBasicMaterial({map,side:DoubleSide}));art.name='Sailor_Moon_Poster_'+(i+1);art.rotation.y=Math.PI/2;art.position.set(box.max.x+.008,(box.min.y+box.max.y)/2,(box.min.z+box.max.z)/2);frame.add(art);});
 if(!kirby)return;
 // The original mesh remains a transparent hit target, preserving its hover interaction.
 kirby.material=new MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});
 const toy=new Group();toy.name='Iron_Man_Collectible';toy.rotation.y=.65;toy.position.set(-.03,-.055,-.06);kirby.add(toy);
 const palette={red:0x9d2929,redLight:0xc14434,gold:0xd4a854,dark:0x482e31,cyan:0x8decf5,white:0xe7fbff};const materials={};Object.entries(palette).forEach(([k,color])=>materials[k]=new MeshBasicMaterial({color}));
 function box(name,x,y,z,w,h,d,color,rz=0){const m=new Mesh(new BoxGeometry(w,h,d),materials[color]);m.name=name;m.position.set(x,y,z);m.rotation.z=rz;toy.add(m);return m}
 function rounded(name,x,y,z,rx,ry,rz,color){const positions=[],colors=[],indices=[],segments=18,rings=12;const hex=palette[color],base=[(hex>>16&255)/255,(hex>>8&255)/255,(hex&255)/255];for(let j=0;j<=rings;j++){const phi=Math.PI*j/rings;for(let i=0;i<=segments;i++){const theta=2*Math.PI*i/segments,nx=Math.sin(phi)*Math.cos(theta),ny=Math.cos(phi),nz=Math.sin(phi)*Math.sin(theta);positions.push(rx*nx,ry*ny,rz*nz);const light=.72+.28*Math.max(0,nx*.2+ny*.75+nz*.6);colors.push(...base.map(c=>c*light))}}for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1)}const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(positions,3));g.setAttribute('color',new Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();const material=new MeshBasicMaterial({vertexColors:true});const m=new Mesh(g,material);m.name=name;m.position.set(x,y,z);toy.add(m);return m}
 // Oversized helmet and compact armored limbs match the room's collectible-toy scale.
 rounded('Helmet_Red_Shell',0,1.02,0,.285,.285,.245,'redLight');
 box('Helmet_Gold_Brow',0,1.155,.217,.35,.12,.065,'gold');
 box('Helmet_Gold_Faceplate',0,1.015,.239,.37,.235,.065,'gold');
 box('Helmet_Gold_Jaw',0,.882,.205,.25,.075,.075,'gold');
 box('Helmet_Left_Cheek',-.206,.973,.176,.065,.21,.10,'red',-.11);box('Helmet_Right_Cheek',.206,.973,.176,.065,.21,.10,'red',.11);
 box('Left_Eye_Dark_Inset',-.095,1.052,.279,.13,.038,.012,'dark',-.09);box('Right_Eye_Dark_Inset',.095,1.052,.279,.13,.038,.012,'dark',.09);
 box('Left_Glowing_Eye',-.095,1.055,.288,.108,.021,.01,'white',-.09);box('Right_Glowing_Eye',.095,1.055,.288,.108,.021,.01,'white',.09);
 box('Mouth_Armor_Seam',0,.918,.282,.16,.014,.01,'dark');
 rounded('Chest_Armor',0,.655,0,.25,.235,.165,'red');
 box('Chest_Upper_Trim',0,.785,.14,.32,.06,.05,'redLight');
 rounded('Arc_Reactor_Rim',0,.687,.157,.087,.087,.025,'gold');rounded('Arc_Reactor_Light',0,.687,.184,.063,.063,.018,'cyan');rounded('Arc_Reactor_Core',0,.687,.201,.037,.037,.007,'white');
 box('Abdominal_Plate',0,.462,.107,.28,.1,.07,'gold');box('Hip_Armor',0,.374,0,.35,.13,.23,'red');
 [-1,1].forEach(side=>{rounded('Shoulder_'+side,side*.295,.746,0,.125,.13,.13,'redLight');rounded('Gold_Upper_Arm_'+side,side*.34,.584,0,.075,.115,.075,'gold');rounded('Red_Gauntlet_'+side,side*.36,.434,.015,.098,.12,.10,'red');rounded('Fist_'+side,side*.36,.335,.04,.10,.085,.10,'redLight');rounded('Gold_Thigh_'+side,side*.115,.285,0,.09,.12,.09,'gold');box('Knee_Plate_'+side,side*.115,.221,.095,.13,.09,.045,'redLight');rounded('Armored_Boot_'+side,side*.12,.107,.025,.105,.13,.12,'red');box('Boot_Toe_'+side,side*.12,.04,.09,.20,.09,.22,'redLight')});
 // Keep the theme's light-level relationship without changing the room's original material system.
 const applyTheme=()=>{const factor=document.body.classList.contains('dark-theme')?.68:1;Object.entries(materials).forEach(([k,m])=>{m.color.setHex(palette[k]);m.color.multiplyScalar(factor)})};new MutationObserver(applyTheme).observe(document.body,{attributes:true,attributeFilter:['class']});applyTheme();
 document.body.dataset.roomDecor='sailor-moon-and-iron-man';
}
window.addEventListener('ting:room-model-ready',customize);customize();
