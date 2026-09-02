"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { MARS_VISUAL_SPEC as SPEC } from "./mars-visual-spec";

function rng(seed:number){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
function sphericalPoint(random:()=>number,min=90,max=130){const y=random()*.9+.08;const theta=random()*Math.PI*2;const r=min+random()*(max-min);const radial=Math.sqrt(1-y*y);return [Math.cos(theta)*radial*r,y*r,Math.sin(theta)*radial*r]}
function geometry(points:number[][]){const value=new THREE.BufferGeometry();value.setAttribute("position",new THREE.Float32BufferAttribute(points.flat(),3));return value}

function SkyGradient(){return <mesh scale={SPEC.sky.radius}><sphereGeometry args={[1,32,20]}/><shaderMaterial side={THREE.BackSide} depthWrite={false} vertexShader={`varying float vY;void main(){vY=normalize(position).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`} fragmentShader={`varying float vY;void main(){float h=smoothstep(-.08,.62,vY);gl_FragColor=vec4(mix(vec3(.0627,.0824,.1647),vec3(.0078,.0157,.0431),h),1.0);}`}/></mesh>}
function StarField(){const groups=useMemo(()=>{const random=rng(4107);return [765,108,27].map(count=>geometry(Array.from({length:count},()=>sphericalPoint(random))))},[]);return <group>{groups.map((item,i)=><points key={i} geometry={item}><pointsMaterial color={i===2?"#E5E7EE":"#AEB9D7"} size={[.03,.06,.09][i]} sizeAttenuation transparent opacity={[.42,.68,.95][i]} depthWrite={false} fog={false}/></points>)}</group>}
function GalacticBand(){const groups=useMemo(()=>{const random=rng(90210),blue:number[][]=[],violet:number[][]=[];for(let i=0;i<SPEC.sky.galacticCount;i++){const longitude=random()*Math.PI*2,u=Math.max(random(),1e-6),v=random(),latitude=Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)*SPEC.sky.bandSigma,r=98+random()*27,point=[Math.cos(latitude)*Math.cos(longitude)*r,Math.sin(latitude)*r,Math.cos(latitude)*Math.sin(longitude)*r];(i%5===0?violet:blue).push(point)}return[geometry(blue),geometry(violet)]},[]);return <group rotation={[0,0,SPEC.sky.bandRotationZ]}>{groups.map((item,i)=><points key={i} geometry={item}><pointsMaterial color={i?SPEC.palette.violetBright:"#C7D4FF"} size={.065} sizeAttenuation transparent opacity={i?.34:.3} depthWrite={false} fog={false}/></points>)}</group>}
function GalacticHaze(){return <mesh position={[0,34,-108]} rotation={[0,0,SPEC.sky.bandRotationZ]}><planeGeometry args={[150,20]}/><meshBasicMaterial color={SPEC.palette.blueLight} transparent opacity={.035} depthWrite={false} fog={false}/></mesh>}
export function SpaceSky(){return <group><SkyGradient/><GalacticHaze/><StarField/><GalacticBand/><mesh position={[-38,24,-70]}><sphereGeometry args={[1.1,16,16]}/><meshBasicMaterial color="#E5E7EE" fog={false}/></mesh></group>}
