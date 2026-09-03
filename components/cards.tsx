/* eslint-disable @next/next/no-img-element */
import type { LogbookEntry, Mission, Signal, TrajectoryPoint } from "@/types/content";
import { ArrowLink, SystemTag, TelemetryLabel } from "./ui";

export function MissionCard({ mission }: { mission: Mission }) {
  return <article className={`mission-card ${mission.featured ? "featured" : ""}`}>
    <div className="card-top"><TelemetryLabel>MISSION {"//"} {mission.missionNumber}</TelemetryLabel><TelemetryLabel>{mission.status}</TelemetryLabel></div>
    {mission.heroImage ? <div className="mission-visual mission-visual-image"><img src={mission.heroImage} alt={mission.heroImageAlt ?? `${mission.title} project cover`} style={mission.heroImagePosition ? { objectPosition: mission.heroImagePosition } : undefined} /></div> : null}
    <div><p className="domain">{mission.domain}</p><h3>{mission.title}</h3><p>{mission.summary}</p></div>
    <div className="tag-row">{mission.technologies.map((t) => <SystemTag key={t}>{t}</SystemTag>)}</div>
    <ArrowLink href={`/missions/${mission.slug}`}>OPEN MISSION FILE</ArrowLink>
  </article>;
}

export function SignalCard({ signal }: { signal: Signal }) {
  return <article className="signal-card"><div className="signal-pulse" aria-hidden="true" /><TelemetryLabel>{signal.type} {"//"} {signal.date}</TelemetryLabel><h3>{signal.title}</h3><p>{signal.description}</p><span className="source">SOURCE {"//"} {signal.source}</span></article>;
}

export function LogbookCard({ entry, index }: { entry: LogbookEntry; index: number }) {
  return <article className="logbook-card"><div><TelemetryLabel>ENTRY {String(index + 1).padStart(3, "0")} {"//"} V{entry.version}</TelemetryLabel><h3>{entry.title}</h3><p>{entry.summary}</p></div><div className="log-meta"><span>{entry.date}</span><span>{entry.status}</span></div><ArrowLink href={`/logbook/${entry.slug}`}>READ ENTRY</ArrowLink></article>;
}

export function TrajectoryWaypoint({ point, index }: { point: TrajectoryPoint; index: number }) {
  return <li className="waypoint"><span className="waypoint-node" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><TelemetryLabel>{point.marker} {"//"} {point.date}</TelemetryLabel><h3>{point.title}</h3><p>{point.description}</p></div></li>;
}
