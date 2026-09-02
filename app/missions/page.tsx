import { MissionCard } from "@/components/cards";
import { Footer, Navigation } from "@/components/navigation";
import { SectionHeader } from "@/components/ui";
import { missions } from "@/data/missions";

export const metadata = { title: "Missions" };
export default function MissionsPage() { return <><Navigation /><main className="interior-page"><SectionHeader eyebrow="MISSION ARCHIVE" title="Engineering missions" description="A structured archive for projects, research, and engineering experiences." /><div className="mission-grid">{missions.map((m) => <MissionCard mission={m} key={m.id} />)}</div></main><Footer /></>; }
