"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

const Y_AXIS = new THREE.Vector3(0, 1, 0);

export function RoverCamera({
  roverRef,
}: {
  roverRef: React.RefObject<Group | null>;
  calm: boolean;
}) {
  const target = useRef(new THREE.Vector3());
  const desired = useRef(new THREE.Vector3());
  const worldBehind = useRef(new THREE.Vector3());
  const worldAhead = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    const rover = roverRef.current;
    if (!rover) return;

    const dt = Math.min(delta, 0.05);

    worldBehind.current
      .copy(SPEC.camera.roverOffset)
      .applyAxisAngle(Y_AXIS, rover.rotation.y);

    worldAhead.current
      .copy(SPEC.camera.lookOffset)
      .applyAxisAngle(Y_AXIS, rover.rotation.y);

    desired.current.copy(rover.position).add(worldBehind.current);
    const lookAt = worldAhead.current.add(rover.position);

    camera.position.lerp(
      desired.current,
      1 - Math.exp(-SPEC.camera.positionDamping * dt),
    );

    target.current.lerp(
      lookAt,
      1 - Math.exp(-SPEC.camera.targetDamping * dt),
    );

    camera.lookAt(target.current);
  });

  return null;
}
