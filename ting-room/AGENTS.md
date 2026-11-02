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
- User wants the small-room site and current character/portfolio site merged coherently. Treat the 3D room as the persistent home: all 11 works, host story videos, resume and contact unfold in the room's existing modal system. Preserve room controls, piano, music, day/night and original 3D runtime. Keep all content panels in one soft lavender/cream visual system, with a consistent way back to the room.
- Room decorations: user requested Sailor Moon wall art and Iron Man in place of Kirby. src/room-decor.js replaces the large poster's texture-set-2 UV island and adds three framed poster panels; the original Kirby becomes an invisible hover hit target containing a 3D red/gold Iron Man collectible. Preserve these customizations. Runtime bridge is emitted by the original room bundle after the GLB loads.
- On entry always show the room first. Do not auto-open work/about/contact modals from the section query parameter; panels open only after a visitor clicks a room object or navigation button.
- Personal IP identity update: hair must be jet-black, long, straight, sleek and smooth with black bangs; no fluffy hair, curls, waves, flyaways or curled ends. Keep the round short face, with confident slightly cool demeanor rather than overly sweet styling. Apply consistently across host portrait, six looks, comics, emoji and dream scenes.
- Personal IP eyes must not converge toward the nose: iris centers aligned with each eye opening, same gaze direction, natural sclera balance, no cross-eyed expression. Use the corrected frontal master identity to drive all lookbook/comic/emoji art, not the old fluffy-haired image.
- Life/IP content requested: six looks (designer, AI creator, sport, travel, home, cyberpunk), five three-panel comics (UI design, 3D printing venture, beach vacation, technology exploration, personal growth), eight chibi emotions, beach/sea-view villa/silver Cybertruck dream scene, original AI robot bear and Westie companions. Present as hobbies/creative aspiration, never as verified professional accomplishments. Add under the room's owner panel and a Life & IP navigation entry; no auto-open on entry.

- Work previews must show the complete image without cropping or hover zoom, inside a subtle browser/screen frame. Preserve image proportions using contain.

- Life & IP is a continuous scroll page with all five sections visible. Keep its category tabs sticky, sync active tab to scroll position, and smoothly scroll to a section on tab click.
