import './room-guide.css';

// The original character now accompanies the room introduction rather than a tour panel.
const invitation=document.querySelector('.room-invitation');
const greeting=invitation.querySelector('[data-room-action="about"]');

greeting.setAttribute('aria-label','和房间主人打个招呼，了解 Ting');
greeting.querySelector('span').innerHTML='和房间主人打个招呼 <b aria-hidden="true">↗</b>';
const character=document.createElement('video');character.className='invitation-person';character.muted=true;character.autoplay=true;character.loop=true;character.playsInline=true;character.preload='metadata';character.src='/portfolio/assets/guide/ting-presenter.webm';character.setAttribute('aria-label','Ting 黑长直白紫套装动态形象');const companion=document.createElement('div');companion.className='invitation-companion';companion.append(character);invitation.append(companion);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function motion(){if(document.hidden||reduced.matches||invitation.classList.contains('collapsed'))character.pause();else character.play().catch(()=>{})}
character.addEventListener('loadeddata',motion);document.addEventListener('visibilitychange',motion);reduced.addEventListener('change',motion);new MutationObserver(motion).observe(invitation,{attributes:true,attributeFilter:['class']});motion();
