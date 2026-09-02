import type { TrajectoryPoint } from "@/types/content";
export const trajectory: TrajectoryPoint[] = [
  { id: "origin", marker: "ORIGIN", title: "[Starting Point]", date: "[Date]", description: "[The beginning of this engineering trajectory.]" },
  { id: "waypoint-1", marker: "WAYPOINT", title: "[Experience or Milestone]", date: "[Date]", description: "[How this waypoint shaped the trajectory.]" },
  { id: "current", marker: "CURRENT POSITION", title: "[Current Focus]", date: "PRESENT", description: "[Current engineering focus and questions.]" },
  { id: "future", marker: "TRAJECTORY CONTINUES", title: "Destination Unbounded", date: "NEXT", description: "The mission remains in progress." }
];
