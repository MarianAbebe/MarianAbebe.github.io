"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Sprite } from "three";
import type { MarsDestination, MarsPosition } from "@/types/mars";
import { terrainHeight } from "./MarsTerrain";
import { DestinationStructure } from "./DestinationStructures";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

function DestinationLabel({
  destination,
  roverPosition,
}: {
  destination: MarsDestination;
  roverPosition: MarsPosition;
}) {
  const group = useRef<Group>(null);
  const sprite = useRef<Sprite>(null);
  const lastDistance = useRef(-1);

  const labelY = {
    array: 11.4,
    archive: 8.5,
    lab: 7.0,
    outpost: 5.1,
    "field-log": 6.0,
    waypoint: 7.2,
  }[destination.structure];

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.minFilter = THREE.LinearFilter;
    map.magFilter = THREE.LinearFilter;
    return map;
  }, []);

  useFrame(({ camera }) => {
    if (!group.current || !sprite.current) return;

    const world = group.current.getWorldPosition(new THREE.Vector3());
    const cameraDistance = camera.position.distanceTo(world);
    const rounded = Math.round(
      Math.hypot(
        destination.position[0] - roverPosition[0],
        destination.position[2] - roverPosition[2],
      ),
    );

    const material = sprite.current.material as THREE.SpriteMaterial;
    group.current.visible = cameraDistance < SPEC.labels.maxDistance;

    if (rounded !== lastDistance.current && material.map) {
      lastDistance.current = rounded;
      const canvas = material.map.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "600 25px monospace";
      ctx.fillStyle = SPEC.palette.textPrimary;
      ctx.fillText(destination.label.toUpperCase(), 12, 39);

      ctx.font = "20px monospace";
      ctx.fillStyle = SPEC.palette.violetBright;
      ctx.fillText(`${rounded} m`, 12, 77);

      material.map.needsUpdate = true;
    }

    const opacity =
      cameraDistance <= SPEC.labels.fadeStart
        ? 1
        : 1 -
          (cameraDistance - SPEC.labels.fadeStart) /
            (SPEC.labels.maxDistance - SPEC.labels.fadeStart);

    material.opacity = Math.max(0, opacity);
  });

  return (
    <group ref={group} position={[0, labelY, 0]}>
      <mesh position={[0, -SPEC.labels.lineHeight / 2, 0]}>
        <cylinderGeometry
          args={[0.009, 0.009, SPEC.labels.lineHeight, 4]}
        />
        <meshBasicMaterial
          color={SPEC.palette.violetDim}
          transparent
          opacity={0.52}
        />
      </mesh>

      <sprite
        ref={sprite}
        position={[1.8, 0.3, 0]}
        scale={[5.0, 1.25, 1]}
      >
        <spriteMaterial
          map={texture}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

export function DestinationMarker({
  destination,
  active,
  roverPosition,
  onAccess,
}: {
  destination: MarsDestination;
  active: boolean;
  roverPosition: MarsPosition;
  onAccess: (destination: MarsDestination) => void;
}) {
  const [x, , z] = destination.position;

  return (
    <group
      position={[x, terrainHeight(x, z), z]}
      onClick={(event) => {
        event.stopPropagation();
        onAccess(destination);
      }}
    >
      <DestinationStructure type={destination.structure} />
      <DestinationLabel
        destination={destination}
        roverPosition={roverPosition}
      />

      {/* Only reveal the thin ground ring when the rover is actually in range.
          It is interaction feedback, never the site's visual identity. */}
      {active && (
        <mesh
          position={[0, 0.045, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[3.1, 3.16, 64]} />
          <meshBasicMaterial
            color={SPEC.palette.violet}
            transparent
            opacity={0.38}
          />
        </mesh>
      )}
    </group>
  );
}
