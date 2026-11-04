import './room-guide.css';

const invitation=document.querySelector('.room-invitation');
const greeting=invitation.querySelector('[data-room-action="about"]');
greeting.setAttribute('aria-label','和房间主人打个招呼，了解 Ting');
greeting.querySelector('span').innerHTML='和房间主人打个招呼 <b aria-hidden="true">↗</b>';
const still='/portfolio/assets/guide/ting-presenter-still.webp';
const animation='/portfolio/assets/guide/ting-presenter-mobile.webp';
const mobile=matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0;
const apple=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)||(/Safari/.test(navigator.userAgent)&&!/Chrome|Chromium|Edg|Android/.test(navigator.userAgent));
const companion=document.createElement('div');companion.className='invitation-companion';invitation.append(companion);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let character;
function useImage(){
 if(character instanceof HTMLVideoElement){character.pause();character.removeAttribute('src');character.load()}
 const image=document.createElement('img');image.className='invitation-person';image.alt='Ting 黑长直动态形象';image.decoding='async';image.width=144;image.height=256;image.src=still;companion.replaceChildren(image);character=image;
}
{
 const video=document.createElement('video');video.className='invitation-person';video.muted=true;video.loop=true;video.playsInline=true;video.preload='none';video.poster=still;video.src=apple?'/portfolio/assets/guide/ting-presenter-safari.mov':mobile?'/portfolio/assets/guide/ting-presenter-mobile.webm':'/portfolio/assets/guide/ting-presenter.webm';video.setAttribute('aria-label','Ting 黑长直动态形象');video.addEventListener('error',()=>{useImage();motion()},{once:true});const preview=document.createElement('img');preview.src=still;preview.alt='';preview.setAttribute('aria-hidden','true');preview.className='invitation-person';Object.assign(preview.style,{position:'absolute',inset:'0',width:'100%',height:'100%'});video.style.opacity='0';companion.append(video,preview);character=video;
 video.addEventListener('loadeddata',()=>{if(character!==video)return;try{const canvas=document.createElement('canvas');canvas.width=16;canvas.height=16;const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(video,0,0,16,16);const corner=context.getImageData(0,0,1,1).data[3];if(corner>8){useImage();motion();return}video.style.opacity='1';preview.remove()}catch{useImage();motion()}},{once:true});
}
function motion(){
 const paused=document.hidden||reduced.matches||!!document.querySelector('.loading-screen')||!!(document.body.dataset.roomPanel&&document.body.dataset.roomPanel!=='home')||invitation.classList.contains('collapsed');
 if(character instanceof HTMLVideoElement){if(paused)character.pause();else character.play().catch(()=>{})}
 else{const source=paused?still:animation;if(character.getAttribute('src')!==source)character.src=source}
}
document.addEventListener('visibilitychange',motion);reduced.addEventListener('change',motion);
new MutationObserver(motion).observe(invitation,{attributes:true,attributeFilter:['class']});
new MutationObserver(motion).observe(document.body,{childList:true,attributes:true,attributeFilter:['data-room-panel']});motion();
