import { Footer, Navigation } from "@/components/navigation";
import { MissionCaseStudy } from "@/components/mission-case-study";
import { SystemTag, TelemetryLabel } from "@/components/ui";
import { missions } from "@/data/missions";
import { notFound } from "next/navigation";

const sections = ["MISSION OBJECTIVE", "SYSTEM OVERVIEW", "HARDWARE MANIFEST", "SOFTWARE STACK", "ARCHITECTURE", "MY CONTRIBUTION", "ANOMALY LOG", "INVESTIGATION", "RESOLUTION", "RESULT", "WHAT I LEARNED", "RELATED WRITING"];
export function generateStaticParams() { return missions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const m = missions.find((x) => x.slug === slug); return { title: m?.title ?? "Mission not found" }; }
export default async function MissionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const mission = missions.find((m) => m.slug === slug); if (!mission) notFound();
  if (mission.caseStudy) return <><Navigation /><MissionCaseStudy mission={mission} /><Footer /></>;
  return <><Navigation /><main className="case-study"><header className="case-header"><TelemetryLabel>MISSION {"//"} {mission.missionNumber} {"//"} {mission.status}</TelemetryLabel><p className="domain">{mission.domain}</p><h1>{mission.title}</h1><p className="case-summary">{mission.summary}</p><div className="case-meta"><span>ROLE<b>{mission.role}</b></span><span>DATE<b>{mission.date}</b></span><span>DOMAIN<b>{mission.domain}</b></span></div><div className="tag-row">{mission.technologies.map((t) => <SystemTag key={t}>{t}</SystemTag>)}</div></header><div className="case-sections">{sections.map((s, i) => <section key={s}><TelemetryLabel>{String(i + 1).padStart(2,"0")} {"//"} CASE FILE</TelemetryLabel><h2>{s}</h2><p>[Verified mission documentation will be added here.]</p></section>)}</div></main><Footer /></>;
}
