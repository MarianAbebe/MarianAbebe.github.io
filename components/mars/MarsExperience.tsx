"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { marsDestinations } from "@/data/mars-destinations";
import type { MarsDestination, MarsPosition, RoverTelemetry } from "@/types/mars";
import { MarsFallback } from "./MarsFallback";
import { MarsHUD } from "./MarsHUD";

const MarsScene=dynamic(()=>import("./MarsScene"),{ssr:false,loading:()=> <div className="surface-loading">INITIALIZING MA-01 SURFACE SYSTEMS…</div>});
const defaultTelemetry:RoverTelemetry={position:[0,0,8],heading:0,speed:0,nearestId:"mission-archive",distance:25};

class SceneBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(error:Error,info:ErrorInfo){console.error("Mars scene unavailable",error,info)}render(){return this.state.failed?this.props.fallback:this.props.children}}
function supportsWebGL(){try{const canvas=document.createElement("canvas");return !!(canvas.getContext("webgl2")||canvas.getContext("webgl"))}catch{return false}}
function useMediaQuery(query:string){return useSyncExternalStore(callback=>{const media=matchMedia(query);media.addEventListener("change",callback);return()=>media.removeEventListener("change",callback)},()=>matchMedia(query).matches,()=>false)}
function instantScroll(top:number){const root=document.documentElement;const previous=root.style.scrollBehavior;root.style.scrollBehavior="auto";root.getBoundingClientRect();window.scrollTo({top,behavior:"auto"});setTimeout(()=>{root.style.scrollBehavior=previous},120)}

export default function MarsExperience(){
  const [telemetry,setTelemetry]=useState(defaultTelemetry);const mobile=useMediaQuery("(max-width: 760px)");const reduced=useMediaQuery("(prefers-reduced-motion: reduce)");const webgl=useMemo(()=>typeof window!=="undefined"&&supportsWebGL(),[]);const mode=mobile||reduced||!webgl?"fallback":"scene";const reason=mobile?"MOBILE MODE // DESTINATION-SELECT EXPLORATION":reduced?"CALM MODE // REDUCED MOTION":"WEBGL UNAVAILABLE // DIRECT ACCESS ENABLED";const [away,setAway]=useState(false);const [transitioning,setTransitioning]=useState(false);
  const initialPosition=useMemo<MarsPosition>(()=>{if(typeof window==="undefined")return[0,0,8];try{const value=sessionStorage.getItem("ma01-position");return value?JSON.parse(value):[0,0,8]}catch{return[0,0,8]}},[]);
  const report=useCallback((value:RoverTelemetry)=>{setTelemetry(value);try{sessionStorage.setItem("ma01-position",JSON.stringify(value.position))}catch{}},[]);
  const access=useCallback((site:MarsDestination)=>{setTransitioning(true);setTimeout(()=>{const target=document.getElementById(site.target);if(target)instantScroll(target.getBoundingClientRect().top+window.scrollY);setAway(true);setTransitioning(false)},180)},[]);
  const returnToSurface=()=>{instantScroll(0);setAway(false)};
  const nearest=marsDestinations.find(site=>site.id===telemetry.nearestId)??marsDestinations[0];
  return <section id="surface" className={`mars-experience ${transitioning?"surface-transitioning":""}`} aria-label="MA-01 Mars surface exploration prototype">
    {mode==="fallback"&&<MarsFallback destinations={marsDestinations} onAccess={access} reason={reason}/>} 
    {mode==="scene"&&<SceneBoundary fallback={<MarsFallback destinations={marsDestinations} onAccess={access} reason="RENDERER OFFLINE // DIRECT ACCESS ENABLED"/>}><MarsScene destinations={marsDestinations} initialPosition={initialPosition} telemetry={telemetry} active={!away&&!transitioning} onTelemetry={report} onAccess={access}/><MarsHUD telemetry={telemetry} nearest={nearest} destinations={marsDestinations} onAccess={access}/></SceneBoundary>}
    <a className="surface-skip" href="#about">SKIP EXPLORATION ↓</a>
    {away&&<button className="return-surface" onClick={returnToSurface}>← RETURN TO SURFACE</button>}
  </section>;
}
