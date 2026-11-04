import projects from './portfolio-data.json';
import './room-fusion.css';

const roomVideo='https://resource2.heygen.ai/videos/2f382d4185b5402eb287f89f02c0d054/2f382d4185b5402eb287f89f02c0d054/01a17cd1-6690-7c91-815b-c98597adf5ae.mp4';
const faceVideo='https://resource2.heygen.ai/videos/2f382d4185b5402eb287f89f02c0d054/2f382d4185b5402eb287f89f02c0d054/01a17ccb-17ea-757a-9c49-b51d9057ae2d.mp4';
const brand=document.querySelector('.ting-brand');
brand.innerHTML='Ting’s Studio<span class="brand-role">张婷的设计空间 · 产品 / 视觉 / AI</span>';
const work=document.querySelector('.work');
work.querySelector('.modal-title').textContent='作品档案';
work.querySelector('.section-eyebrow').textContent=`ON MY DESK / ${projects.length} PROJECTS`;
work.querySelector('.section-description').textContent='从这张桌子出发，探索产品、工具和品牌的不同可能。';
document.querySelector('.about .modal-title').textContent='房间的主人';
document.querySelector('.contact .modal-title').textContent='留一封信';
const aboutContent=document.querySelector('.ting-about-content');
const welcome=document.createElement('section');welcome.className='host-story';
welcome.innerHTML=`<div class="host-film"><video muted loop playsinline preload="none" poster="/portfolio/assets/host/studio-poster.jpg" aria-label="Ting 在设计师工作台绘图、转头与微笑" src="${roomVideo}"></video><div class="host-film-caption"><span>THE PERSON BEHIND THE ROOM</span><h2>Hi，我是 Ting。</h2></div><button class="host-play" aria-label="播放人物故事">▶ 播放</button></div><div class="host-note"><span>01 / 从工作台认识我</span><p>这个小房间，收藏着我的工作、灵感和好奇心。<br>往下翻，是这些作品背后的经历。</p><div><button class="host-scene active" data-film="studio" aria-pressed="true">在工作台</button><button class="host-scene" data-film="portrait" aria-pressed="false">近一点认识</button><a href="/resume.html" target="_blank" rel="noopener">查看 / 打印简历 ↗</a></div></div>`;
aboutContent.prepend(welcome);
const career=document.querySelector('.career-list');career.id='room-career';
const resumeHeader=document.createElement('div');resumeHeader.className='resume-marker';resumeHeader.innerHTML='<span>THE STORY SO FAR</span><a href="/resume.html" target="_blank" rel="noopener">完整简历 ↗</a>';career.before(resumeHeader);
const navigation=document.querySelector('.room-navigation');navigation.innerHTML='<button data-room-action="home" aria-label="返回设计空间">⌂ 首页</button><button data-room-action="work">作品档案 <span>11</span></button><button data-room-action="about">认识主人</button><button data-room-action="resume">个人简历</button><button data-room-action="contact">留一封信 ↗</button>';
navigation.querySelector('[data-room-action="work"] span').textContent=projects.length;
const invitation=document.createElement('aside');invitation.className='room-invitation';invitation.innerHTML='<span class="invitation-label">WELCOME TO MY LITTLE WORLD</span><h1>一间小屋，<br>一些认真做过的事。</h1><p>转一转，看看我的工作台。<br>也可以从下面的档案开始认识我。</p><button data-room-action="about"><img src="/portfolio/assets/ting-character.webp" alt="Ting 的黑色刘海长发角色肖像"><span>和房间主人打个招呼 <b>↗</b></span></button><button class="invitation-hide" aria-label="收起房间介绍">收起 −</button>';document.body.append(invitation);
const breadcrumbs=document.createElement('div');breadcrumbs.className='room-breadcrumb';breadcrumbs.innerHTML='<button data-room-action="home">Ting’s Studio</button><span> / </span><span class="current-room-page"></span>';document.body.append(breadcrumbs);
const hostVideo=welcome.querySelector('video'),play=welcome.querySelector('.host-play');
function syncPlay(){play.textContent=hostVideo.paused?'▶ 播放':'Ⅱ 暂停';play.setAttribute('aria-label',hostVideo.paused?'播放人物故事':'暂停人物故事')}
const film=welcome.querySelector('.host-film');
let pinnedPlayback=false,hoverPlayback=false,playRequest=0;
function canPreview(){return document.body.dataset.roomPanel==='about'&&document.body.dataset.hostMode!=='life'&&!document.hidden}
function startHost(){hostVideo.muted=true;const request=++playRequest;hostVideo.play().then(()=>{if(request!==playRequest||!canPreview()||(!pinnedPlayback&&!hoverPlayback))hostVideo.pause()}).catch(syncPlay)}
function pauseHost(){++playRequest;hostVideo.pause()}
play.addEventListener('click',()=>{if(pinnedPlayback||(!hostVideo.paused&&!hoverPlayback)){pinnedPlayback=false;hoverPlayback=false;pauseHost()}else{pinnedPlayback=true;startHost()}});
film.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||!canPreview()||matchMedia('(prefers-reduced-motion: reduce)').matches)return;hoverPlayback=true;startHost()});
film.addEventListener('pointerleave',()=>{hoverPlayback=false;if(!pinnedPlayback)pauseHost()});
hostVideo.addEventListener('play',syncPlay);hostVideo.addEventListener('pause',syncPlay);
welcome.querySelectorAll('[data-film]').forEach(button=>button.addEventListener('click',()=>{pauseHost();const studio=button.dataset.film==='studio';hostVideo.poster=studio?'/portfolio/assets/host/studio-poster.jpg':'/portfolio/assets/host/portrait-poster.jpg';hostVideo.src=studio?roomVideo:faceVideo;hostVideo.load();welcome.querySelectorAll('[data-film]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});if(pinnedPlayback||hoverPlayback)startHost();syncPlay()}));
new MutationObserver(()=>{if(!canPreview()){pinnedPlayback=false;hoverPlayback=false;pauseHost()}}).observe(document.body,{attributes:true,attributeFilter:['data-room-panel','data-host-mode']});

function setPanel(name){document.body.dataset.roomPanel=name||'';document.querySelector('.current-room-page').textContent={work:'作品档案',about:'房间的主人',contact:'留一封信'}[name]||'';navigation.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.roomAction===(name||'home')));if(name!=='about')hostVideo.pause()}
function open(name){if(name==='home'){window.dispatchEvent(new Event('ting:close'));return}const target=['resume','life'].includes(name)?'about':name;window.dispatchEvent(new CustomEvent('ting:host-mode',{detail:name==='life'?'life':'professional'}));window.dispatchEvent(new CustomEvent('ting:open',{detail:target}));if(name==='resume')setTimeout(()=>career.scrollIntoView({behavior:'smooth',block:'start'}),450);else if(name==='about')setTimeout(()=>{aboutContent.scrollTop=0},450);setTimeout(()=>document.querySelector('.'+target+'.modal')?.focus({preventScroll:true}),450)}
document.addEventListener('click',event=>{const button=event.target.closest('[data-room-action]');if(button){event.preventDefault();open(button.dataset.roomAction)}});
window.addEventListener('ting:open',event=>setPanel(event.detail));window.addEventListener('ting:close',()=>setPanel(''));
const hideInvitation=document.querySelector('.invitation-hide');
function syncInvitation(){hideInvitation.textContent=invitation.classList.contains('collapsed')?'展开 +':'收起 −';hideInvitation.setAttribute('aria-label',invitation.classList.contains('collapsed')?'展开户主介绍':'收起房间介绍')}
if(matchMedia('(max-width:700px)').matches)invitation.classList.add('collapsed');syncInvitation();
hideInvitation.addEventListener('click',()=>{invitation.classList.toggle('collapsed');syncInvitation()});
// Room-object clicks use the original modal runtime. Observe it so both ways of entering share the same navigation state.
const observer=new MutationObserver(()=>{const visible=[...document.querySelectorAll('.modal')].find(m=>m.style.display==='block');const name=visible?['work','about','contact'].find(c=>visible.classList.contains(c)):'';setPanel(name)});document.querySelectorAll('.modal').forEach(m=>observer.observe(m,{attributes:true,attributeFilter:['style']}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)hostVideo.pause()});
