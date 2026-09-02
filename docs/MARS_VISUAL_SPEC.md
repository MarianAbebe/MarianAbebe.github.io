# MA-01 authoritative Mars visual implementation specification

This document is the implementation authority for the desktop MA-01 environment. The target is a third-person autonomous rover physically exploring a remote planetary engineering settlement at night. It must not read as a radar screen, abstract marker field, empty plane, decorative dashboard canvas, top-down map, or wireframe scene.

## Exact palette

| Role | Value |
| --- | --- |
| Void / sky top / sky horizon | `#03050B` / `#02040B` / `#10152A` |
| Terrain dark / mid / high / ridge | `#080B16` / `#11172A` / `#202744` / `#090D19` |
| Structure dark / mid / light | `#111522` / `#272D3D` / `#B8BDCA` |
| Rover body / secondary / mechanical / tire | `#D8D8D2` / `#858B99` / `#101219` / `#07080C` |
| Text primary / secondary | `#EEECE5` / `#999AA5` |
| Violet / bright / dim / blue light | `#956CFF` / `#B292FF` / `#493579` / `#758ED8` |
| Healthy / warning / rear light | `#70D6A0` / `#E3B36A` / `#D84B58` |

Purple is lighting and interaction, not the world base color. Green is reserved for actual healthy/online state.

## Camera, world, fog, and light

- Perspective camera: FOV `48`, near `0.1`, far `180`.
- Rover-local follow offset: `[0, 4.0, 8.5]`; rover-local look offset: `[0, 1.25, -5.5]`.
- Position damping `4.5`; target damping `5.5`. The target is ahead of the rover, preserving horizon and sky.
- Playable radius `27`; visual radius `90`; horizon distance about `70`; ridge distance about `62`.
- Fog: `#090D19`, near `28`, far `92`.
- Ambient `0.18`; hemisphere `#4C5F9A` / `#080A11` at `0.55`.
- Moon light: `#A8B9FF`, intensity `2.2`, position `[-18, 28, 12]`.
- Violet practical: `#956CFF`, intensity `2.8`, distance `11`, decay `2`.
- White practical: `#E5E7EE`, intensity `1.8`, distance `9`, decay `2`.
- Shadow map `1024²`, bias `-0.0003`. Dark areas remain dark; lighting establishes focal hierarchy.

## Spawn and destination layout

MA-01 spawns at `[0, terrainY, 8]`. In one frame the foreground rover and tracks must lead toward uneven terrain, a readable horizon, ridge silhouettes, stars/galactic band, and at least three physical sites. Required roots are Waypoint `[-18, *, -25]`, Signal Array `[17, *, -23]`, Systems Lab `[-5, *, -20]`, Mission Archive `[8, *, -16]`, Field Log `[-17, *, -11]`, and Research Outpost `[19, *, -10]`.

## Physical structures

- **MA-01:** approximately `3.2 × 4.8`; chassis `[2.8,.75,4]` at `y 1.25`; deck `[2.25,.35,2.5]` at `y 1.8`; six `r .55 × .38` X-axis wheels at `x ±1.65`, `z -1.45/0/1.45`; suspension links; 1.4-high mast; `.9 × .35 × .35` sensor head, two lenses, antenna, two red rear indicators.
- **Signal Array:** at `[17,*,-23]`, Y rotation `-.25`; `2.6/3.1 × 1.2` 12-segment base; `.9/1.4 × 3.2` pedestal; dish pivot around `y 5`; concave `7.5`-diameter, `1.8`-deep dish at X `-.72`, Z `.12`; three support arms, focal receiver, substantial mount, three violet base lights; total height `9–11`.
- **Research Outpost:** domes `r2.7` at `[-2.8,1.1,0]`, `r2.25` at `[2,.9,-1.3]`, and `r1.65` at `[4.5,.7,.7]`, each Y-scaled `.55`; cool-gray shells, dark ribs, 4–6 windows, equipment, two-panel solar array, white entrance light.
- **Mission Archive:** primary `[6.2,5.8,5.2]`; secondary `[4.5,2,5.8]` rear/right; recessed entrance, three facade channels, one violet vertical strip, off-white identifier, rooftop antenna.
- **Systems Lab:** approximately `8 × 6`; four columns, upper beams, partial platform, two equipment modules, sensor mast, articulated-looking test frame; two white work lights and one dim violet light; open silhouette.
- **Field Log:** compact console, enclosure, thin mast, one beacon, modest equipment box; smaller and more isolated.
- **Trajectory Waypoint:** narrow segmented vertical pylon, top beacon, small base.

## Terrain and sky

Terrain uses rolling elevation, depressions, foreground unevenness, navigable ridges, 8–10 intentional rock clusters with 2–4 rocks each, visual quiet, tracks, and a noninteractive ridge ring 55–70 units away. No radar/contour rings, flat plane, debug grid, or uniform scatter.

Sky has three explicit layers: a BackSide gradient sphere of radius `150`; `900` seeded deterministic `THREE.Points` stars at distance `90–130`, sized `0.025–0.09` with 85/12/3 percent dim/medium/bright distribution; and `500` additional low-opacity points in a Gaussian band (`sigma .12`) rotated `25°` about Z. At most one broad low-opacity haze element may sit behind the band.

## HUD and labels

At `>=1200px`: identity is left `32px`, about `42px` below navigation, width about `310px`; mission directive is left `32px`, about `210px` below navigation, width about `235px`; compass is left `32px`, bottom about `78px`, size `96px`; telemetry is right `28px`, bottom about `70px`, width about `250px`; control strip spans the bottom at height about `54px` and shows `W A S D DRIVE` and `E INTERACT`. Panels remain transparent/near-black with subtle borders.

Labels annotate the real structures with warm-white text, muted-violet distance and a thin connector. They begin fading around distance `32` and disappear by `45`; they never replace physical site geometry.

## Architecture and constraints

Maintain separate sky layers, terrain responsibilities, six physical site components, rover, controller, camera, and destination labels. Do not collapse all site geometry into one destination-marker component. Preserve existing navigation, session restoration, transitions, reduced-motion and mobile fallback behavior, accessibility, case-study content, DPR cap, and 1024 shadow budget. No physics, post-processing frameworks, large textures/models, or decorative particle animation.
