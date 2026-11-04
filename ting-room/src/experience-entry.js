import './experience-entry.css';

const loading=document.querySelector('.loading-screen');
if(loading){
 const start=loading.querySelector('.loading-screen-button');start.disabled=true;start.textContent='进入设计空间';
 const intro=document.createElement('div');intro.className='entry-intro';intro.innerHTML='<span class="entry-eyebrow">TING ZHANG / PRODUCT & VISUAL DESIGN</span><h1>你好，我是张婷。<br>让设计，连接业务与体验。</h1><p>15 年设计经验，横跨企业 SaaS、电商与品牌视觉。<br>在这里，了解我的设计判断、项目实践和创作日常。</p>';
 const visual=document.createElement('div');visual.className='entry-character';visual.innerHTML='<video muted autoplay loop playsinline preload="metadata" src="/portfolio/assets/guide/ting-presenter.webm" aria-label="张婷的动态数字人形象"></video><span>设计师 · 创作者 · 持续探索者</span>';
 const action=document.createElement('div');action.className='entry-action';const status=document.createElement('p');status.className='entry-status';status.setAttribute('role','status');status.textContent='正在准备交互场景…';action.append(start,status);
 loading.prepend(intro,visual);intro.append(action);
 loading.querySelectorAll('.instructions').forEach(el=>el.textContent='拖动探索场景 · 浏览代表案例 · 了解设计经历');
 const ready=()=>{start.disabled=false;status.textContent='已准备好 · 声音默认关闭'};
 if(loading.dataset.ready==='true')ready();window.addEventListener('ting:scene-ready',ready,{once:true});
 const video=visual.querySelector('video');if(matchMedia('(prefers-reduced-motion: reduce)').matches)video.autoplay=false;
 new MutationObserver(()=>{if(!loading.isConnected)video.pause()}).observe(document.body,{childList:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(loading.isConnected&&!matchMedia('(prefers-reduced-motion: reduce)').matches)video.play().catch(()=>{})});
}

const caseDialog=document.createElement('dialog');caseDialog.className='full-case-dialog';caseDialog.setAttribute('aria-labelledby','full-case-dialog-title');caseDialog.innerHTML='<header><div><span>DESIGN CASE STUDY</span><h2 id="full-case-dialog-title">精培学习中心 · 完整案例</h2></div><button aria-label="关闭完整案例">关闭 ×</button></header><iframe title="精培学习中心完整设计案例" loading="lazy"></iframe>';document.body.append(caseDialog);
const frame=caseDialog.querySelector('iframe');let returnFocus=null;
function closeCase(){caseDialog.close()}
caseDialog.querySelector('button').addEventListener('click',closeCase);
caseDialog.addEventListener('close',()=>{frame.removeAttribute('src');returnFocus?.focus({preventScroll:true})});
caseDialog.addEventListener('keydown',event=>event.stopPropagation());caseDialog.addEventListener('click',event=>{if(event.target===caseDialog)closeCase()});
frame.addEventListener('load',()=>{const doc=frame.contentDocument;if(!doc)return;doc.querySelectorAll('a[href="../../../"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();closeCase()}));doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&!doc.querySelector('dialog[open]')){event.preventDefault();closeCase()}})});
document.addEventListener('click',event=>{const entry=event.target.closest('.full-case-feature,.full-case-link');if(!entry)return;event.preventDefault();event.stopPropagation();returnFocus=entry;frame.src=entry.href;caseDialog.showModal()},true);
document.querySelectorAll('.full-case-feature,.full-case-link').forEach(entry=>{entry.removeAttribute('target');entry.setAttribute('aria-haspopup','dialog');entry.setAttribute('role','button');entry.addEventListener('keydown',event=>{if(event.key===' '){event.preventDefault();entry.click()}})});
const feature=document.querySelector('.full-case-feature');if(feature){feature.innerHTML='<span>完整设计案例 / 约 8 分钟阅读</span><strong>精培学习中心：从学情诊断到学习行动</strong><span>六个章节，结合实际页面、结构图与交互状态，展开设计思路与复盘。</span><b class="case-entry-button">查看完整案例 <span aria-hidden="true">＋</span></b>'}
document.querySelectorAll('.full-case-link').forEach(link=>link.textContent='查看完整案例 ＋');
