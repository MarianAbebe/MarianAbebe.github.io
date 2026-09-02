# MA-01 Deep Space V2 visual authority

The authored V2 rendering package integrated on this branch is the current implementation authority. Exact runtime values live in [`components/mars/mars-visual-spec.ts`](../components/mars/mars-visual-spec.ts); this document records the governing design and integration constraints without duplicating values that could drift.

## Target

The desktop experience is a third-person autonomous rover physically exploring a remote planetary engineering settlement at night. It must not read as a radar/map screen, abstract procedural demo, empty plane, decorative dashboard canvas, top-down strategy map, wireframe scene, low-poly block game, orange/red Mars environment, ROAM identity, or cyberpunk-neon composition.

## Authored V2 implementation

- Rounded/chamfered MA-01 hull volumes, layered chassis, detailed six-wheel running gear and suspension, stereo sensor head, mast bracing, high-gain dish, and restrained practical lights.
- A displaced 96×96 terrain system with layered macro elevation and FBM, quiet areas, clustered icosahedral rocks, tire impressions, and layered distant ridges.
- A gradient dome, 1,250 deterministic stars, a 900-star galactic arc, 380-point dust layer, two low-cost additive haze planes, and a bright celestial body.
- Six separate physical destination implementations using rounded industrial volumes, trusses, concave dish geometry, habitat ribs/windows, stepped archive masses, an open lab gantry, and restrained white/violet practical lighting.
- A close, low, forward-looking third-person camera, ACES filmic tone mapping, cool directional key, subtle violet rim, low ambient illumination, and violet used as illumination rather than terrain paint.

## Integration constraints

Preserve `RoverController`, destination routing, content transitions, session position restoration, mobile fallback, reduced-motion fallback, semantic navigation, portfolio content, DPR cap, and the existing shadow budget. Compatibility fixes must be the smallest code-level adaptation that preserves the authored rendering.

The reference composition remains `MA01_DeepSpace_V2_ReferenceImplementation/docs/reference/deep-space-target.png` in the supplied package. Acceptance requires a 1440×900 comparison showing a foreground rover hero, at least roughly 30% sky, a visible galactic arc and horizon, an unmistakable Signal Array dish, habitat-readable Research Outpost, at least three visible sites, violet primarily as light, and clear foreground/midground/background separation.
