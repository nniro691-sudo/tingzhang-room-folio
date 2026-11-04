import './experience-entry.css';

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
