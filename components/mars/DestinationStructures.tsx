"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

const P = SPEC.palette;
const L = SPEC.lighting;

function Practical({
  position,
  type = "violet",
  intensity = 1,
}: {
  position: [number, number, number];
  type?: "violet" | "white";
  intensity?: number;
}) {
  const light =
    type === "white" ? L.whitePractical : L.violetPractical;

  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.075, 8, 8]} />
        <meshBasicMaterial color={light.color} />
      </mesh>
      <pointLight
        position={position}
        color={light.color}
        intensity={light.intensity * intensity}
        distance={light.distance}
        decay={light.decay}
      />
    </>
  );
}

function RoundedBlock({
  size,
  position,
  color = P.structureDark,
  radius = 0.16,
  roughness = 0.62,
  metalness = 0.28,
  rotation = [0, 0, 0],
}: {
  size: [number, number, number];
  position: [number, number, number];
  color?: string;
  radius?: number;
  roughness?: number;
  metalness?: number;
  rotation?: [number, number, number];
}) {
  const geometry = useMemo(
    () => new RoundedBoxGeometry(size[0], size[1], size[2], 4, radius),
    [size, radius],
  );

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}

function Beam({
  from,
  to,
  radius = 0.08,
  color = P.structureLight,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius?: number;
  color?: string;
}) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const direction = b.clone().sub(a);
  const midpoint = a.clone().add(b).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize(),
  );

  return (
    <mesh position={midpoint} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, direction.length(), 8]} />
      <meshStandardMaterial
        color={color}
        roughness={0.52}
        metalness={0.42}
      />
    </mesh>
  );
}

export function SignalArray() {
  const profile = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => {
        const r = (4.15 * i) / 19;
        const y = 1.9 * Math.pow(r / 4.15, 2);
        return new THREE.Vector2(r, y);
      }),
    [],
  );

  return (
    <group rotation={[0, SPEC.destinations.array.rotationY, 0]}>
      <RoundedBlock
        size={[5.4, 0.8, 4.6]}
        position={[0, 0.45, 0]}
        color={P.structureDark}
        radius={0.25}
      />

      <mesh position={[0, 2.35, 0]} castShadow>
        <cylinderGeometry args={[0.82, 1.3, 3.1, 14]} />
        <meshStandardMaterial
          color={P.structureMid}
          roughness={0.56}
          metalness={0.42}
        />
      </mesh>

      <group position={[0, 5.05, 0]} rotation={[-0.72, 0, 0.08]}>
        {/* True concave surface */}
        <mesh castShadow>
          <latheGeometry args={[profile, 48]} />
          <meshStandardMaterial
            color="#596176"
            side={THREE.DoubleSide}
            roughness={0.48}
            metalness={0.5}
          />
        </mesh>

        {/* Bright rim defines the silhouette at long range. */}
        <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[4.15, 0.07, 8, 56]} />
          <meshStandardMaterial
            color={P.structureLight}
            metalness={0.55}
            roughness={0.38}
          />
        </mesh>

        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle) => (
          <Beam
            key={angle}
            from={[
              Math.cos(angle) * 3.2,
              1.55,
              Math.sin(angle) * 3.2,
            ]}
            to={[0, 2.75, 0]}
            radius={0.045}
          />
        ))}

        <mesh position={[0, 2.78, 0]}>
          <sphereGeometry args={[0.27, 16, 12]} />
          <meshStandardMaterial
            color={P.structureWhite}
            roughness={0.34}
            metalness={0.56}
          />
        </mesh>
      </group>

      <Practical position={[-2.1, 0.6, 1.8]} intensity={0.8} />
      <Practical position={[0, 0.6, 2.15]} intensity={0.72} />
      <Practical position={[2.1, 0.6, 1.8]} intensity={0.8} />

      <Beam from={[-2.3, 0.8, -1.6]} to={[-1.5, 4.0, -0.8]} radius={0.055} />
      <Beam from={[2.3, 0.8, -1.6]} to={[1.5, 4.0, -0.8]} radius={0.055} />
    </group>
  );
}

function HabitatDome({
  position,
  radius,
}: {
  position: [number, number, number];
  radius: number;
}) {
  const ribs = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

  return (
    <group position={position}>
      <mesh scale={[1, 0.55, 1]} castShadow receiveShadow>
        <sphereGeometry
          args={[radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial
          color={P.structureLight}
          roughness={0.66}
          metalness={0.18}
        />
      </mesh>

      {/* Thin structural ribs soften the dome and make it feel engineered. */}
      {ribs.map((angle) => (
        <mesh
          key={angle}
          rotation={[0, angle, 0]}
          scale={[1, 0.55, 1]}
        >
          <torusGeometry
            args={[radius * 0.73, 0.025, 6, 36, Math.PI]}
          />
          <meshStandardMaterial
            color={P.structureDark}
            roughness={0.58}
            metalness={0.32}
          />
        </mesh>
      ))}

      {/* low glowing windows */}
      {[-0.55, 0, 0.55].map((x) => (
        <mesh
          key={x}
          position={[x * radius, 0.38, -radius * 0.88]}
        >
          <boxGeometry args={[0.3, 0.25, 0.03]} />
          <meshStandardMaterial
            color="#BFCBFF"
            emissive="#7E96E8"
            emissiveIntensity={0.72}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export function ResearchOutpost() {
  return (
    <group>
      <HabitatDome position={[-2.8, 0.03, 0]} radius={2.7} />
      <HabitatDome position={[2.0, 0.02, -1.2]} radius={2.2} />
      <HabitatDome position={[4.45, 0.01, 0.75]} radius={1.55} />

      <RoundedBlock
        size={[1.45, 1.05, 1.4]}
        position={[-0.18, 0.53, -0.9]}
        color={P.structureDark}
        radius={0.14}
      />

      {/* connected walkway */}
      <RoundedBlock
        size={[5.3, 0.18, 0.8]}
        position={[1.2, 0.2, 0.5]}
        color="#252D40"
        radius={0.08}
      />

      {/* Solar field */}
      {[0, 1].map((i) => (
        <group key={i} position={[6.1 + i * 1.75, 0.62, -1]}>
          <mesh rotation={[-0.25, 0, 0]}>
            <boxGeometry args={[1.5, 0.055, 2.25]} />
            <meshStandardMaterial
              color="#151D35"
              roughness={0.42}
              metalness={0.48}
            />
          </mesh>
          {[-0.45, 0, 0.45].map((x) => (
            <mesh key={x} position={[x, 0.02, 0]} rotation={[-0.25, 0, 0]}>
              <boxGeometry args={[0.018, 0.06, 2.18]} />
              <meshBasicMaterial color="#3C4C7A" />
            </mesh>
          ))}
        </group>
      ))}

      <Practical position={[-0.15, 1.15, -1.65]} type="white" intensity={0.8} />
      <Practical position={[2.0, 0.7, -3.1]} type="white" intensity={0.44} />
    </group>
  );
}

export function MissionArchive() {
  return (
    <group>
      <RoundedBlock
        size={[6.1, 5.45, 5.0]}
        position={[0, 2.72, 0]}
        color="#0B101D"
        radius={0.28}
        roughness={0.58}
        metalness={0.4}
      />

      {/* stepped side volume prevents giant-cube silhouette */}
      <RoundedBlock
        size={[3.6, 2.0, 5.6]}
        position={[3.25, 1.0, 1.0]}
        color={P.structureMid}
        radius={0.22}
      />

      <RoundedBlock
        size={[1.65, 1.9, 0.28]}
        position={[0, 0.98, 2.53]}
        color="#03050A"
        radius={0.08}
      />

      {/* inset vertical channels */}
      {[-1.7, -0.55, 0.6, 1.75].map((x, i) => (
        <mesh key={x} position={[x, 3.0, 2.54]}>
          <boxGeometry args={[i === 3 ? 0.08 : 0.13, 3.55, 0.05]} />
          <meshBasicMaterial
            color={i === 3 ? P.violet : "#252D40"}
          />
        </mesh>
      ))}

      {/* parapet / roof instrumentation */}
      <RoundedBlock
        size={[3.8, 0.32, 2.6]}
        position={[-0.6, 5.62, -0.35]}
        color={P.structureMid}
        radius={0.1}
      />
      <Beam
        from={[0.0, 5.7, -0.6]}
        to={[0.0, 7.4, -0.6]}
        radius={0.045}
      />

      <Practical position={[1.74, 2.3, 2.78]} intensity={0.62} />
    </group>
  );
}

export function SystemsLab() {
  const columns: [number, number, number][] = [
    [-3.2, 2.25, -2.1],
    [3.2, 2.25, -2.1],
    [-3.2, 2.25, 2.1],
    [3.2, 2.25, 2.1],
  ];

  return (
    <group>
      {columns.map((p, i) => (
        <RoundedBlock
          key={i}
          size={[0.28, 4.5, 0.28]}
          position={p}
          color={P.structureLight}
          radius={0.055}
          roughness={0.48}
          metalness={0.5}
        />
      ))}

      <Beam from={[-3.2, 4.45, -2.1]} to={[3.2, 4.45, -2.1]} radius={0.11} />
      <Beam from={[-3.2, 4.45, 2.1]} to={[3.2, 4.45, 2.1]} radius={0.11} />
      <Beam from={[-3.2, 4.45, -2.1]} to={[-3.2, 4.45, 2.1]} radius={0.11} />
      <Beam from={[3.2, 4.45, -2.1]} to={[3.2, 4.45, 2.1]} radius={0.11} />

      <RoundedBlock
        size={[5.5, 0.26, 1.45]}
        position={[0, 0.95, -1.45]}
        color={P.structureMid}
        radius={0.08}
      />

      <RoundedBlock
        size={[1.7, 1.25, 1.2]}
        position={[1.5, 1.55, -1.4]}
        color={P.structureDark}
        radius={0.14}
      />

      <mesh position={[-1.65, 1.6, -1.4]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 1.4, 16]} />
        <meshStandardMaterial
          color={P.structureMid}
          roughness={0.5}
          metalness={0.38}
        />
      </mesh>

      {/* test arm */}
      <Beam from={[-0.8, 2.25, 0.8]} to={[2.2, 2.9, 0.8]} radius={0.075} color={P.roverSecondary} />
      <Beam from={[2.2, 2.9, 0.8]} to={[2.6, 1.7, 0.8]} radius={0.075} color={P.roverSecondary} />

      <Beam from={[2.4, 4.55, -1.4]} to={[2.4, 6.2, -1.4]} radius={0.045} />

      <Practical position={[-2.75, 3.75, 0]} type="white" intensity={0.8} />
      <Practical position={[2.75, 3.75, 0]} type="white" intensity={0.8} />
      <Practical position={[0, 1.35, -0.8]} intensity={0.22} />
    </group>
  );
}

export function FieldLog() {
  return (
    <group>
      <RoundedBlock
        size={[2.1, 1.25, 1.65]}
        position={[0, 0.65, 0]}
        color={P.structureDark}
        radius={0.16}
      />
      <RoundedBlock
        size={[1.5, 0.16, 0.9]}
        position={[0, 1.48, -0.4]}
        color={P.structureLight}
        radius={0.05}
        rotation={[-0.35, 0, 0]}
      />
      <Beam from={[0.67, 1.1, 0.3]} to={[0.67, 4.0, 0.3]} radius={0.045} />
      <RoundedBlock
        size={[0.75, 0.6, 0.7]}
        position={[-1.3, 0.32, 0.5]}
        color={P.structureMid}
        radius={0.08}
      />
      <Practical position={[0.67, 4.08, 0.3]} intensity={0.68} />
    </group>
  );
}

export function TrajectoryWaypoint() {
  return (
    <group>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.72, 0.95, 0.7, 10]} />
        <meshStandardMaterial
          color={P.structureDark}
          roughness={0.62}
          metalness={0.36}
        />
      </mesh>

      <Beam from={[0, 0.7, 0]} to={[0, 4.8, 0]} radius={0.065} color={P.structureMid} />
      <Beam from={[-0.45, 1.15, 0]} to={[0, 2.1, 0]} radius={0.035} />
      <Beam from={[0.45, 1.15, 0]} to={[0, 2.1, 0]} radius={0.035} />
      <Beam from={[-0.37, 2.65, 0]} to={[0, 3.55, 0]} radius={0.03} />
      <Beam from={[0.37, 2.65, 0]} to={[0, 3.55, 0]} radius={0.03} />

      <mesh position={[0, 5.05, 0]}>
        <octahedronGeometry args={[0.26]} />
        <meshStandardMaterial
          color={P.violetBright}
          emissive={P.violet}
          emissiveIntensity={0.7}
        />
      </mesh>
      <Practical position={[0, 5.05, 0]} intensity={0.52} />
    </group>
  );
}

export function DestinationStructure({
  type,
}: {
  type: "archive" | "lab" | "array" | "outpost" | "waypoint" | "field-log";
}) {
  if (type === "array") return <SignalArray />;
  if (type === "outpost") return <ResearchOutpost />;
  if (type === "archive") return <MissionArchive />;
  if (type === "lab") return <SystemsLab />;
  if (type === "waypoint") return <TrajectoryWaypoint />;
  return <FieldLog />;
}
