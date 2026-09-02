import type { System } from "@/types/content";

export const systems: System[] = [
  { id: "autonomous-systems", skill: "ROS 2 / Autoware", category: "AUTONOMOUS SYSTEMS", relatedMissionIds: ["mission-001"], description: "Configured ROS 2 and Autoware sensor kits, transforms, maps, and recorded-data validation for an existing research UGV." },
  { id: "sensor-integration", skill: "Sensor Integration", category: "LIDAR / GNSS-INS / IMU / MACHINE VISION", relatedMissionIds: ["mission-001"], description: "Integrated and validated GNSS, IMU, LiDAR, and camera hardware; configured GNSS-referenced camera synchronization." },
  { id: "embedded-systems", skill: "STM32 Interfaces", category: "EMBEDDED SYSTEMS", relatedMissionIds: ["mission-001", "mission-002"], description: "Used STM32 timer/GPIO for camera triggering and developed STM32 firmware for CubeSat magnetometer hardware using I2C and UART." },
  { id: "pcb-design", skill: "PCB + Electrical Design", category: "KICAD / ALTIUM", relatedMissionIds: ["mission-002", "mission-003"], description: "Designed routed PCB revisions, schematics, and four-layer layouts for CubeSat payload and power-monitoring hardware." },
  { id: "spacecraft-systems", skill: "Spacecraft Electrical Systems", category: "CUBESAT PAYLOADS / POWER", relatedMissionIds: ["mission-002", "mission-003"], description: "Worked on CubeSat payload electronics and a power-monitoring board with regulation, protection, sensing, and telemetry functions." }
];
