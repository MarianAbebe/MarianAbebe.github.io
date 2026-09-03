import Link from "next/link";
import { IntroActions } from "@/components/intro-actions";
import { StatusIndicator, TelemetryLabel } from "@/components/ui";

export default function LaunchPage() {
  return <main className="launch-page">
    <div className="launch-top"><Link href="/mars" className="wordmark">MARIAN ABEBE</Link><StatusIndicator label="READY" /></div>
    <div className="launch-earth" aria-hidden="true" />
    <section className="launch-copy"><TelemetryLabel>PRE-FLIGHT // PORTFOLIO MISSION 001</TelemetryLabel><h1>ENGINEERING<br /><span>A TRAJECTORY</span><br /><em>TO SPACE.</em></h1><p>An evidence-led engineering portfolio spanning autonomous systems, embedded hardware, and spacecraft work.</p><IntroActions /></section>
  </main>;
}
