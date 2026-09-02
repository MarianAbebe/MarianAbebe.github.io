"use client";
import type { Group } from "three";
import type { RefObject } from "react";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";
const P=SPEC.palette,R=SPEC.rover;
export function Rover({roverRef}:{roverRef:RefObject<Group|null>}){const wheels=R.wheelZ.flatMap(z=>[-R.wheelX,R.wheelX].map(x=>[x,R.wheelRadius,z] as const));return <group ref={roverRef}>
  <mesh position={[0,R.chassisY,0]} castShadow><boxGeometry args={R.chassis}/><meshStandardMaterial color={P.roverBody} roughness={.55} metalness={.2}/></mesh>
  <mesh position={[0,R.deckY,-.2]} castShadow><boxGeometry args={R.deck}/><meshStandardMaterial color={P.roverSecondary} roughness={.55} metalness={.22}/></mesh>
  {wheels.map(([x,y,z],i)=><group key={i}><mesh position={[x*.87,y+.15,z]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.08,.08,.62,7]}/><meshStandardMaterial color={P.roverMechanical} roughness={.85}/></mesh><mesh position={[x,y,z]} rotation={[0,0,Math.PI/2]} castShadow><cylinderGeometry args={[R.wheelRadius,R.wheelRadius,R.wheelWidth,18]}/><meshStandardMaterial color={P.roverTire} roughness={.95} metalness={.05}/></mesh></group>)}
  <mesh position={[0,2.55,-.35]}><cylinderGeometry args={[.07,.09,1.4,8]}/><meshStandardMaterial color={P.roverSecondary} roughness={.5} metalness={.45}/></mesh>
  <mesh position={[0,3.25,-.35]} castShadow><boxGeometry args={[.9,.35,.35]}/><meshStandardMaterial color={P.roverMechanical} roughness={.5} metalness={.35}/></mesh>
  {[-.22,.22].map(x=><mesh key={x} position={[x,3.25,-.54]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.075,.075,.035,12]}/><meshStandardMaterial color="#172031" emissive={P.blueLight} emissiveIntensity={.22}/></mesh>)}
  <mesh position={[.42,3.75,-.12]}><cylinderGeometry args={[.025,.025,1.2,6]}/><meshStandardMaterial color={P.structureLight}/></mesh>
  <mesh position={[.8,2.25,.45]} rotation={[0,0,-.48]} castShadow><cylinderGeometry args={[.42,.42,.09,24]}/><meshStandardMaterial color={P.structureLight} roughness={.35} metalness={.62}/></mesh>
  {[-.72,.72].map(x=><mesh key={x} position={[x,1.25,2.02]}><sphereGeometry args={[.09,10,10]}/><meshBasicMaterial color={P.rearLight}/></mesh>)}
  <mesh position={[0,1.52,2.03]}><boxGeometry args={[.72,.18,.05]}/><meshStandardMaterial color={P.structureDark}/></mesh>
  </group>}
