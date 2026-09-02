"use client";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type { MarsDestination, MarsPosition, RoverTelemetry } from "@/types/mars";
import { DestinationMarker } from "./DestinationMarker";
import { MarsTerrain } from "./MarsTerrain";
import { Rover } from "./Rover";
import { RoverCamera } from "./RoverCamera";
import { RoverController } from "./RoverController";
import { SpaceSky } from "./SpaceSky";
import { MarsLighting } from "./MarsLighting";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

export default function MarsScene({ destinations, initialPosition, telemetry, active, onTelemetry, onAccess }: { destinations: MarsDestination[]; initialPosition: MarsPosition; telemetry: RoverTelemetry; active:boolean; onTelemetry:(value:RoverTelemetry)=>void; onAccess:(destination:MarsDestination)=>void }) {
  const roverRef=useRef<Group>(null);return <Canvas className="mars-canvas" shadows dpr={[1,1.5]} frameloop={active?"always":"demand"} camera={{fov:SPEC.camera.fov,near:SPEC.camera.near,far:SPEC.camera.far,position:[0,5,16]}} gl={{antialias:true,powerPreference:"high-performance"}}>
    <color attach="background" args={[SPEC.palette.void]}/><fog attach="fog" args={[SPEC.fog.color,SPEC.fog.near,SPEC.fog.far]}/><MarsLighting/>
    <SpaceSky/><MarsTerrain/><Rover roverRef={roverRef}/>{destinations.map(site=><DestinationMarker key={site.id} destination={site} roverPosition={telemetry.position} active={telemetry.nearestId===site.id&&telemetry.distance<7} onAccess={onAccess}/>)}
    <RoverController roverRef={roverRef} destinations={destinations} initialPosition={initialPosition} onTelemetry={onTelemetry} onAccess={onAccess} enabled={active}/><RoverCamera roverRef={roverRef} calm={false}/>
  </Canvas>;
}
