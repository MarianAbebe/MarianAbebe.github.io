import { MissionCard, LogbookCard, TrajectoryWaypoint } from "@/components/cards";
import { Footer, Navigation } from "@/components/navigation";
import { ArrowLink, SectionHeader, TelemetryLabel } from "@/components/ui";
import { AboutIdentity, SignalStrip, SystemsIndex } from "@/components/editorial";
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

    <section id="about" className="content-section section-density-standard"><SectionHeader index="01" eyebrow="IDENTITY FILE" title="About Marian" /><AboutIdentity />
    </section>

    <section id="missions" className="content-section section-density-feature"><SectionHeader index="02" eyebrow="SURFACE OPERATIONS" title="Selected missions" description="Engineering work documented as evidence-led case studies." /><div className="mission-grid">{missions.map((m) => <MissionCard mission={m} key={m.id} />)}</div></section>

    <section id="journey" className="content-section section-density-standard trajectory-section"><SectionHeader index="03" eyebrow="FLIGHT PATH" title="Engineering trajectory" description="Waypoints charting the route toward autonomous systems and space." /><ol className="trajectory-list">{trajectory.map((p, i) => <TrajectoryWaypoint key={p.id} point={p} index={i} />)}</ol></section>

    <section id="systems" className="content-section section-density-standard"><SectionHeader index="04" eyebrow="SYSTEM MAP" title="Capabilities in context" description="No ratings. Each system links to the project evidence where it was used." /><SystemsIndex systems={systems} missions={missions} /></section>

    <section id="signals" className="content-section section-density-compact"><SectionHeader index="05" eyebrow="INCOMING TRANSMISSIONS" title="Signals received" description="Verified research recognition and appointments." /><SignalStrip signals={signals} /></section>

    <section id="logbook" className="content-section section-density-standard"><SectionHeader index="06" eyebrow="FIELD NOTES" title="Mission logbook" description="Technical reflections and evolving ideas, designed to change over time." /><div className="logbook-list">{logbookEntries.map((e, i) => <LogbookCard key={e.slug} entry={e} index={i} />)}</div><ArrowLink href="/logbook">OPEN FULL LOGBOOK</ArrowLink></section>

    <section id="contact" className="contact-section"><div><TelemetryLabel>07 // GROUND STATIONS</TelemetryLabel><h2>Establish<br /><em>contact.</em></h2><p>Choose a channel for project details, professional context, or a direct message.</p></div><div><div className="contact-links">{externalLinks.map((l) => <a className="contact-link" key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><small>{l.callsign}</small>{l.label}<b>↗</b></a>)}</div><figure className="contact-space-signal"><TelemetryLabel>SIGNAL FROM ORBIT // SPACE NOTES</TelemetryLabel><video controls muted loop playsInline preload="metadata"><source src="/portfolio/landing/space-signal.mov" />Your browser does not support this video.</video><figcaption>A short collection of space moments and observations.</figcaption></figure></div></section>
  </main><Footer /></>;
}
