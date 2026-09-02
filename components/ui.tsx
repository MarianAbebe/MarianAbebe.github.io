import Link from "next/link";
import type { ReactNode } from "react";

export function TelemetryLabel({ children }: { children: ReactNode }) {
  return <span className="telemetry-label">{children}</span>;
}

export function StatusIndicator({ label = "ONLINE" }: { label?: string }) {
  return <span className="status"><span className="status-dot" aria-hidden="true" />STATUS // {label}</span>;
}

export function TechnicalPanel({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  return <section className={`technical-panel ${className}`}>{label && <TelemetryLabel>{label}</TelemetryLabel>}{children}</section>;
}

export function SectionHeader({ eyebrow, title, index, description }: { eyebrow: string; title: string; index?: string; description?: string }) {
  return <header className="section-header">
    <div><TelemetryLabel>{index ? `${index} // ` : ""}{eyebrow}</TelemetryLabel><h2>{title}</h2></div>
    {description && <p>{description}</p>}
  </header>;
}

export function SystemTag({ children }: { children: ReactNode }) { return <span className="system-tag">{children}</span>; }

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="arrow-link" href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
