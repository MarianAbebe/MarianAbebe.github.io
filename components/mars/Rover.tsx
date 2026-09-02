"use client";

import { useMemo } from "react";
import type { RefObject } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

const P = SPEC.palette;
const R = SPEC.rover;

function RoundedMesh({
  size,
  position,
  color,
  radius = 0.12,
  roughness = 0.55,
  metalness = 0.2,
  rotation = [0, 0, 0],
}: {
  size: [number, number, number];
  position: [number, number, number];
  color: string;
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

function Strut({
  from,
  to,
  radius = 0.055,
  color = P.roverMechanical,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  radius?: number;
  color?: string;
}) {
  const { midpoint, length, quaternion } = useMemo(() => {
    const direction = to.clone().sub(from);
    const length = direction.length();
    const midpoint = from.clone().add(to).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize(),
    );
    return { midpoint, length, quaternion };
  }, [from, to]);

  return (
    <mesh position={midpoint} quaternion={quaternion} castShadow>
      <cylinderGeometry args={[radius, radius, length, 8]} />
      <meshStandardMaterial color={color} roughness={0.82} metalness={0.32} />
    </mesh>
  );
}

function Wheel({
  x,
  z,
}: {
  x: number;
  z: number;
}) {
  const innerX = Math.sign(x) * 1.15;
  const y = R.wheelRadius + 0.06;

  return (
    <group>
      <Strut
        from={new THREE.Vector3(innerX, 1.05, z * 0.88)}
        to={new THREE.Vector3(x * 0.93, y + 0.12, z)}
        radius={0.07}
      />
      <Strut
        from={new THREE.Vector3(innerX, 1.38, z * 0.7)}
        to={new THREE.Vector3(x * 0.91, y + 0.18, z)}
        radius={0.045}
        color={P.roverSecondary}
      />

      <mesh
        position={[x, y, z]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[R.wheelRadius, R.wheelRadius, R.wheelWidth, 24]} />
        <meshStandardMaterial
          color={P.roverTire}
          roughness={0.94}
          metalness={0.04}
        />
      </mesh>

      <mesh position={[x + Math.sign(x) * 0.012, y, z]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.29, 0.29, R.wheelWidth + 0.035, 18]} />
        <meshStandardMaterial
          color={P.roverMechanical}
          roughness={0.58}
          metalness={0.55}
        />
      </mesh>

      {[0.18, 0.36, 0.54, 0.72, 0.9].map((fraction) => (
        <mesh
          key={fraction}
          position={[x, y, z]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[1 + fraction * 0.003, 1, 1]}
        >
          <torusGeometry args={[R.wheelRadius * fraction, 0.014, 5, 24]} />
          <meshStandardMaterial color="#1A1E27" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

export function Rover({
  roverRef,
}: {
  roverRef: RefObject<Group | null>;
}) {
  const wheels = R.wheelZ.flatMap((z) =>
    [-R.wheelX, R.wheelX].map((x) => ({ x, z })),
  );

  return (
    <group ref={roverRef}>
      {/* Lower armored chassis */}
      <RoundedMesh
        size={[2.9, 0.68, 3.65]}
        position={[0, 1.22, 0.03]}
        color={P.roverMechanical}
        radius={0.16}
        roughness={0.64}
        metalness={0.32}
      />

      {/* Main pale hull: two overlapping beveled volumes give a tapered visual read. */}
      <RoundedMesh
        size={[2.72, 0.66, 2.8]}
        position={[0, 1.56, -0.22]}
        color={P.roverBody}
        radius={0.22}
        roughness={0.5}
        metalness={0.18}
      />
      <RoundedMesh
        size={[2.38, 0.42, 1.25]}
        position={[0, 1.72, -1.46]}
        color={P.structureWhite}
        radius={0.18}
        roughness={0.48}
        metalness={0.18}
        rotation={[0.08, 0, 0]}
      />

      {/* Upper avionics deck */}
      <RoundedMesh
        size={[2.1, 0.34, 1.85]}
        position={[0, 2.0, 0.12]}
        color={P.roverSecondary}
        radius={0.12}
        roughness={0.5}
        metalness={0.27}
      />

      {/* Dark equipment rails */}
      {[-0.83, 0.83].map((x) => (
        <mesh key={x} position={[x, 2.18, 0.08]} castShadow>
          <boxGeometry args={[0.075, 0.12, 1.8]} />
          <meshStandardMaterial
            color={P.roverMechanical}
            roughness={0.7}
            metalness={0.35}
          />
        </mesh>
      ))}

      {/* Six-wheel suspension */}
      {wheels.map(({ x, z }) => (
        <Wheel key={`${x}-${z}`} x={x} z={z} />
      ))}

      {/* Mast tower */}
      <mesh position={[0, 2.72, -0.45]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 1.45, 10]} />
        <meshStandardMaterial
          color={P.roverSecondary}
          roughness={0.46}
          metalness={0.5}
        />
      </mesh>

      <Strut
        from={new THREE.Vector3(-0.28, 2.14, -0.36)}
        to={new THREE.Vector3(0, 3.12, -0.45)}
        radius={0.032}
        color={P.roverSecondary}
      />
      <Strut
        from={new THREE.Vector3(0.28, 2.14, -0.36)}
        to={new THREE.Vector3(0, 3.12, -0.45)}
        radius={0.032}
        color={P.roverSecondary}
      />

      {/* Sensor head */}
      <RoundedMesh
        size={[1.02, 0.38, 0.46]}
        position={[0, 3.42, -0.46]}
        color={P.roverMechanical}
        radius={0.1}
        roughness={0.45}
        metalness={0.38}
      />
      <RoundedMesh
        size={[0.82, 0.16, 0.08]}
        position={[0, 3.42, -0.705]}
        color="#171D2B"
        radius={0.03}
        roughness={0.35}
        metalness={0.2}
      />

      {[-0.24, 0.24].map((x) => (
        <group key={x}>
          <mesh
            position={[x, 3.42, -0.765]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.075, 0.075, 0.035, 16]} />
            <meshStandardMaterial
              color="#0B1020"
              emissive={P.blueLight}
              emissiveIntensity={0.4}
              metalness={0.65}
              roughness={0.25}
            />
          </mesh>
          <pointLight
            position={[x, 3.42, -0.82]}
            color={P.blueLight}
            intensity={0.08}
            distance={1.7}
          />
        </group>
      ))}

      {/* Antenna + compact high-gain dish */}
      <mesh position={[0.44, 3.96, -0.2]}>
        <cylinderGeometry args={[0.022, 0.025, 1.15, 8]} />
        <meshStandardMaterial color={P.structureLight} metalness={0.5} />
      </mesh>

      {/* Small dish using a lathed parabola; avoids the "flat coin" look. */}
      <SmallDish />

      {/* Rear lights */}
      {[-0.72, 0.72].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.53, 1.93]}>
            <sphereGeometry args={[0.075, 10, 10]} />
            <meshBasicMaterial color={P.rearLight} />
          </mesh>
          <pointLight
            position={[x, 1.54, 2.0]}
            color={P.rearLight}
            intensity={0.12}
            distance={1.5}
          />
        </group>
      ))}

      {/* MA-01 identity stripe */}
      <mesh position={[0, 1.72, 1.66]}>
        <boxGeometry args={[1.0, 0.11, 0.025]} />
        <meshBasicMaterial color={P.violetDim} />
      </mesh>
    </group>
  );
}
function SmallDish() {
  const profile = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const r = (0.42 * i) / 9;
        return new THREE.Vector2(r, 0.15 * (r / 0.42) ** 2);
      }),
    [],
  );

  return (
    <group position={[0.82, 2.55, 0.48]} rotation={[-0.85, 0.2, -0.35]}>
      <mesh castShadow>
        <latheGeometry args={[profile, 28]} />
        <meshStandardMaterial
          color={P.structureLight}
          side={THREE.DoubleSide}
          roughness={0.36}
          metalness={0.55}
        />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.52, 8]} />
        <meshStandardMaterial color={P.roverMechanical} metalness={0.55} />
      </mesh>
    </group>
  );
}
