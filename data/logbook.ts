import type { LogbookEntry } from "@/types/content";
export const logbookEntries: LogbookEntry[] = [
  { title: "[Logbook Entry]", slug: "logbook-placeholder-one", date: "[Date]", summary: "[A short summary of the idea under examination.]", topics: ["[Topic]", "[Topic]"], version: "1.0", status: "DRAFT", relatedMissionIds: ["mission-001"], revisions: [{ version: "1.0", date: "[Date]", note: "Initial record." }] },
  { title: "[Logbook Entry]", slug: "logbook-placeholder-two", date: "[Date]", summary: "[A short summary of the idea under examination.]", topics: ["[Topic]"], version: "1.0", status: "DRAFT", relatedMissionIds: [], revisions: [{ version: "1.0", date: "[Date]", note: "Initial record." }] }
];
