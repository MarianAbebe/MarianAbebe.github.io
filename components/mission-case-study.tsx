import type { Mission, StackGroup, TechnicalChallenge } from "@/types/content";
import { EngineeringDiagram, ImageGallery, VideoEvidence } from "./mission-media";
import { StatusIndicator, SystemTag, TelemetryLabel } from "./ui";

export function MissionHero({ mission }: { mission: Mission }) {
  const study = mission.caseStudy!;
  return <header className="mission-hero">
    <div className="mission-hero-grid">
      <div><TelemetryLabel>MISSION ARCHIVE // {study.archiveId}</TelemetryLabel><p className="domain">{mission.domain}</p><h1>{mission.title}</h1><p className="mission-subtitle">{mission.subtitle}</p></div>
      <div className="mission-hero-status"><StatusIndicator label={mission.status} /><span>FILE CLASS // TECHNICAL CASE STUDY</span><span>MISSION {"//"} {mission.missionNumber}</span></div>
    </div>
    <div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div>
  </header>;
}

export function MissionMetadata({ mission }: { mission: Mission }) {
  return <dl className="mission-metadata"><div><dt>ROLE</dt><dd>{mission.role}</dd></div><div><dt>DATE</dt><dd>{mission.date}</dd></div><div><dt>DOMAIN</dt><dd>{mission.domain}</dd></div><div><dt>ARCHIVE STATUS</dt><dd>{mission.status}</dd></div></dl>;
}

export function CaseStudySection({ index, label, title, children, wide = false }: { index: number; label: string; title: string; children: React.ReactNode; wide?: boolean }) {
  return <section className={`archive-section ${wide ? "archive-section-wide" : ""}`}><header><TelemetryLabel>{String(index).padStart(2, "0")} {"//"} {label}</TelemetryLabel><h2>{title}</h2></header><div className="archive-section-content">{children}</div></section>;
}

export function Prose({ paragraphs }: { paragraphs: string[] }) { return <div className="case-prose">{paragraphs.map((text, index) => <p key={`${index}-${text}`}>{text}</p>)}</div>; }

export function SystemStack({ groups }: { groups: StackGroup[] }) {
  return <div className="system-stack">{groups.map((group) => <section key={group.label}><TelemetryLabel>{group.label}</TelemetryLabel><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>;
}

export function ChallengeCard({ challenge, index }: { challenge: TechnicalChallenge; index: number }) {
  const rows = [["SYMPTOM", challenge.symptom], ["INVESTIGATION", challenge.investigation], ["ROOT CAUSE", challenge.rootCause], ["RESOLUTION / WORKAROUND", challenge.resolution], ["ENGINEERING TAKEAWAY", challenge.takeaway]];
  return <article className="challenge-card"><header><TelemetryLabel>ANOMALY // {String(index).padStart(2, "0")}</TelemetryLabel><span className={`challenge-state ${challenge.status.toLowerCase()}`}>{challenge.status}</span><h3>{challenge.title}</h3></header><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>;
}

export function MissionCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  return <main className="mission-archive">
    <MissionHero mission={mission} /><MissionMetadata mission={mission} />
    <div className="archive-body">
      <CaseStudySection index={1} label="CONTEXT" title="Mission overview"><Prose paragraphs={c.overview} /></CaseStudySection>
      <CaseStudySection index={2} label="CONTRIBUTION" title="My role"><Prose paragraphs={c.role} /></CaseStudySection>
      {c.platform && <CaseStudySection index={3} label="PLATFORM" title="System / platform"><Prose paragraphs={c.platform} />{c.gallery && <ImageGallery media={c.gallery} />}</CaseStudySection>}
      {c.architecture && <CaseStudySection index={4} label="SYSTEM MAP" title="System architecture" wide><EngineeringDiagram media={c.architecture} /></CaseStudySection>}
      {c.sensorStack && <CaseStudySection index={5} label="HARDWARE" title="Sensor stack"><SystemStack groups={c.sensorStack} /></CaseStudySection>}
      {c.configuration && <CaseStudySection index={6} label="SOFTWARE" title="Autoware configuration"><Prose paragraphs={c.configuration} />{c.softwareStack && <SystemStack groups={c.softwareStack} />}</CaseStudySection>}
      {c.bringUp && <CaseStudySection index={7} label="INTEGRATION" title="Full-stack bring-up"><Prose paragraphs={c.bringUp} /></CaseStudySection>}
      {c.challenges && <CaseStudySection index={8} label="ANOMALY LOG" title="Engineering challenges" wide><div className="challenge-list">{c.challenges.map((item, i) => <ChallengeCard key={item.id} challenge={item} index={i + 1} />)}</div></CaseStudySection>}
      {c.demonstration && <CaseStudySection index={9} label="TECHNICAL EVIDENCE" title="Result / demonstration" wide><VideoEvidence media={c.demonstration} />{c.outcome && <Prose paragraphs={c.outcome} />}</CaseStudySection>}
      {c.lessons && <CaseStudySection index={10} label="POST-MISSION" title="What I learned"><Prose paragraphs={c.lessons} /></CaseStudySection>}
      <CaseStudySection index={11} label="MANIFEST" title="Tech stack"><div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div></CaseStudySection>
    </div>
  </main>;
}
