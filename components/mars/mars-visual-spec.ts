import * as THREE from "three";

export const MARS_VISUAL_SPEC = {
  palette: {
    void: "#03050B", skyTop: "#02040B", skyHorizon: "#10152A",
    terrainDark: "#080B16", terrainMid: "#11172A", terrainHigh: "#202744", ridge: "#090D19",
    structureDark: "#111522", structureMid: "#272D3D", structureLight: "#B8BDCA",
    roverBody: "#D8D8D2", roverSecondary: "#858B99", roverMechanical: "#101219", roverTire: "#07080C",
    textPrimary: "#EEECE5", textSecondary: "#999AA5",
    violet: "#956CFF", violetBright: "#B292FF", violetDim: "#493579", blueLight: "#758ED8",
    healthy: "#70D6A0", warning: "#E3B36A", rearLight: "#D84B58",
  },
  camera: {
    fov: 48, near: 0.1, far: 180,
    roverOffset: new THREE.Vector3(0, 4, 8.5), lookOffset: new THREE.Vector3(0, 1.25, -5.5),
    positionDamping: 4.5, targetDamping: 5.5,
  },
  world: { playableRadius: 27, visualRadius: 90, horizonDistance: 70, ridgeDistance: 62 },
  fog: { color: "#090D19", near: 28, far: 92 },
  lighting: {
    ambientIntensity: 0.18,
    moon: { color: "#A8B9FF", intensity: 2.2, position: [-18, 28, 12] as const },
    hemisphere: { skyColor: "#4C5F9A", groundColor: "#080A11", intensity: 0.55 },
    violetPractical: { color: "#956CFF", intensity: 2.8, distance: 11, decay: 2 },
    whitePractical: { color: "#E5E7EE", intensity: 1.8, distance: 9, decay: 2 },
  },
  shadows: { mapSize: 1024, cameraSize: 35, bias: -0.0003 },
  labels: { maxDistance: 45, fadeStart: 32, lineHeight: 2.8 },
  sky: { radius: 150, starCount: 900, galacticCount: 500, starDistance: [90, 130] as const, bandSigma: 0.12, bandRotationZ: THREE.MathUtils.degToRad(25) },
  rover: {
    width: 3.2, length: 4.8, bodyHeight: 1, totalMastHeight: 3,
    chassis: [2.8, 0.75, 4] as const, chassisY: 1.25,
    deck: [2.25, 0.35, 2.5] as const, deckY: 1.8,
    wheelRadius: 0.55, wheelWidth: 0.38, wheelX: 1.65, wheelZ: [-1.45, 0, 1.45] as const,
  },
  destinations: {
    waypoint: { position: [-18, 0, -25] as const },
    array: { position: [17, 0, -23] as const, rotationY: -0.25, dishDiameter: 7.5, dishDepth: 1.8 },
    lab: { position: [-5, 0, -20] as const, footprint: [8, 6] as const },
    archive: { position: [8, 0, -16] as const, primary: [6.2, 5.8, 5.2] as const, secondary: [4.5, 2, 5.8] as const },
    fieldLog: { position: [-17, 0, -11] as const },
    outpost: { position: [19, 0, -10] as const },
    spawn: [0, 0, 8] as const,
  },
} as const;

export type MarsVisualSpec = typeof MARS_VISUAL_SPEC;
