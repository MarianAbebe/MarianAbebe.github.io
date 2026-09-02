# Portfolio evidence audit

Source reviewed: `/Users/marianabebe/Documents/portfolio-assets`. Originals were not modified or deleted. `.DS_Store` files were excluded as non-content.

## Autonomous UGV

| Source asset | Metadata | Decision | What it demonstrates |
| --- | --- | --- | --- |
| `ugv/breakdown.png` | PNG, 1536×1024, 1.74 MB | Copied unchanged as `autoware-configuration-layer.png` | Autoware launch arguments, platform configuration packages, launch architecture, ROS topic flow, debugging paths, and the configuration boundary between generic Autoware and the UGV. It is not a physical sensor-breakdown image. |
| `ugv/CAD_model.png` | PNG, 2214×1477, 1.28 MB | Copied unchanged as `manufacturer-platform-cad.png` | Physical four-wheel UGV and mounted sensor/compute context. Manufacturer-provided CAD; not Marian’s mechanical design. |
| `ugv/engineering_loading_dock_fullstack_launch_video.webm` | WebM/VP8, 2560×1600, 393.69 s, ~47.14 Mb/s, 2,319,676,084 bytes; no audio track reported | Original excluded. Clear opening frame converted to an 181 KB JPEG poster. | Recorded Engineering Loading Dock dataset displayed in RViz during configured Autoware execution. Evidence of dataset replay, not physical autonomous driving. |

### Video delivery recommendation

The machine had no `ffmpeg`/`ffprobe`, and macOS `avconvert` rejected the WebM input. Do not commit the 2.32 GB source. Transcode from the untouched original with VP9 WebM or H.264 MP4 at the native 16:10 aspect ratio; preserve sufficient resolution and bitrate for RViz labels. Inspect the complete recording before trimming. If the readable derivative remains too large for GitHub Pages, host it through a streaming service or object storage/CDN and provide the final playback URL.

## CalgaryToSpace magnetometer

| Asset | Metadata | Likely case study | Evidence value / next handling |
| --- | --- | --- | --- |
| `magnetometer_schematic.png` | PNG, 3024×1964, 1.14 MB | CubeSat magnetometer module | KiCad schematic showing MCU, LDO, connectors, and magnetometer-sensor blocks. Strong architecture/design evidence; use in a zoomable diagram viewer. |
| `pcb.png` | PNG, 3024×1964, 2.17 MB | CubeSat magnetometer module | KiCad 3D PCB render. Strong layout/form-factor evidence; optimize a web derivative before use. |
| `magnetometer_pcb_v1.HEIC` | HEIC, 4032×3024, 1.84 MB | CubeSat magnetometer module | Photograph of a PCB 3D render on screen. Convert to JPEG/WebP before delivery; likely secondary to the cleaner PNG render. |

## Power-monitoring board

| Asset | Metadata | Likely case study | Evidence value / next handling |
| --- | --- | --- | --- |
| `schematic.png` | PNG, 3024×1964, 699 KB | Spacecraft/payload power-monitoring board | KiCad schematic with input protection, power rails, current sensing, voltage monitoring, temperature sensing, and status LEDs. Strong zoomable technical artifact. |
| `pcb.png` | PNG, 3024×1964, 1.88 MB | Spacecraft/payload power-monitoring board | KiCad 3D board render. Strong physical-layout evidence; optimize before use. |

## FIRST Robotics

| Asset | Metadata | Likely case study | Evidence value / next handling |
| --- | --- | --- | --- |
| `2023_robot.jpeg` | JPEG, 1169×1732, 1.08 MB | FIRST Robotics 2023 | Competition robot photograph; demonstrates physical system and event context. |
| `2024_robot.jpg` | JPEG, 1290×1940, 440 KB | FIRST Robotics 2024 | Robot photograph showing the later mechanism/platform. |
| `2024_robot.mov` | QuickTime MOV, 56.7 MB | FIRST Robotics 2024 | Motion/demo evidence. Probe, review, and transcode before web use. |
| `autonomous_award.jpg` | JPEG, 1440×1800, 397 KB | FIRST Robotics / Signals | Readable 2023 Autonomous Award trophy evidence. Confirm team attribution and Marian’s relationship before publishing. |
| `excellence_in_engineering.jpg` | JPEG, 3024×4032, 2.43 MB | FIRST Robotics / Signals | Readable 2024 Excellence in Engineering Award trophy evidence. Confirm team attribution and Marian’s relationship before publishing. |

## Recognition and personal

| Asset | Metadata | Likely destination | Evidence value / next handling |
| --- | --- | --- | --- |
| `recognition/IMG_5897.HEIC` | HEIC, 4032×3024, 1.53 MB | Signals / scholarship recognition | Event photograph showing Marian holding a scholarship certificate. Convert to JPEG/WebP and confirm scholarship name, year, granting organization, and permission/context for the other identifiable person. |
| `personal/headshot.jpg` | JPEG, 436×394, 24.5 KB | About/profile | Small headshot suitable for a compact profile treatment; source resolution is limited, so avoid large hero use. |

## Recommended next case study

The CalgaryToSpace magnetometer has the strongest ready-made technical narrative set: a legible schematic, PCB render, and supporting image. It is the best next candidate once Marian supplies verified objective, contribution, constraints, design decisions, validation, and outcome details.
