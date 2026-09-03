/* eslint-disable @next/next/no-img-element */
import type { Signal, System } from "@/types/content";
import type { Mission } from "@/types/content";
import { TelemetryLabel } from "./ui";

export function AboutIdentity() {
  return <div className="about-editorial">
    <aside className="about-identity"><img src="/portfolio/personal/headshot.png" alt="Marian Abebe at an aviation museum" /><div><TelemetryLabel>IDENTITY // 01</TelemetryLabel><h3>Marian Abebe</h3><p>Electrical Engineering<br />University of Calgary<br />Calgary, Canada</p></div></aside>
    <div className="about-profile"><TelemetryLabel>ENGINEERING PROFILE</TelemetryLabel><p className="about-intro">Electrical engineering work across autonomous robotics, embedded hardware, and spacecraft systems.</p><p>I’m an Electrical Engineering student at the University of Calgary. My work includes autonomous UGV systems using ROS 2 and Autoware, CubeSat electronics and payload development, and embedded hardware with sensor integration.</p><p className="about-direction">I’m particularly interested in engineering problems where autonomy, sensing, embedded systems, and space systems overlap.</p><ul>{["AUTONOMOUS SYSTEMS", "EMBEDDED HARDWARE", "SPACECRAFT SYSTEMS"].map((item) => <li key={item}>{item}</li>)}</ul></div>
  </div>;
}

export function SystemsIndex({ systems, missions }: { systems: System[]; missions: Mission[] }) {
  return <div className="systems-index">{systems.map((system, index) => <article key={system.id} className="systems-index-row"><span className="systems-index-number">{String(index + 1).padStart(2, "0")}</span><div><TelemetryLabel>{system.category}</TelemetryLabel><h3>{system.skill}</h3><p>{system.description}</p></div><nav aria-label={`${system.skill} evidence`}>{system.relatedMissionIds.map((id) => { const mission = missions.find((item) => item.id === id); return mission ? <a href={`/missions/${mission.slug}`} key={id}>{mission.title} ↗</a> : null; })}</nav></article>)}</div>;
}

export function SignalStrip({ signals }: { signals: Signal[] }) {
  return <div className="signal-strip">{signals.map((signal) => <article key={signal.id}><span>{signal.date}</span><div><TelemetryLabel>{signal.type}</TelemetryLabel><h3>{signal.title}</h3><p>{signal.description}</p></div><small>SOURCE // {signal.source}</small></article>)}</div>;
}
