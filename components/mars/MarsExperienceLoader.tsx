"use client";
import dynamic from "next/dynamic";
const Experience=dynamic(()=>import("./MarsExperience"),{ssr:false,loading:()=> <section className="mars-experience"><div className="surface-loading">BOOTING MA-01 NAVIGATION…</div></section>});
export function MarsExperienceLoader(){return <Experience/>}
