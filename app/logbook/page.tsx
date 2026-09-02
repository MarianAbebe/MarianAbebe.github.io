import { LogbookCard } from "@/components/cards";
import { Footer, Navigation } from "@/components/navigation";
import { SectionHeader } from "@/components/ui";
import { logbookEntries } from "@/data/logbook";
export const metadata = { title: "Logbook" };
export default function LogbookPage() { return <><Navigation /><main className="interior-page editorial"><SectionHeader eyebrow="FIELD NOTES // INDEX" title="Mission logbook" description="Essays, engineering reflections, and ideas with a visible revision history." /><div className="logbook-list">{logbookEntries.map((e, i) => <LogbookCard key={e.slug} entry={e} index={i} />)}</div></main><Footer /></>; }
