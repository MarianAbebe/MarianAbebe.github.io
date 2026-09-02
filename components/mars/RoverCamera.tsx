"use client";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

export function RoverCamera({ roverRef }: { roverRef: React.RefObject<Group | null>; calm: boolean }) {
  const target = useRef(new THREE.Vector3()); const desired = useRef(new THREE.Vector3());
  useFrame(({camera},delta)=>{const rover=roverRef.current;if(!rover)return;const dt=Math.min(delta,.05),axis=new THREE.Vector3(0,1,0);const behind=SPEC.camera.roverOffset.clone().applyAxisAngle(axis,rover.rotation.y);const ahead=SPEC.camera.lookOffset.clone().applyAxisAngle(axis,rover.rotation.y);desired.current.copy(rover.position).add(behind);const lookAt=rover.position.clone().add(ahead);camera.position.lerp(desired.current,1-Math.exp(-SPEC.camera.positionDamping*dt));target.current.lerp(lookAt,1-Math.exp(-SPEC.camera.targetDamping*dt));camera.lookAt(target.current)});
  return null;
}
