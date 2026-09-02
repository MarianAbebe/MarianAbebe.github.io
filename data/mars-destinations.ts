import type { MarsDestination } from "@/types/mars";

export const marsDestinations: MarsDestination[] = [
  { id: "research-outpost", site: "SITE // 01", label: "RESEARCH OUTPOST", description: "ABOUT THE OPERATOR", position: [19, 0, -10], target: "about", structure: "outpost" },
  { id: "mission-archive", site: "SITE // 02", label: "MISSION ARCHIVE", description: "ENGINEERING CASE STUDIES", position: [8, 0, -16], target: "missions", structure: "archive" },
  { id: "systems-lab", site: "SITE // 03", label: "SYSTEMS LAB", description: "CAPABILITIES IN CONTEXT", position: [-5, 0, -20], target: "systems", structure: "lab" },
  { id: "signal-array", site: "SITE // 04", label: "SIGNAL ARRAY", description: "RECOGNITION & PUBLICATIONS", position: [17, 0, -23], target: "signals", structure: "array" },
  { id: "field-log", site: "SITE // 05", label: "FIELD LOG", description: "MISSION LOGBOOK", position: [-17, 0, -11], target: "logbook", structure: "field-log" },
  { id: "trajectory-waypoint", site: "SITE // 06", label: "TRAJECTORY WAYPOINT", description: "ENGINEERING JOURNEY", position: [-18, 0, -25], target: "journey", structure: "waypoint" },
];
