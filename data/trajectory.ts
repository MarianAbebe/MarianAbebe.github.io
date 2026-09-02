import type { TrajectoryPoint } from "@/types/content";

export const trajectory: TrajectoryPoint[] = [
  { id: "electrical-engineering", marker: "ORIGIN", title: "Electrical Engineering", date: "SEP 2024", description: "Began Electrical Engineering at the University of Calgary, building the hardware and systems foundation for later project work." },
  { id: "calgary-to-space", marker: "WAYPOINT", title: "CubeSat Electrical Systems", date: "NOV 2024 — PRESENT", description: "At CalgaryToSpace, works across CubeSat payload electronics and electrical subsystem coordination as an Electrical Team Co-Lead." },
  { id: "autonomous-research", marker: "WAYPOINT", title: "Autonomous Robotics Research", date: "MAY — AUG 2026", description: "Configured and validated sensor, synchronization, and Autoware integration work at the Intelligent Navigation and Mapping Lab." },
  { id: "current-direction", marker: "CURRENT POSITION", title: "Autonomy + Space Systems", date: "CURRENT", description: "Building deeper experience in autonomous systems, embedded hardware, sensing, and spacecraft engineering toward future autonomous space-systems work." }
];
