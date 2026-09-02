export type MarsPosition = [number, number, number];

export interface MarsDestination {
  id: string;
  site: string;
  label: string;
  description: string;
  position: MarsPosition;
  target: string;
  structure: "archive" | "lab" | "array" | "outpost" | "waypoint" | "field-log";
}

export interface RoverTelemetry {
  position: MarsPosition;
  heading: number;
  speed: number;
  nearestId: string;
  distance: number;
}
