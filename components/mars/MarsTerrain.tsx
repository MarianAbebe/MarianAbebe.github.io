"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

function hash(x: number, z: number) {
  const v = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return v - Math.floor(v);
}

function smoothNoise(x: number, z: number) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);

  const a = hash(ix, iz);
  const b = hash(ix + 1, iz);
  const c = hash(ix, iz + 1);
  const d = hash(ix + 1, iz + 1);

  return THREE.MathUtils.lerp(
    THREE.MathUtils.lerp(a, b, ux),
    THREE.MathUtils.lerp(c, d, ux),
    uz,
  );
}

function fbm(x: number, z: number) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 0.08;

  for (let octave = 0; octave < 4; octave++) {
    value += (smoothNoise(x * frequency, z * frequency) - 0.5) * amplitude;
    frequency *= 2.08;
    amplitude *= 0.48;
  }

  return value;
}

export function terrainHeight(x: number, z: number) {
  const r = Math.hypot(x, z);

  // Broad central basin + soft perimeter rise.
  const basin = THREE.MathUtils.smoothstep(r, 12, 72) * 1.35;

  // Long undulations keep the horizon organic instead of "noise carpet".
  const macro =
    Math.sin(x * 0.055 + z * 0.018) * 0.44 +
    Math.cos(z * 0.047 - x * 0.013) * 0.36 +
    Math.sin((x + z) * 0.026) * 0.22;

  // Small detail is intentionally low amplitude to keep MA-01 drivable.
  const detail = fbm(x, z) * 0.95;

  // A shallow low corridor through spawn gives a compositional "road".
  const corridor = -Math.exp(-Math.pow(x / 8.5, 2)) * 0.24;

  return basin + macro + detail + corridor;
}

const rockClusters = [
  [-10, 4, 5],
  [-19, -3, 4],
  [9, -4, 4],
  [21, 1, 5],
  [-26, -16, 4],
  [28, -18, 4],
  [-11, -30, 5],
  [13, -33, 5],
  [6, 20, 4],
  [-31, 15, 4],
] as const;

function makeRockLayout() {
  const random = (() => {
    let seed = 8128;
    return () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  })();

  return rockClusters.flatMap(([cx, cz, count], clusterIndex) =>
    Array.from({ length: count }, (_, i) => {
      const angle = random() * Math.PI * 2;
      const distance = 0.8 + random() * 4.1;
      const scale = 0.24 + random() * 1.05;
      return {
        x: cx + Math.cos(angle) * distance,
        z: cz + Math.sin(angle) * distance,
        scale,
        stretchX: 0.75 + random() * 1.6,
        stretchY: 0.55 + random() * 0.65,
        stretchZ: 0.72 + random() * 1.4,
        rotation: [
          (random() - 0.5) * 0.7,
          random() * Math.PI * 2,
          (random() - 0.5) * 0.35,
        ] as [number, number, number],
        variant: (clusterIndex + i) % 3,
      };
    }),
  );
}

function makeRidges() {
  return Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    const r =
      SPEC.world.ridgeDistance +
      Math.sin(i * 2.14) * 4 +
      ((i % 4) - 1.5) * 1.4;

    return {
      x: Math.sin(a) * r,
      z: Math.cos(a) * r,
      radius: 5.5 + (i % 5) * 1.4,
      height: 3.2 + ((i * 7) % 5) * 1.05,
      radialSegments: 7 + (i % 3),
      rotation: a + Math.PI / 4,
    };
  });
}

function RoverTracks() {
  return (
    <group>
      {[-0.79, 0.79].map((x) => (
        <mesh
          key={x}
          position={[x, terrainHeight(x, 2.5) + 0.025, 2.5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.18, 21]} />
          <meshBasicMaterial
            color="#02040A"
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* interrupted cross marks make the track read as tire impressions */}
      {Array.from({ length: 15 }, (_, i) => {
        const z = -7.2 + i * 1.25;
        return [-0.79, 0.79].map((x) => (
          <mesh
            key={`${i}-${x}`}
            position={[x, terrainHeight(x, z) + 0.033, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.31, 0.055]} />
            <meshBasicMaterial
              color="#010208"
              transparent
              opacity={0.72}
              depthWrite={false}
            />
          </mesh>
        ));
      })}
    </group>
  );
}

export function MarsTerrain() {
  const terrain = useMemo(() => {
    const plane = new THREE.PlaneGeometry(
      SPEC.world.visualRadius * 2,
      SPEC.world.visualRadius * 2,
      96,
      96,
    );
    plane.rotateX(-Math.PI / 2);

    const positions = plane.attributes.position;
    const colors: number[] = [];

    const dark = new THREE.Color(SPEC.palette.terrainDark);
    const mid = new THREE.Color(SPEC.palette.terrainMid);
    const high = new THREE.Color(SPEC.palette.terrainHigh);

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const y = terrainHeight(x, z);

      positions.setY(i, y);

      const localVariation = smoothNoise(x * 0.2, z * 0.2);
      const heightMix = THREE.MathUtils.clamp(
        0.32 + y * 0.1 + localVariation * 0.23,
        0,
        1,
      );

      const c =
        heightMix < 0.58
          ? dark.clone().lerp(mid, heightMix / 0.58)
          : mid.clone().lerp(high, (heightMix - 0.58) / 0.42);

      colors.push(c.r, c.g, c.b);
    }

    plane.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3),
    );
    positions.needsUpdate = true;
    plane.computeVertexNormals();

    return plane;
  }, []);

  const rocks = useMemo(() => makeRockLayout(), []);
  const ridges = useMemo(() => makeRidges(), []);

  return (
    <group>
      <mesh geometry={terrain} receiveShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.98}
          metalness={0.01}
        />
      </mesh>

      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={[
            rock.x,
            terrainHeight(rock.x, rock.z) + rock.scale * 0.38,
            rock.z,
          ]}
          rotation={rock.rotation}
          scale={[
            rock.scale * rock.stretchX,
            rock.scale * rock.stretchY,
            rock.scale * rock.stretchZ,
          ]}
          castShadow
          receiveShadow
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={
              rock.variant === 0
                ? SPEC.palette.terrainHigh
                : rock.variant === 1
                  ? SPEC.palette.terrainMid
                  : "#12192B"
            }
            roughness={1}
          />
        </mesh>
      ))}

      {ridges.map((ridge, i) => (
        <group
          key={i}
          position={[ridge.x, terrainHeight(ridge.x, ridge.z) - 2.1, ridge.z]}
          rotation={[0, ridge.rotation, 0]}
        >
          <mesh scale={[1.8, 1, 0.85]}>
            <coneGeometry
              args={[
                ridge.radius,
                ridge.height,
                ridge.radialSegments,
                1,
                false,
              ]}
            />
            <meshStandardMaterial
              color={SPEC.palette.ridge}
              roughness={1}
            />
          </mesh>
          <mesh
            position={[ridge.radius * 0.8, -0.35, -ridge.radius * 0.3]}
            scale={[1.15, 0.72, 1.0]}
          >
            <coneGeometry
              args={[
                ridge.radius * 0.72,
                ridge.height * 0.72,
                7,
                1,
                false,
              ]}
            />
            <meshStandardMaterial
              color="#090D19"
              roughness={1}
            />
          </mesh>
        </group>
      ))}

      <RoverTracks />
    </group>
  );
}
