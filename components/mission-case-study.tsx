/* eslint-disable @next/next/no-img-element */
import type { Mission, StackGroup, TechnicalChallenge } from "@/types/content";
import { EngineeringDiagram, ImageGallery, VideoEvidence } from "./mission-media";
import { StatusIndicator, SystemTag, TelemetryLabel } from "./ui";

export function MissionHero({ mission }: { mission: Mission }) {
  const study = mission.caseStudy!;
  const heroMedia = study.heroMedia;
  return <header className={`mission-hero mission-hero-${mission.id}`}>
    <div className={`mission-hero-grid ${heroMedia ? "mission-hero-grid-media" : ""}`}>
      <div><TelemetryLabel>{study.heroLabel ?? `PROJECT FILE // ${study.archiveId}`}</TelemetryLabel><p className="domain">{mission.domain}</p><h1>{mission.title}</h1><p className="mission-subtitle">{mission.subtitle}</p></div>
      <div className="mission-hero-aside">{heroMedia && <figure className="mission-hero-media"><span className="telemetry-label">{heroMedia.technicalLabel}</span><img src={heroMedia.src} alt={heroMedia.alt} /><figcaption>{heroMedia.caption}</figcaption></figure>}<div className="mission-hero-status"><StatusIndicator label={mission.status} /><span>FILE CLASS // ENGINEERING CASE STUDY</span><span>PROJECT {"//"} {mission.missionNumber}</span></div></div>
    </div>
    <div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div>
  </header>;
}

export function MissionMetadata({ mission }: { mission: Mission }) {
  return <dl className="mission-metadata"><div><dt>ROLE</dt><dd>{mission.role}</dd></div><div><dt>PERIOD</dt><dd>{mission.date}</dd></div><div><dt>DOMAIN</dt><dd>{mission.domain}</dd></div><div><dt>PROJECT STATUS</dt><dd>{mission.status}</dd></div></dl>;
}

export function CaseStudySection({ index, label, title, children, wide = false, className = "" }: { index: number; label: string; title: string; children: React.ReactNode; wide?: boolean; className?: string }) {
  return <section className={`archive-section ${wide ? "archive-section-wide" : ""} ${className}`}><header><TelemetryLabel>{String(index).padStart(2, "0")} {"//"} {label}</TelemetryLabel><h2>{title}</h2></header><div className="archive-section-content">{children}</div></section>;
}

export function Prose({ paragraphs }: { paragraphs: string[] }) { return <div className="case-prose">{paragraphs.map((text, index) => <p key={`${index}-${text}`}>{text}</p>)}</div>; }

export function SystemStack({ groups }: { groups: StackGroup[] }) {
  return <div className="system-stack">{groups.map((group) => <section key={group.label}><TelemetryLabel>{group.label}</TelemetryLabel><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>;
}

export function ChallengeCard({ challenge, index }: { challenge: TechnicalChallenge; index: number }) {
  const rows = [["SYMPTOM", challenge.symptom], ["INVESTIGATION", challenge.investigation], ["ROOT CAUSE", challenge.rootCause], ["RESOLUTION / WORKAROUND", challenge.resolution], ["ENGINEERING TAKEAWAY", challenge.takeaway]];
  return <article className="challenge-card"><header><TelemetryLabel>ANOMALY // {String(index).padStart(2, "0")}</TelemetryLabel><span className={`challenge-state ${challenge.status.toLowerCase()}`}>{challenge.status}</span><h3>{challenge.title}</h3></header><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>;
}

function CompactMissionCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  const sections = c.sections ?? [];
  const evidence = sections.find((section) => section.media?.length);
  const narrative = sections.filter((section) => !section.media?.length);
  const hasRevisionSequence = Boolean(c.revisionOneEvidence || c.revisionTwoEvidence);
  const isRevisionCase = mission.id === "mission-002";
  const introSections = isRevisionCase ? narrative.slice(0, 1) : narrative.slice(0, 2);
  const detailSections = isRevisionCase ? narrative.slice(2) : narrative.slice(2);
  const deferredRole = isRevisionCase ? narrative[1] : undefined;
  return <main className={`mission-archive compact-project compact-project-${mission.id}`}>
    <MissionHero mission={mission} /><MissionMetadata mission={mission} />
    <div className="compact-project-body">
      <div className="compact-project-intro">{introSections.map((section) => <section key={section.id}><TelemetryLabel>{section.label}</TelemetryLabel><h2>{section.title}</h2><Prose paragraphs={section.body} /></section>)}</div>
      {!hasRevisionSequence && evidence?.media?.[0] && <EngineeringDiagram media={evidence.media[0]} />}
      <div className="compact-project-detail">{detailSections.map((section) => <section key={section.id}><TelemetryLabel>{section.label}</TelemetryLabel><h2>{section.title}</h2><Prose paragraphs={section.body} /></section>)}{c.revisionOneEvidence && <div className="revision-one-evidence"><EngineeringDiagram media={c.revisionOneEvidence} />{c.designEvidence && <EngineeringDiagram media={c.designEvidence} />}</div>}{c.engineeringNote && <aside className="engineering-note"><TelemetryLabel>{c.engineeringNote.label}</TelemetryLabel><p>{c.engineeringNote.text}</p></aside>}{deferredRole && <section className="deferred-role"><TelemetryLabel>{deferredRole.label}</TelemetryLabel><h2>{deferredRole.title}</h2><Prose paragraphs={deferredRole.body} /></section>}{!isRevisionCase && c.designEvidence && <EngineeringDiagram media={c.designEvidence} />} {!isRevisionCase && <section className="compact-project-tools"><TelemetryLabel>TOOLS / SYSTEMS</TelemetryLabel><div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div></section>}</div>
      <div className="compact-project-secondary-evidence">{c.revisionTwoStory && <section className="revision-two-story"><TelemetryLabel>{c.revisionTwoStory.label}</TelemetryLabel><h2>{c.revisionTwoStory.title}</h2><Prose paragraphs={c.revisionTwoStory.body} /></section>}{c.revisionTwoEvidence && <EngineeringDiagram media={c.revisionTwoEvidence} />}{!hasRevisionSequence && evidence?.media?.slice(1).map((media) => <EngineeringDiagram key={media.id} media={media} />)}</div>
      {c.factSheet && <section className="compact-fact-sheet"><TelemetryLabel>DESIGN CONSIDERATIONS</TelemetryLabel><dl>{c.factSheet.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>}
      {isRevisionCase && <section className="compact-project-tools"><TelemetryLabel>TOOLS / SYSTEMS</TelemetryLabel><div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div></section>}
    </div>
  </main>;
}

function UgvCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  const rvizDemonstration = { ...c.demonstration!, available: true, deliveryNote: undefined };
  return <main className="ugv-case-study">
    <header className="ugv-case-hero"><div><TelemetryLabel>MISSION // 001</TelemetryLabel><p className="domain">AUTONOMOUS SYSTEMS / RESEARCH</p><h1>Autonomous UGV Research</h1><p className="ugv-dek">ROS 2 and Autoware integration for a research UGV, from sensor bring-up and hardware synchronization to localization and full-stack recorded-data validation.</p><dl><div><dt>ROLE</dt><dd>Undergraduate Researcher</dd></div><div><dt>PERIOD</dt><dd>May — Aug 2026</dd></div><div><dt>ENVIRONMENT</dt><dd>ROS 2 Humble / Autoware / Ubuntu</dd></div><div><dt>PLATFORM</dt><dd>Existing research UGV</dd></div></dl></div><EngineeringDiagram media={c.architecture!} /></header>
    <div className="ugv-story">
      <section id="system-context" className="ugv-context"><div><TelemetryLabel>01 // SYSTEM CONTEXT</TelemetryLabel><h2>Making an existing platform actually work as a system</h2><Prose paragraphs={[...c.overview, ...c.role]} /></div><div className="ugv-context-evidence"><ImageGallery media={c.gallery ?? []} />{c.contextEvidence && <VideoEvidence media={c.contextEvidence} />}</div></section>
      <section id="sensor-integration" className="ugv-sensor"><TelemetryLabel>02 // SENSOR VALIDATION + INTEGRATION</TelemetryLabel><div className="ugv-sensor-heading"><h2>Before Autoware, make sure the sensors make sense</h2><Prose paragraphs={["Before debugging localization or perception, I needed to know that the data entering those systems was actually trustworthy.", "I configured ROS 2 and Autoware sensor-kit files around the UGV's existing u-blox GNSS, Xsens IMU, NovAtel GNSS/INS, Hesai LiDAR, and LUCID and FLIR cameras. For each path, I checked more than whether a topic existed: message types, frame IDs, TF relationships, timestamps, update behavior, and whether the output reached the point in the stack that expected it.", "The camera path became its own integration problem. I extended an existing ROS 2 camera framework to support the LUCID cameras through ArenaSDK, worked through configuration and packet-loss issues, and eventually had three LUCID cameras and two FLIR cameras streaming simultaneously.", "That process reinforced a rule that ended up guiding the rest of the project: a node publishing without errors does not mean the system is correct. Validate the interface before trusting the subsystem downstream of it."]} /></div><div className="ugv-sensor-evidence"><SystemStack groups={c.sensorStack ?? []} />{c.sensorEvidence && <EngineeringDiagram media={c.sensorEvidence} />}</div></section>
      <section id="time-synchronization" className="ugv-sync"><div className="ugv-sync-intro"><TelemetryLabel>03 // TIME SYNCHRONIZATION</TelemetryLabel><h2>GNSS-referenced camera triggering</h2><Prose paragraphs={["I configured and validated GNSS-referenced hardware synchronization using a u-blox receiver, STM32 timer and GPIO outputs, and physical trigger wiring. Timing pulses were inspected with a logic analyzer for triggered acquisition across three LUCID cameras and, separately, two FLIR cameras."]} /><div className="ugv-problem-row"><span>PROBLEM<br /><b>Timing and camera configuration needed validation across the sensor path.</b></span><span>DECISION<br /><b>Use GNSS-referenced triggering and inspect timing pulses before full-stack validation.</b></span><span>RESULT<br /><b>Triggered acquisition was validated for the supported LUCID and FLIR camera groups.</b></span></div></div><div className="ugv-sync-evidence">{c.timingEvidence && <EngineeringDiagram media={c.timingEvidence} className="feature-media" />}</div></section>
      <section id="autoware-integration" className="ugv-autoware"><div><TelemetryLabel>04 // AUTOWARE INTEGRATION</TelemetryLabel><h2>Validate each subsystem before the full stack</h2><Prose paragraphs={c.configuration ?? []} /><Prose paragraphs={c.bringUp ?? []} /></div><div className="ugv-autoware-evidence"><SystemStack groups={c.softwareStack ?? []} />{c.autowareEvidence && <EngineeringDiagram media={c.autowareEvidence} />}</div></section>
      <section id="debugging-decisions" className="ugv-debug"><TelemetryLabel>05 // DEBUGGING + ENGINEERING DECISIONS</TelemetryLabel><h2>Configuration faults were treated as system interfaces</h2><div className="ugv-problem-row"><span>PROBLEM<br /><b>TF, timestamps, GNSS initialization, localization, and map configuration prevented reliable full-stack validation.</b></span><span>INVESTIGATION<br /><b>I inspected topics, frames, maps, map-projector metadata, and recorded-data outputs one subsystem at a time.</b></span><span>RESULT<br /><b>The configured environment ran against Engineering Loading Dock recorded data after prior TF and configuration failures were addressed.</b></span></div></section>
      <section id="system-evidence" className="ugv-evidence"><TelemetryLabel>06 // SYSTEM EVIDENCE</TelemetryLabel><h2>Recorded-data validation in RViz</h2><VideoEvidence media={rvizDemonstration} /><div className="ugv-evidence-summary"><Prose paragraphs={c.outcome ?? []} /><dl><div><dt>DATA SOURCE</dt><dd>Engineering Loading Dock</dd></div><div><dt>EXECUTION</dt><dd>Recorded-data replay</dd></div><div><dt>STACK</dt><dd>Configured Autoware environment</dd></div><div><dt>VALIDATED</dt><dd>Localization / perception / planning / control</dd></div><div><dt>CLAIM BOUNDARY</dt><dd>Not physical autonomous driving</dd></div></dl></div></section>
    </div>
  </main>;
}

function MagnetometerCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  const section = (id: string) => {
    const item = c.sections?.find((candidate) => candidate.id === id);
    if (!item) throw new Error(`Missing magnetometer section: ${id}`);
    return item;
  };
  const context = section("context"); const role = section("role"); const work = section("work");
  const revisedBoard = c.revisionOneEvidence && { ...c.revisionOneEvidence, technicalLabel: "REVISION 02 // PCB DESIGN VIEW", caption: "Revision 2 magnetometer PCB design view in KiCad." };
  const heroMission = { ...mission, caseStudy: { ...c, heroMedia: undefined } };
  return <main className="mission-archive compact-project compact-project-mission-002"><MissionHero mission={heroMission} /><MissionMetadata mission={mission} />
    <div className="compact-project-body magnetometer-project-body">
      <section className="magnetometer-context"><div><TelemetryLabel>{context.label}</TelemetryLabel><h2>{context.title}</h2><Prose paragraphs={context.body} /></div>{c.heroMedia && <EngineeringDiagram media={c.heroMedia} className="supporting-evidence" />}</section>
      <section className="magnetometer-role-learning"><div><TelemetryLabel>{role.label}</TelemetryLabel><h2>{role.title}</h2><Prose paragraphs={role.body} /></div>{c.engineeringNote && <aside className="engineering-note"><TelemetryLabel>{c.engineeringNote.label}</TelemetryLabel><p>{c.engineeringNote.text}</p></aside>}</section>
      <section className="magnetometer-revision-evidence"><div className="magnetometer-revision-intro"><TelemetryLabel>{work.label}</TelemetryLabel><h2>{work.title}</h2><Prose paragraphs={work.body} /></div><div className="magnetometer-board-gallery">{c.designEvidence && <EngineeringDiagram media={c.designEvidence} className="gallery-card" />}{revisedBoard && <EngineeringDiagram media={revisedBoard} className="gallery-card" />}</div>{c.revisionTwoEvidence && <EngineeringDiagram media={c.revisionTwoEvidence} className="document-media" />}{c.revisionTwoStory && <div className="magnetometer-revision-two"><TelemetryLabel>{c.revisionTwoStory.label}</TelemetryLabel><h2>{c.revisionTwoStory.title}</h2><Prose paragraphs={c.revisionTwoStory.body} /></div>}</section>
      <section className="compact-project-tools"><TelemetryLabel>TOOLS / SYSTEMS</TelemetryLabel><div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div></section>
    </div>
  </main>;
}

function PowerCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  const section = (id: string) => {
    const item = c.sections?.find((candidate) => candidate.id === id);
    if (!item) throw new Error(`Missing power-monitoring section: ${id}`);
    return item;
  };
  const context = section("context"); const role = section("role"); const system = section("system"); const evidence = section("evidence");
  return <main className="mission-archive compact-project compact-project-mission-003"><MissionHero mission={mission} /><MissionMetadata mission={mission} />
    <div className="power-project-body">
      <section className="power-overview"><div><TelemetryLabel>{context.label}</TelemetryLabel><h2>{context.title}</h2><Prose paragraphs={context.body} /></div>{evidence.media?.[0] && <EngineeringDiagram media={evidence.media[0]} className="feature-media" />}</section>
      <section className="power-role"><TelemetryLabel>{role.label}</TelemetryLabel><h2>{role.title}</h2><Prose paragraphs={role.body} /></section>
      <section className="power-system"><div><TelemetryLabel>{system.label}</TelemetryLabel><h2>{system.title}</h2><Prose paragraphs={system.body} /></div>{evidence.media?.[1] && <EngineeringDiagram media={evidence.media[1]} className="document-media" />}</section>
      {c.factSheet && <section className="compact-fact-sheet"><TelemetryLabel>DESIGN CONSIDERATIONS</TelemetryLabel><dl>{c.factSheet.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>}
      <section className="compact-project-tools"><TelemetryLabel>TOOLS / SYSTEMS</TelemetryLabel><div className="tag-row">{mission.technologies.map((item) => <SystemTag key={item}>{item}</SystemTag>)}</div></section>
    </div>
  </main>;
}

function FirstCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  const sections = c.sections ?? [];
  const section = (id: string) => sections.find((item) => item.id === id)!;
  const renderText = (id: string) => { const item = section(id); return <CaseStudySection index={Number(id)} label={item.label} title={item.title}><Prose paragraphs={item.body} /></CaseStudySection>; };
  const learning = section("01"); const pit = section("04"); const evidence = section("06"); const award = section("07");
  const heroMission = { ...mission, caseStudy: { ...c, heroMedia: { id: "manning-robotics-team-photo", kind: "image" as const, src: "/portfolio/first/photos/manning-robotics-team-photo.jpg", alt: "Manning Robotics Team 4627 members gathered outdoors in team apparel.", caption: "Manning Robotics / FIRST Robotics Competition Team 4627.", technicalLabel: "TEAM // MANNING ROBOTICS", available: true } } };
  return <main className="mission-archive first-case-study"><MissionHero mission={heroMission} /><dl className="mission-metadata">{c.heroMetadata?.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><div className="archive-body">
    <CaseStudySection index={1} label={learning.label} title={learning.title} className="first-learning-section"><Prose paragraphs={learning.body} />{learning.media?.[0] ? <EngineeringDiagram media={learning.media[0]} className="supporting-evidence" /> : null}</CaseStudySection>{renderText("02")}{renderText("03")}
    <CaseStudySection index={4} label={pit.label} title={pit.title} className="first-pit-section"><Prose paragraphs={pit.body.slice(0, 2)} />{pit.media?.[0] && <EngineeringDiagram media={pit.media[0]} className="feature-media" />}<Prose paragraphs={pit.body.slice(2)} /></CaseStudySection>
    {renderText("05")}
    <CaseStudySection index={6} label={evidence.label} title={evidence.title} wide className="first-evidence-section"><Prose paragraphs={evidence.body} /><div className="first-evidence-intro"><Prose paragraphs={["I wanted to show these two robots together because they mark how quickly my role changed. In 2023, I worked on the intake, chassis construction, and bumpers, and competed as the human player. By 2024, I was working across the intake, arm, shooter, climber, chassis, swerve modules, CAN bus, power, and other electrical systems before later supporting the robot in the competition pit."]} /></div><div className="first-evidence-grid">{evidence.media?.slice(0, 2).map((media) => <EngineeringDiagram key={media.id} media={media} className="gallery-card" />)}</div>{evidence.media?.[2] && <div className="first-video-evidence"><Prose paragraphs={["A robot makes a lot more sense once you see it move. This is the 2024 robot operating—the same system described throughout this file—and it adds the motion and interaction that static photographs cannot show."]} /><VideoEvidence media={evidence.media[2]} className="video-evidence-compact" /></div>}</CaseStudySection>
    <CaseStudySection index={7} label={award.label} title={award.title} className="first-award-section"><div className="first-award-content"><div><Prose paragraphs={award.body} /><dl className="first-award-meta"><div><dt>AWARD</dt><dd>Excellence in Engineering Award</dd></div><div><dt>EVENT</dt><dd>2024 Canadian Pacific Regional</dd></div><div><dt>RECIPIENT</dt><dd>Manning Robotics // Team 4627</dd></div><div><dt>MY ROLE</dt><dd>Mechanical Lead</dd></div></dl></div><EngineeringDiagram className="award-evidence" media={{ id: "first-excellence-in-engineering-award", kind: "image", src: "/portfolio/first/photos/first-award.png", alt: "2024 Excellence in Engineering Award trophy at the Canadian Pacific Regional.", caption: "Excellence in Engineering Award received by Manning Robotics / Team 4627 at the 2024 Canadian Pacific Regional.", technicalLabel: "TEAM RECOGNITION // 2024", available: true }} /></div></CaseStudySection>
  </div></main>;
}

export function MissionCaseStudy({ mission }: { mission: Mission }) {
  const c = mission.caseStudy!;
  if (mission.id === "mission-001") return <UgvCaseStudy mission={mission} />;
  if (mission.id === "mission-002") return <MagnetometerCaseStudy mission={mission} />;
  if (mission.id === "mission-003") return <PowerCaseStudy mission={mission} />;
  if (mission.id === "mission-004") return <FirstCaseStudy mission={mission} />;
  if (c.sections) return <CompactMissionCaseStudy mission={mission} />;
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
