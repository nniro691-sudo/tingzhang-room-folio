# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Personalization
- Preserve the 3D small-room style, exploration, camera controls, music, piano and day/night mode.
- Use user-provided portfolio content for identity, projects, biography and contact. Remove Korean student/demo information.
- Canonical contact: tingzhang1119@gmail.com / 13810004552. Latest main site takes precedence over older portfolio archives.
- Keep application-materials drafts out of the public website.

- My Work covers must be unique per project and use real linked-page screenshots or original project artwork. Do not reuse generic preview videos across projects. Sources are recorded in public/portfolio/covers/sources.json.
