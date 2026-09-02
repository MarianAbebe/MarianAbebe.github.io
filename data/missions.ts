import type { Mission } from "@/types/content";

export const missions: Mission[] = [
  {
    id: "mission-001",
    missionNumber: "001",
    title: "Autonomous UGV Research",
    subtitle: "Autoware / ROS 2 Autonomous Driving Platform",
    domain: "Autonomous Systems Research",
    status: "ACTIVE",
    date: "[NEEDED: Project start and end month/year]",
    role: "ROS 2 / Autoware integration, configuration, and validation",
    summary: "Integration and validation work for an autonomous UGV using ROS 2 and Autoware, spanning live sensor interfaces and recorded-dataset subsystem testing.",
    technologies: ["ROS 2", "Autoware", "Sensor Integration", "Autonomous Systems"],
    slug: "autonomous-ugv-research",
    featured: true,
    caseStudy: {
      archiveId: "UGV-AW-001",
      overview: [
        "This research focused on configuring and integrating ROS 2 and Autoware for an existing autonomous unmanned ground vehicle platform.",
        "The work included live sensor integration and validation as well as recorded-data testing. Dataset replay was used to exercise the configured Autoware stack without representing that replay as autonomous driving on the physical vehicle.",
        "[NEEDED: The institution or lab name, the research objective in one or two sentences, and whether the work was individual, supervised, or part of a named team.]"
      ],
      role: [
        "My engineering work covered ROS 2 and Autoware integration; sensor-kit configuration; LiDAR, GNSS, IMU, and camera integration and validation; TF and topic validation; point-cloud preprocessing and debugging; localization bring-up and debugging; GNSS-assisted initialization; time-synchronization and triggering work; dataset replay; and subsystem validation across localization, perception, planning, and control.",
        "The physical UGV, manufacturer CAD, existing sensor hardware, Autoware framework, and recorded datasets were provided or pre-existing. This work does not claim authorship of the mechanical platform, sensor mounting, Autoware algorithms, or the recorded dataset."
      ],
      platform: [
        "The research platform is an existing four-wheel UGV with an integrated sensor and compute assembly. The visual below is manufacturer-provided CAD and is included to show the physical platform context—not as evidence of mechanical design work.",
        "[NEEDED: UGV model, onboard computer model, vehicle-interface details, network architecture, and confirmation of which visible mounted devices may be identified publicly.]"
      ],
      architecture: {
        id: "autoware-configuration-layer",
        kind: "diagram",
        src: "/portfolio/autonomous-ugv/diagrams/autoware-configuration-layer.png",
        alt: "Diagram mapping Autoware launch arguments through sensor, vehicle, map, parameter, and transform configuration into sensing, localization, perception, planning, control, vehicle, and system components.",
        technicalLabel: "SYSTEM ARCHITECTURE // CONFIGURATION LAYER",
        caption: "Configuration-layer map showing how launch arguments select platform-specific sensor, vehicle, map, parameter, and TF files, and how those files connect the generic Autoware launch architecture to the UGV setup. The artifact also records topic-flow and configuration-oriented debugging paths.",
        available: true
      },
      sensorStack: [
        { label: "PERCEPTION", items: ["LiDAR — model needed", "Camera system — model and count needed"] },
        { label: "LOCALIZATION", items: ["GNSS — model needed", "IMU — model needed"] },
        { label: "COMPUTE + INTERFACE", items: ["Onboard computer — model needed", "Vehicle interface — implementation details needed"] }
      ],
      softwareStack: [
        { label: "FRAMEWORK", items: ["ROS 2", "Autoware"] },
        { label: "PLATFORM CONFIGURATION", items: ["Sensor-kit configuration", "Launch arguments", "Parameters and topic mappings", "TF validation"] },
        { label: "VALIDATION", items: ["Topic and frame inspection", "Dataset replay", "RViz visualization", "[NEEDED: Other named diagnostic tools]"] }
      ],
      configuration: [
        "Autoware supplied the generic autonomous-driving framework. The integration work connected that framework to the UGV through platform-specific sensor-kit, vehicle, map, parameter, topic, and transform configuration rather than modifying or claiming authorship of Autoware’s core algorithms.",
        "The architecture artifact documents this configuration boundary and the diagnostic path from subsystem outputs back through topics, parameters, drivers, and hardware."
      ],
      bringUp: [
        "Bring-up progressed from validating sensor topics, transforms, timing, and point-cloud preprocessing into localization initialization and subsystem checks across perception, planning, and control.",
        "The Engineering Loading Dock evidence is recorded-data validation: the configured Autoware stack was run against the Engineering Loading Dock dataset and inspected in RViz. It is separate from live hardware and sensor integration and is not presented as fully autonomous real-world driving.",
        "[NEEDED: The exact launch sequence, package names, which subsystem outputs were confirmed, and which stages remained incomplete or degraded.]"
      ],
      challenges: [
        { id: "challenge-001", title: "Time synchronization and triggering", symptom: "[NEEDED: The exact timing or triggering symptom and which sensor streams were affected.]", investigation: "[NEEDED: Commands, logs, timestamps, or plots used to compare clocks and message timing.]", rootCause: "[NEEDED: Verified clock, driver, trigger, network, or configuration cause.]", resolution: "[NEEDED: The implemented fix or workaround and how it was validated.]", takeaway: "[NEEDED: Marian’s lesson from resolving the timing issue.]", status: "TODO" },
        { id: "challenge-002", title: "Point-cloud preprocessing", symptom: "[NEEDED: What was visibly or numerically wrong with the point cloud or downstream processing.]", investigation: "[NEEDED: Topics, frames, filters, parameters, and visualization steps inspected.]", rootCause: "[NEEDED: Verified preprocessing or configuration cause.]", resolution: "[NEEDED: The exact parameter, mapping, transform, or pipeline change.]", takeaway: "[NEEDED: Marian’s lesson from debugging the point-cloud path.]", status: "TODO" },
        { id: "challenge-003", title: "Localization initialization", symptom: "[NEEDED: The localization failure or initialization behavior observed.]", investigation: "[NEEDED: GNSS, pose, map, TF, and localization evidence examined.]", rootCause: "[NEEDED: Verified cause, if known; otherwise state that it remained unresolved.]", resolution: "[NEEDED: GNSS-assisted initialization work performed and resulting behavior.]", takeaway: "[NEEDED: Marian’s lesson from localization bring-up.]", status: "TODO" }
      ],
      demonstration: {
        id: "loading-dock-demonstration",
        kind: "video",
        src: "/portfolio/autonomous-ugv/video/engineering-loading-dock-full-stack.mp4",
        poster: "/portfolio/autonomous-ugv/screenshots/engineering-loading-dock-rviz.jpg",
        posterAvailable: true,
        alt: "RViz view of the Engineering Loading Dock recorded dataset with point-cloud surroundings, mapped lane geometry, detected-object boxes, and Autoware subsystem controls.",
        technicalLabel: "SYSTEM DEMONSTRATION // FULL-STACK AUTOWARE RUN",
        caption: "Recorded-data evidence from the Engineering Loading Dock dataset displayed in RViz. The source recording shows the configured Autoware environment during dataset replay; it does not demonstrate autonomous driving on the physical UGV.",
        deliveryNote: "VIDEO HOSTING PENDING // The 2.32 GB source must be transcoded with ffmpeg or hosted as a streaming asset before playback can be enabled.",
        available: false
      },
      outcome: [
        "The configured Autoware environment was run against the recorded Engineering Loading Dock dataset for subsystem validation across localization, perception, planning, and control. The supplied RViz recording is evidence of dataset/replay execution, not proof of end-to-end autonomous operation on the physical UGV.",
        "[NEEDED: A precise list of outputs that were successful, remaining limitations, any unresolved faults, and the acceptance criteria used during validation.]"
      ],
      lessons: ["[NEEDED: Marian’s first-person reflection on the most important lesson from configuration-driven integration, timing, localization, or cross-subsystem debugging.]"],
      gallery: [
        { id: "ugv-platform", kind: "image", src: "/portfolio/autonomous-ugv/screenshots/manufacturer-platform-cad.png", alt: "Manufacturer-provided CAD render of a four-wheel UGV with a raised sensor assembly, two circular antenna-like devices, cameras, a cylindrical sensor, and onboard electronics.", caption: "Physical UGV configuration reference. Platform CAD provided by the UGV manufacturer; Marian did not design the chassis, mechanical structure, CAD, or sensor mounts.", technicalLabel: "PLATFORM // MANUFACTURER CAD", available: true }
      ]
    }
  },
  { id: "mission-002", missionNumber: "002", title: "[Mission Title]", subtitle: "[Mission Subtitle]", domain: "[Engineering Domain]", status: "PLANNED", date: "[Date]", role: "[Role]", summary: "[Mission Summary]", technologies: ["[Technology]"], slug: "mission-placeholder-two", featured: false },
  { id: "mission-003", missionNumber: "003", title: "[Mission Title]", subtitle: "[Mission Subtitle]", domain: "[Engineering Domain]", status: "PLANNED", date: "[Date]", role: "[Role]", summary: "[Mission Summary]", technologies: ["[Technology]"], slug: "mission-placeholder-three", featured: false }
];
