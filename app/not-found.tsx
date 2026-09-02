import Link from "next/link";
import { TelemetryLabel } from "@/components/ui";
export default function NotFound() { return <main className="not-found"><div className="lost-orbit" aria-hidden="true"><i /></div><TelemetryLabel>ERROR // 404 // NAVIGATION FAILURE</TelemetryLabel><h1>SIGNAL<br /><em>LOST.</em></h1><p>TARGET COORDINATES COULD NOT BE RESOLVED</p><Link className="primary-button" href="/mars">RETURN TO MISSION CONTROL →</Link></main>; }
