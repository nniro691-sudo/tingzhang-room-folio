import projects from './portfolio-data.json';
import './portfolio.css';

const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grid = document.querySelector('#project-grid');
grid.innerHTML = projects.map(project => {
  const media = `<img src="${escape(project.media)}" alt="${escape(project.title)}页面封面" loading="lazy" decoding="async" width="1100" height="660">`;
  return `<article class="ting-project" data-category="${escape(project.category)}"><a class="project-media" href="${escape(project.href)}" target="_blank" rel="noopener noreferrer" aria-label="查看${escape(project.title)}">${media}<span class="project-open" aria-hidden="true">查看项目 ↗</span></a><div class="project-body"><p class="section-eyebrow">${escape(project.label)}</p><h2><a href="${escape(project.href)}" target="_blank" rel="noopener noreferrer">${escape(project.title)}</a></h2><p>${escape(project.description)}</p><div class="project-tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div></div></article>`;
}).join('');

const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  grid.querySelectorAll('.ting-project').forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
    if (!card.hidden) count++;
  });
  document.querySelector('#project-count').textContent = `共 ${count} 个项目`;
  document.querySelector('.project-scroll').scrollTop = 0;
}));

let previousFocus;
function openSection(name) {
  previousFocus = document.activeElement;
  window.dispatchEvent(new CustomEvent('ting:open', {detail: name}));
  const modal = document.querySelector(`.${name}.modal`);
  if (modal) setTimeout(() => modal.focus({preventScroll: true}), 250);
}
document.querySelectorAll('[data-open-section]').forEach(button => button.addEventListener('click', () => openSection(button.dataset.openSection)));
document.addEventListener('keydown', event => {
  const modal = [...document.querySelectorAll('.modal')].find(item => item.style.display === 'block');
  if (!modal) return;
  if (event.key === 'Escape') {
    window.dispatchEvent(new Event('ting:close'));
    previousFocus?.focus?.();
  }
  if (event.key === 'Tab') {
    const focusable = [...modal.querySelectorAll('a[href],button,summary')].filter(el => el.getClientRects().length && !el.disabled);
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === modal)) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === modal)) { event.preventDefault(); first?.focus(); }
  }
});

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('tingzhang1119@gmail.com');
    status.textContent = '邮箱已复制，期待你的来信。';
  } catch {
    status.textContent = '可直接复制：tingzhang1119@gmail.com';
  }
});

new MutationObserver(() => {
  if (!document.querySelector('.loading-screen')) {
    document.body.classList.add('room-ready');
    const section = new URLSearchParams(location.search).get('section');
    if (['work','about','contact'].includes(section)) openSection(section);
  }
}).observe(document.body, {childList: true});
