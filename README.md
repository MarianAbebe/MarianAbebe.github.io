# Marian Abebe — Engineering Mission Portfolio

A production-oriented first pass for a personal engineering portfolio built around a fictional Mars exploration mission. This repository intentionally contains placeholders instead of invented biography, projects, awards, or writing.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production validation is available through `npm run lint`, `npm run typecheck`, and `npm run build`.

## Architecture

- `app/` — Next.js App Router pages, layouts, metadata, and global design tokens
- `components/` — reusable navigation, cards, panels, telemetry, and intro controls
- `data/` — typed portfolio content, deliberately separate from presentation
- `types/` — shared content contracts
- `public/portfolio/` — stable, project-specific media directories for diagrams, screenshots, and locally hosted video

Routes include the launch experience (`/`), mission control (`/mars`), mission archive and case studies (`/missions/[slug]`), logbook and entries (`/logbook/[slug]`), and a custom 404.

## Design system

The color tokens live in `app/globals.css` and are exposed through Tailwind. Layout follows an editorial/aerospace system: warm black surfaces, rust accents, off-white type, green status indicators, thin instrumentation borders, restrained monospace metadata, and readable sans-serif body text. Motion is currently limited to native interaction feedback and respects `prefers-reduced-motion`.

## Updating content

Replace clearly bracketed placeholders in `data/missions.ts`, `signals.ts`, `trajectory.ts`, `systems.ts`, `logbook.ts`, and `links.ts`. Component contracts already include fields for case studies, verification links, mission relationships, and logbook revision history.

The flagship `Autonomous UGV Research` record demonstrates the structured case-study schema. Its optional `caseStudy` payload supports overview and role prose, platform information, grouped hardware/software stacks, architecture artifacts, debugging records, demonstration video, outcomes, lessons, galleries, and links. Missions without this payload continue to use the generic archive template.

### UGV media expected

Replace the pending assets at these exact paths, then set their corresponding `available` values to `true` in `data/missions.ts`:

- `public/portfolio/autonomous-ugv/diagrams/autoware-configuration-layer.png`
- `public/portfolio/autonomous-ugv/screenshots/manufacturer-platform-cad.png` (integrated)
- `public/portfolio/autonomous-ugv/screenshots/engineering-loading-dock-rviz.jpg` (integrated poster)
- `public/portfolio/autonomous-ugv/video/engineering-loading-dock-full-stack.mp4`

Update each asset’s alt text and caption with verified context at the same time. The architecture viewer supports click-to-expand, backdrop dismissal, an explicit close control, and Escape-key dismissal. Video evidence uses native HTML5 controls.

The original UGV WebM is intentionally not in this repository: it is 2.32 GB, 2560×1600, 6:33.69, VP8, approximately 47.14 Mb/s, and contains no reported audio track. It requires a web derivative or external streaming host. See `docs/asset-audit.md` for the evidence inventory and delivery recommendation.

## MA-01 surface exploration

The `/mars` route lazy-loads an isolated React Three Fiber prototype from `components/mars/`. Destination records live in `data/mars-destinations.ts` and link into the existing semantic portfolio sections; no portfolio content is duplicated in WebGL.

Desktop supports W/arrow-up to move forward, S/arrow-down to reverse, A/D or left/right arrows to steer, and E to access a nearby site. The third-person camera follows the rover with damped position and look-at movement. Rover position is retained in `sessionStorage` when entering content and returning to the surface.

Mobile, reduced-motion, and unavailable-WebGL environments receive the HTML/CSS mission map with the same destination links. Direct navigation and all existing routes remain available. Terrain, rover, and destination structures are procedural replacement points: final models or terrain can replace their render components without changing destination data or controller contracts.

Runtime dependencies are intentionally limited to `three` (scene/rendering primitives) and `@react-three/fiber` (React scene lifecycle and frame integration). No physics, post-processing, texture, control, or animation libraries are included.

## Intentionally not implemented

Final Mars imagery/models, real portfolio content, the launch cinematic, touch rover controls, advanced terrain, analytics, a CMS, persistent automatic intro skipping, downloadable resume content, and advanced transitions are reserved for later passes.
