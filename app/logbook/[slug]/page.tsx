import { Footer, Navigation } from "@/components/navigation";
import { SystemTag, TelemetryLabel } from "@/components/ui";
import { logbookEntries } from "@/data/logbook";
import { notFound } from "next/navigation";
export function generateStaticParams() { return logbookEntries.map(({ slug }) => ({ slug })); }
export default async function LogEntry({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = logbookEntries.find((e) => e.slug === slug); if (!entry) notFound(); return <><Navigation /><main className="article-page"><header><TelemetryLabel>LOGBOOK {"//"} V{entry.version} {"//"} {entry.status}</TelemetryLabel><h1>{entry.title}</h1><p className="article-dek">{entry.summary}</p><div className="tag-row">{entry.topics.map((t) => <SystemTag key={t}>{t}</SystemTag>)}</div></header><article><p>[Logbook content will be written and verified before publication.]</p><h2>Revision history</h2>{entry.revisions.map((r) => <div className="revision" key={r.version}><b>VERSION {r.version}</b><span>{r.date}</span><p>{r.note}</p></div>)}</article></main><Footer /></>; }
