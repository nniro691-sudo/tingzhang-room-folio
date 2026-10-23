# My Work Cover QA - 2026-10-23

final result: passed

## Scope
Replace repeated generic My Work cover videos with unique images from each actual linked project. Preserve the room, card layout, theme, text, categories and destinations.

## Source truth
`public/portfolio/covers/sources.json` records each project URL and its cover.
Nine covers are browser screenshots of linked live or local pages. The AI community screenshot is restricted to its public project area and excludes the surrounding account toolbar. IELTS is password-gated, so its cover shows the public entry page; no access restriction was bypassed. Brand and archive cards retain their original unique project artwork.

## Rendered evidence
- Desktop: `evidence/work-covers-desktop.png`, 1280 x 720 CSS/pixels, density 1.
- Mobile: `evidence/work-covers-mobile.png`, 390 x 844 CSS/pixels, density 1.
- No density normalization needed. Screenshots captured after opening My Work.
- Source pages were opened, visually inspected and captured before selecting the cover image. Local cover images were then reviewed inside the rendered cards, including lower rows and brand filter state.

## Fidelity surfaces
- Fonts: English display headings retain the room typeface; body and project titles now explicitly use complete system fonts to avoid demo-font artifacts discovered in mixed-language copy.
- Spacing/layout: existing three-column desktop / single-column mobile card structure, purple modal, filter row, borders and CTA positions retained.
- Colors/tokens: room theme unchanged; each cover retains the actual project color palette.
- Asset fidelity: actual webpage screenshots and source artwork replace unrelated reused clips. Top-aligned crops preserve each page header; images are local WebP with lazy loading and async decoding.
- Content: project descriptions, categories and destinations preserved. IELTS cover documents the public gate rather than implying unlocked access.

## Checks
- All 11 images loaded in the rendered browser (`complete` and positive natural width).
- 11 distinct image URLs and 11 distinct SHA-256 hashes; no shared cover paths or identical files.
- No video element remains in the work grid.
- Scrolled to inspect the distinct intranet, CRM, health and UGC previews.
- Brand category filtering tested; restored All afterward.
- Mobile viewport confirmed as 390 x 844; grid computes to a single 279px column with visible controls.
- Console errors captured in this reused tab are associated with the previously visited external saved AI-community page. No local-site exception observed during the cover/filter/mobile checks.
- Production build and JS syntax checks passed.

## Findings / comparison history
Initial work preview revealed that original global room font rules applied demo fonts to mixed-language project body text. Added scoped font overrides, captured the revised desktop/mobile state, and confirmed legible copy. No actionable P0/P1/P2 findings remain within this cover update.

## Accepted limitation
IELTS uses its unique public password-entry screenshot until owner access is provided. Prior full-personalization verification gaps are archived in `evidence/personalization-qa-history.md`; this cover QA does not claim a new full audit of About, Contact or all room interactions.
