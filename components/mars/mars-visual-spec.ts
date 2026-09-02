import * as THREE from "three";

export const MARS_VISUAL_SPEC = {
  palette: {
    void: "#02030A",
    skyTop: "#02030A",
    skyHorizon: "#111A36",
    skyGlow: "#22356B",

    terrainDark: "#070A13",
    terrainMid: "#0D1324",
    terrainHigh: "#18213B",
    ridge: "#060914",

    structureDark: "#0D1220",
    structureMid: "#2B344A",
    structureLight: "#C6CBD8",
    structureWhite: "#E7E8E3",

    roverBody: "#E0E0DA",
    roverSecondary: "#9299A8",
    roverMechanical: "#121722",
    roverTire: "#06080E",

    textPrimary: "#F2F0EB",
    textSecondary: "#969CAB",

    violet: "#8C74FF",
    violetBright: "#B8A6FF",
    violetDim: "#493B80",
    blueLight: "#7D9BFF",
    blueGlow: "#4A63C7",

    healthy: "#70D6A0",
    warning: "#E3B36A",
    rearLight: "#EF6470",
  },

  camera: {
    fov: 46,
    near: 0.1,
    far: 220,
    roverOffset: new THREE.Vector3(0, 3.65, 7.2),
    lookOffset: new THREE.Vector3(0, 1.7, -8.2),
    positionDamping: 4.8,
    targetDamping: 5.7,
  },

  world: {
    playableRadius: 27,
    visualRadius: 100,
    horizonDistance: 76,
    ridgeDistance: 67,
  },

  fog: {
    color: "#080D1A",
    near: 31,
    far: 104,
  },

  lighting: {
    ambientIntensity: 0.09,
    hemisphere: {
      skyColor: "#6379C8",
      groundColor: "#03050B",
      intensity: 0.42,
    },
    moon: {
      color: "#B8C7FF",
      intensity: 2.65,
      position: [-22, 34, 18] as const,
    },
    rim: {
      color: "#725DFF",
      intensity: 1.15,
      position: [28, 11, -34] as const,
    },
    violetPractical: {
      color: "#8C74FF",
      intensity: 2.1,
      distance: 12,
      decay: 2,
    },
    whitePractical: {
      color: "#E8ECFF",
      intensity: 1.45,
      distance: 10,
      decay: 2,
    },
  },

  shadows: {
    mapSize: 1024,
    cameraSize: 42,
    bias: -0.00035,
  },

  sky: {
    radius: 170,
    starCount: 1250,
    galacticCount: 900,
    galacticDustCount: 380,
    starDistance: [105, 150] as const,
    bandSigma: 0.105,
    bandRotationZ: THREE.MathUtils.degToRad(22),
  },

  rover: {
    wheelRadius: 0.54,
    wheelWidth: 0.42,
    wheelX: 1.72,
    wheelZ: [-1.48, 0, 1.48] as const,
  },

  labels: {
    maxDistance: 58,
    fadeStart: 36,
    lineHeight: 2.5,
  },

  destinations: {
    waypoint: { position: [-18, 0, -25] as const },
    array: { position: [17, 0, -23] as const, rotationY: -0.25 },
    lab: { position: [-5, 0, -20] as const },
    archive: { position: [8, 0, -16] as const },
    fieldLog: { position: [-17, 0, -11] as const },
    outpost: { position: [19, 0, -10] as const },
    spawn: [0, 0, 8] as const,
  },
} as const;

export type MarsVisualSpec = typeof MARS_VISUAL_SPEC;
