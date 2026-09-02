"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function gaussian(random: () => number) {
  const u = Math.max(random(), 1e-6);
  const v = Math.max(random(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function makeGeometry(points: number[][]) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(points.flat(), 3),
  );
  return geometry;
}

function sphericalPoint(
  random: () => number,
  min = SPEC.sky.starDistance[0],
  max = SPEC.sky.starDistance[1],
) {
  const theta = random() * Math.PI * 2;
  const y = random() * 0.92 + 0.03;
  const radial = Math.sqrt(Math.max(0, 1 - y * y));
  const r = min + random() * (max - min);

  return [
    Math.cos(theta) * radial * r,
    y * r,
    Math.sin(theta) * radial * r,
  ];
}

function SkyGradient() {
  return (
    <mesh scale={SPEC.sky.radius} renderOrder={-100}>
      <sphereGeometry args={[1, 48, 32]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        vertexShader={`
          varying float vY;
          void main() {
            vY = normalize(position).y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying float vY;
          void main() {
            vec3 zenith = vec3(0.0078, 0.0118, 0.0353);
            vec3 mid = vec3(0.0275, 0.0471, 0.1098);
            vec3 horizon = vec3(0.0902, 0.1333, 0.2824);
            float h = clamp(vY, 0.0, 1.0);
            vec3 col = mix(horizon, mid, smoothstep(0.02, 0.34, h));
            col = mix(col, zenith, smoothstep(0.30, 0.88, h));
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}

function StarField() {
  const geometries = useMemo(() => {
    const random = rng(4107);
    const dim: number[][] = [];
    const medium: number[][] = [];
    const bright: number[][] = [];

    for (let i = 0; i < SPEC.sky.starCount; i++) {
      const p = sphericalPoint(random);
      const bucket = random();
      if (bucket < 0.82) dim.push(p);
      else if (bucket < 0.965) medium.push(p);
      else bright.push(p);
    }

    return [makeGeometry(dim), makeGeometry(medium), makeGeometry(bright)];
  }, []);

  const config = [
    { color: "#92A4D7", size: 0.042, opacity: 0.36 },
    { color: "#D2DBFF", size: 0.07, opacity: 0.72 },
    { color: "#F5F2EB", size: 0.12, opacity: 1 },
  ];

  return (
    <group>
      {geometries.map((geometry, index) => (
        <points key={index} geometry={geometry}>
          <pointsMaterial
            color={config[index].color}
            size={config[index].size}
            sizeAttenuation
            transparent
            opacity={config[index].opacity}
            depthWrite={false}
            fog={false}
          />
        </points>
      ))}
    </group>
  );
}

function GalacticBand() {
  const { blue, violet, dust } = useMemo(() => {
    const random = rng(90210);
    const blue: number[][] = [];
    const violet: number[][] = [];
    const dust: number[][] = [];

    for (let i = 0; i < SPEC.sky.galacticCount; i++) {
      // Unlike the old full 360º belt, constrain the cloud to the northern
      // hemisphere so the galaxy reads as a visible arc in the spawn camera.
      const longitude = THREE.MathUtils.lerp(
        -Math.PI * 0.93,
        Math.PI * 0.93,
        random(),
      );
      const latitude =
        gaussian(random) * SPEC.sky.bandSigma +
        THREE.MathUtils.degToRad(22);
      const r = 122 + random() * 24;
      const p = [
        Math.cos(latitude) * Math.cos(longitude) * r,
        Math.sin(latitude) * r,
        Math.cos(latitude) * Math.sin(longitude) * r,
      ];

      (i % 6 === 0 ? violet : blue).push(p);
    }

    for (let i = 0; i < SPEC.sky.galacticDustCount; i++) {
      const longitude = THREE.MathUtils.lerp(
        -Math.PI * 0.8,
        Math.PI * 0.8,
        random(),
      );
      const latitude =
        gaussian(random) * SPEC.sky.bandSigma * 1.9 +
        THREE.MathUtils.degToRad(23);
      const r = 128 + random() * 15;
      dust.push([
        Math.cos(latitude) * Math.cos(longitude) * r,
        Math.sin(latitude) * r,
        Math.cos(latitude) * Math.sin(longitude) * r,
      ]);
    }

    return {
      blue: makeGeometry(blue),
      violet: makeGeometry(violet),
      dust: makeGeometry(dust),
    };
  }, []);

  return (
    <group rotation={[0.04, -0.16, SPEC.sky.bandRotationZ]}>
      <points geometry={dust}>
        <pointsMaterial
          color="#5C6EAE"
          size={0.18}
          sizeAttenuation
          transparent
          opacity={0.08}
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={blue}>
        <pointsMaterial
          color="#C8D4FF"
          size={0.075}
          sizeAttenuation
          transparent
          opacity={0.54}
          depthWrite={false}
          fog={false}
        />
      </points>
      <points geometry={violet}>
        <pointsMaterial
          color={SPEC.palette.violetBright}
          size={0.085}
          sizeAttenuation
          transparent
          opacity={0.4}
          depthWrite={false}
          fog={false}
        />
      </points>
    </group>
  );
}

function GalacticHaze() {
  // Two very soft translucent planes create the photographic-looking lavender
  // cloud from the reference without a large texture or post-processing stack.
  return (
    <group position={[0, 43, -120]} rotation={[0, 0, SPEC.sky.bandRotationZ]}>
      <mesh>
        <planeGeometry args={[180, 24, 1, 1]} />
        <meshBasicMaterial
          color="#5E73BD"
          transparent
          opacity={0.06}
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0, 0.1]} scale={[0.72, 0.62, 1]}>
        <planeGeometry args={[180, 24]} />
        <meshBasicMaterial
          color={SPEC.palette.violet}
          transparent
          opacity={0.036}
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export function SpaceSky() {
  return (
    <group>
      <SkyGradient />
      <GalacticHaze />
      <StarField />
      <GalacticBand />

      <mesh position={[-44, 31, -86]}>
        <sphereGeometry args={[0.78, 20, 20]} />
        <meshBasicMaterial color="#F4F1E9" fog={false} />
      </mesh>

      <mesh position={[-44, 31, -86]}>
        <sphereGeometry args={[2.6, 20, 20]} />
        <meshBasicMaterial
          color="#A9BAFF"
          transparent
          opacity={0.035}
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
