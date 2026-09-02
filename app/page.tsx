import Link from "next/link";
import { IntroActions } from "@/components/intro-actions";
import { StatusIndicator, TelemetryLabel } from "@/components/ui";

export default function LaunchPage() {
  return <main className="launch-page">
    <div className="launch-top"><Link href="/mars" className="wordmark">MARIAN ABEBE</Link><StatusIndicator label="READY" /></div>
    <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
    <div className="planet" aria-hidden="true"><div className="planet-light" /></div>
    <section className="launch-copy"><TelemetryLabel>PRE-FLIGHT // PORTFOLIO MISSION 001</TelemetryLabel><h1>ENGINEERING<br />A TRAJECTORY<br /><em>TO MARS.</em></h1><p>A cinematic entry point to an engineering portfolio built around exploration, evidence, and evolving ideas.</p><IntroActions /></section>
    <div className="launch-telemetry" aria-label="Mission telemetry"><span>ORIGIN<br /><b>EARTH</b></span><span>DESTINATION<br /><b>MARS</b></span><span>VEHICLE<br /><b>ROVER // PENDING</b></span></div>
  </main>;
}
