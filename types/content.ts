export type MissionStatus = "PLANNED" | "ACTIVE" | "ARCHIVED";

export type MissionMediaKind = "image" | "diagram" | "video";

export interface MissionMedia {
  id: string;
  kind: MissionMediaKind;
  src: string;
  alt: string;
  caption: string;
  technicalLabel?: string;
  poster?: string;
  posterAvailable?: boolean;
  deliveryNote?: string;
  available: boolean;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface TechnicalChallenge {
  id: string;
  title: string;
  symptom: string;
  investigation: string;
  rootCause: string;
  resolution: string;
  takeaway: string;
  status: "TODO" | "DOCUMENTED";
}

export interface CaseStudySection {
  id: string;
  label: string;
  title: string;
  body: string[];
  media?: MissionMedia[];
}

export interface MissionCaseStudy {
  archiveId: string;
  overview: string[];
  role: string[];
  platform?: string[];
  architecture?: MissionMedia;
  sensorStack?: StackGroup[];
  softwareStack?: StackGroup[];
  configuration?: string[];
  bringUp?: string[];
  challenges?: TechnicalChallenge[];
  demonstration?: MissionMedia;
  outcome?: string[];
  lessons?: string[];
  gallery?: MissionMedia[];
  sections?: CaseStudySection[];
  links?: { label: string; href: string }[];
}

export interface Mission {
  id: string; missionNumber: string; title: string; subtitle: string; domain: string;
  status: MissionStatus; date: string; role: string; summary: string;
  technologies: string[]; heroImage?: string; slug: string; featured: boolean;
  caseStudy?: MissionCaseStudy;
}

export interface Signal {
  id: string; source: string; type: string; title: string; date: string;
  description: string; verificationUrl?: string; featured: boolean;
}

export interface TrajectoryPoint {
  id: string; marker: "ORIGIN" | "WAYPOINT" | "CURRENT POSITION" | "TRAJECTORY CONTINUES";
  title: string; date: string; description: string;
}

export interface System {
  id: string; skill: string; category: string; relatedMissionIds: string[]; description: string;
}

export interface LogbookEntry {
  title: string; slug: string; date: string; summary: string; topics: string[];
  version: string; status: "DRAFT" | "PUBLISHED"; relatedMissionIds: string[];
  revisions: { version: string; date: string; note: string }[];
  body: string[];
}

export interface ExternalLink { label: string; href: string; callsign: string; }
