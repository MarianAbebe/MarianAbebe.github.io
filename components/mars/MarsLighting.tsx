"use client";

import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

export function MarsLighting() {
  const L = SPEC.lighting;
  const S = SPEC.shadows;

  return (
    <>
      <ambientLight intensity={L.ambientIntensity} />

      <hemisphereLight
        args={[
          L.hemisphere.skyColor,
          L.hemisphere.groundColor,
          L.hemisphere.intensity,
        ]}
      />

      <directionalLight
        position={L.moon.position}
        color={L.moon.color}
        intensity={L.moon.intensity}
        castShadow
        shadow-mapSize={[S.mapSize, S.mapSize]}
        shadow-bias={S.bias}
        shadow-camera-left={-S.cameraSize}
        shadow-camera-right={S.cameraSize}
        shadow-camera-top={S.cameraSize}
        shadow-camera-bottom={-S.cameraSize}
      />

      {/* Violet rim comes from the settlement side of the basin.  It should
          catch only edges, not paint the whole terrain purple. */}
      <directionalLight
        position={L.rim.position}
        color={L.rim.color}
        intensity={L.rim.intensity}
      />
    </>
  );
}
