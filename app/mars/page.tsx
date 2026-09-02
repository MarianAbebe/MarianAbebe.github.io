import { MissionCard, SignalCard, LogbookCard, TrajectoryWaypoint } from "@/components/cards";
import { Footer, Navigation } from "@/components/navigation";
import { ArrowLink, SectionHeader, TechnicalPanel, TelemetryLabel } from "@/components/ui";
import { missions } from "@/data/missions";
import { signals } from "@/data/signals";
import { trajectory } from "@/data/trajectory";
import { systems } from "@/data/systems";
import { logbookEntries } from "@/data/logbook";
import { externalLinks } from "@/data/links";
import { MarsExperienceLoader } from "@/components/mars/MarsExperienceLoader";

export default function MarsPage() {
  return <><Navigation /><main id="top" className="site-main">
    <MarsExperienceLoader />

    <section id="about" className="content-section"><SectionHeader index="01" eyebrow="IDENTITY FILE" title="About the operator" description="A concise personal introduction will establish the person behind the systems." />
      <TechnicalPanel className="about-panel"><div><TelemetryLabel>PERSONNEL RECORD // UNPOPULATED</TelemetryLabel><p className="large-copy">I’m Marian Abebe. This space will introduce my studies, the engineering questions I care about, and the path drawing me toward autonomous robotics and space systems.</p></div><div className="profile-placeholder" aria-label="Portrait placeholder"><span>PORTRAIT<br />PENDING</span></div></TechnicalPanel>
    </section>

    <section id="missions" className="content-section"><SectionHeader index="02" eyebrow="SURFACE OPERATIONS" title="Selected missions" description="Engineering work documented as evidence-led case studies." /><div className="mission-grid">{missions.map((m) => <MissionCard mission={m} key={m.id} />)}</div></section>

    <section id="journey" className="content-section trajectory-section"><SectionHeader index="03" eyebrow="FLIGHT PATH" title="Engineering trajectory" description="Waypoints charting the route toward autonomous systems and space." /><ol className="trajectory-list">{trajectory.map((p, i) => <TrajectoryWaypoint key={p.id} point={p} index={i} />)}</ol></section>

    <section id="systems" className="content-section"><SectionHeader index="04" eyebrow="SYSTEM MAP" title="Capabilities in context" description="No ratings. Each system will connect to work where it was used." /><div className="systems-grid">{systems.map((s, i) => <TechnicalPanel key={s.id} label={`SYS // ${String(i + 1).padStart(2,"0")}`}><span className="system-category">{s.category}</span><h3>{s.skill}</h3><p>{s.description}</p><span className="linked-mission">LINKED MISSIONS {"//"} {s.relatedMissionIds.length || "PENDING"}</span></TechnicalPanel>)}</div></section>

    <section id="signals" className="content-section"><SectionHeader index="05" eyebrow="INCOMING TRANSMISSIONS" title="Signals received" description="Verified awards, features, publications, and recognition will live here." /><div className="signal-grid">{signals.map((s) => <SignalCard key={s.id} signal={s} />)}</div></section>

    <section id="logbook" className="content-section"><SectionHeader index="06" eyebrow="FIELD NOTES" title="Mission logbook" description="Technical reflections and evolving ideas, designed to change over time." /><div className="logbook-list">{logbookEntries.map((e, i) => <LogbookCard key={e.slug} entry={e} index={i} />)}</div><ArrowLink href="/logbook">OPEN FULL LOGBOOK</ArrowLink></section>

    <section id="contact" className="contact-section"><div><TelemetryLabel>07 // GROUND STATIONS</TelemetryLabel><h2>Establish<br /><em>contact.</em></h2><p>Choose a channel for project details, professional context, or a direct message.</p></div><div className="contact-links">{externalLinks.map((l) => l.href === "#" ? <span className="contact-link disabled" key={l.label}><small>{l.callsign}</small>{l.label}<b>PENDING</b></span> : <a className="contact-link" key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><small>{l.callsign}</small>{l.label}<b>↗</b></a>)}</div></section>
  </main><Footer /></>;
}
