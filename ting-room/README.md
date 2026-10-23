# TING ZHANG — Room Folio

本地复刻参考：https://www.sooahs-room-folio.com/

## 运行

```sh
cd ting-room
npm install
npm run dev -- --host 0.0.0.0 --port 4187
```

打开 http://localhost:4187/ 。生产构建使用 `npm run build`，静态文件位于 `dist/client/`。

## 交互

- Enter 带背景音乐进入；Enter without Sound 静音进入。
- 鼠标左键拖动旋转，右键拖动平移，滚轮缩放；移动端使用一根或两根手指。
- 点击木牌打开 My Work / About / Contact。
- 点击钢琴琴键发声；点击装饰物触发原有动画。
- 右上角控制声音和昼夜模式。

## 文件

- `index.html`：页面文案、弹窗、姓名标识、联系链接。
- `public/assets/index-960pW9w5.js`：原站公开浏览器运行包，本地适配姓名标牌、入场欢迎文案及 UI 点击事件隔离。
- `public/assets/index-CGTyUClS.css`：原站字体、布局、弹窗及主题样式。
- `public/models/`、`public/textures/`、`public/audio/`：独立运行所需的本地素材。
- `evidence/` 与 `design-qa.md`：视觉和交互验证记录。


## Personal content

Personalized from the supplied 2026 portfolio: Ting Zhang, 15 years of experience, four career entries, education, design capabilities, AI workflow and 11 projects.

- src/portfolio-data.json: projects and their original destinations.
- src/portfolio.js and src/portfolio.css: filtering, cards, copy-email, accessibility and Chinese layout.
- index.html: biography, career, contact, metadata and room entry.
- public/portfolio/: early work, brand portfolio, two intranet demos and required assets. No application drafts are public.
- public/portfolio/previews/: compressed visual preview clips from the supplied personal website; these are visual previews, not live project screenshots.

Current contact: tingzhang1119@gmail.com / 13810004552. Latest site takes precedence over historical archives. Room social click destinations now point to Ting's projects and email. Room and music credits remain under About.

## Project covers

My Work now uses 11 unique project-specific images. Nine covers are screenshots of the linked live/local pages; brand and archive covers use their original project artwork. The IELTS cover shows its public password gate until the owner provides access. Screenshot sources are recorded in `public/portfolio/covers/sources.json`. Shared video previews have been removed from the cards.

## GitHub Pages

Public site: https://nniro691-sudo.github.io/tingzhang-room-folio/

Pushes to main run `.github/workflows/deploy-pages.yml`. `npm run build:pages` prepares the static site for the repository subpath while leaving the normal local/Sites build unchanged.
