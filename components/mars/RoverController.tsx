"use client";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";
import type { MarsDestination, MarsPosition, RoverTelemetry } from "@/types/mars";
import { terrainHeight } from "./MarsTerrain";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

const LIMIT = SPEC.world.playableRadius;
export function RoverController({ roverRef, destinations, initialPosition, onTelemetry, onAccess, enabled }: { roverRef: React.RefObject<Group | null>; destinations: MarsDestination[]; initialPosition: MarsPosition; onTelemetry: (state: RoverTelemetry) => void; onAccess: (destination: MarsDestination) => void; enabled: boolean }) {
  const keys = useRef(new Set<string>()); const speed = useRef(0); const heading = useRef(0); const lastReport = useRef(0); const initialized = useRef(false);
  useEffect(() => {
    const down=(e:KeyboardEvent)=>{if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","e"].includes(e.key.toLowerCase())){e.preventDefault();keys.current.add(e.key.toLowerCase())}};
    const up=(e:KeyboardEvent)=>keys.current.delete(e.key.toLowerCase()); window.addEventListener("keydown",down);window.addEventListener("keyup",up);return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up)};
  },[]);
  useFrame((_,delta)=>{
    const rover=roverRef.current;if(!rover)return;if(!initialized.current){rover.position.set(...initialPosition);heading.current=0;initialized.current=true}
    if(!enabled){speed.current=0;return}
    const dt=Math.min(delta,.05);const forward=enabled&&(keys.current.has("w")||keys.current.has("arrowup"));const reverse=enabled&&(keys.current.has("s")||keys.current.has("arrowdown"));const steering=(keys.current.has("a")||keys.current.has("arrowleft")?1:0)-(keys.current.has("d")||keys.current.has("arrowright")?1:0);
    const target=forward?3.5:reverse?-2.2:0;speed.current=THREE.MathUtils.damp(speed.current,target,forward||reverse?2.4:4.5,dt);if(enabled&&Math.abs(speed.current)>.08)heading.current+=steering*dt*.72*(speed.current>=0?1:-1);
    rover.position.x=THREE.MathUtils.clamp(rover.position.x+Math.sin(heading.current)*speed.current*dt,-LIMIT,LIMIT);rover.position.z=THREE.MathUtils.clamp(rover.position.z-Math.cos(heading.current)*speed.current*dt,-LIMIT,LIMIT);rover.position.y=terrainHeight(rover.position.x,rover.position.z)+.02;rover.rotation.y=heading.current;
    let nearest=destinations[0];let distance=Infinity;for(const site of destinations){const d=Math.hypot(site.position[0]-rover.position.x,site.position[2]-rover.position.z);if(d<distance){nearest=site;distance=d}}
    if(enabled&&distance<6&&keys.current.has("e")){keys.current.delete("e");onAccess(nearest)}
    const now=performance.now();if(now-lastReport.current>100){lastReport.current=now;onTelemetry({position:[rover.position.x,rover.position.y,rover.position.z],heading:heading.current,speed:Math.abs(speed.current),nearestId:nearest.id,distance})}
  });
  return null;
}
