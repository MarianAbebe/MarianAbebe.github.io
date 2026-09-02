# Portfolio design system

## Mars world visual language

The Mars surface is the physical expression of an engineering journey: a quiet deep-space planetary field site shaped by research, autonomous exploration, and technical infrastructure. It must read as part of Marian’s established editorial mission interface—not as a separate game aesthetic.

### Terrain philosophy

- Use a broad, shallow, drivable basin with gentle height variation.
- Keep primary routes open and readable from the rover camera.
- Author geological clusters compositionally; never distribute identical rocks uniformly.
- Use distant, non-interactive silhouettes and haze to imply scale beyond the playable boundary.
- Terrain geometry should remain procedural and lightweight. Variation should come from vertex height, color, lighting, and sparse geometry rather than downloaded textures.

### Mars palette

- Sky zenith: near-black midnight navy (`#03050d` family).
- Horizon haze: desaturated blue-violet (`#11172b` family).
- Terrain shadows: blue-black (`#090d18` to `#101421`).
- Lit terrain: muted slate (`#31394c`), never saturated blue or purple.
- Infrastructure: charcoal, cool gray, and warm off-white hardware.
- Navigation and interaction use restrained ultraviolet violet; green is reserved for meaningful healthy/online status.

### Lighting and atmosphere

- One low-angle, cool key light establishes long directional shadows.
- Ambient and hemisphere fill keep shaded geometry readable while preserving silhouette weight.
- Fog begins inside the non-interactive middle distance and merges distant structures into the horizon.
- The procedural sky may use sparse shader stars and a subdued galactic haze, but no bloom, lens flare, volumetric shafts, glowing terrain, or bright science-fiction lighting.
- UI legibility takes priority over dramatic contrast.

### Destination architecture

Each site is fictional engineering infrastructure with a purpose-specific silhouette:

- Research Outpost: low paired habitat/instrument modules and a compact solar surface.
- Mission Archive: heavy monolithic data vault with protective side buttresses.
- Systems Lab: open test gantry, equipment vessels, exposed bench hardware, and mast.
- Signal Array: dominant angled communications dish and ground equipment.
- Field Log: small isolated console with a narrow recording mast.
- Trajectory Waypoint: the thinnest and tallest navigation beacon.

Do not copy real NASA/JPL buildings, vehicles, or mission hardware.

### Silhouette and beacon rules

- A site should be identifiable from its outer contour before its material detail.
- Preserve meaningful differences in height, width, openness, and dominant axis.
- Beacons use hairline masts, small status lamps, and faint ground rings.
- Never use giant permanent floating text, oversized icons, or arcade checkpoint effects.
- Site names remain in the HTML mission-control HUD and accessible directory.

### Environmental storytelling

- Use only a few traces of activity: paired rover tracks, field cases, sensor masts, solar surfaces, equipment frames, and communications hardware.
- Details should suggest ongoing engineering work without creating a colony or military base.
- No people, astronauts, weapons, flags, corporate logos, or fictional scientific claims.

### Geometry limits

- Prefer boxes, cylinders, low-segment spheres, and simple custom procedural geometry.
- Keep terrain under a few thousand vertices and repeated props in the low tens.
- Keep shadow maps at or below 1024² and device pixel ratio capped at 1.5.
- Do not add physics, post-processing, large particles, texture atlases, or high-resolution terrain textures.

### Future asset guidance

Future authored models should preserve the current component boundaries and site footprints. Use compact glTF/GLB assets with baked material variation, restrained polygon counts, and no embedded branding. Replace one site at a time and retain the procedural version until desktop, fallback, accessibility, and performance validation pass.
