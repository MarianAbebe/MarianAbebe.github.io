"use client";

import { useCallback, useState } from "react";
import { marsDestinations } from "@/data/mars-destinations";
import type { MarsDestination } from "@/types/mars";

type Point = { x: number; y: number };

// These are tied to visible structures and surface equipment in the supplied key art.
const annotationLayout: Record<string, { label: Point; anchor: Point }> = {
  "trajectory-waypoint": { label: { x: 20.5, y: 43 }, anchor: { x: 27, y: 54 } },
  "research-outpost": { label: { x: 9, y: 63 }, anchor: { x: 29.5, y: 65 } },
  "systems-lab": { label: { x: 35.5, y: 50 }, anchor: { x: 38.5, y: 62 } },
  "field-log": { label: { x: 45, y: 58 }, anchor: { x: 47.5, y: 68 } },
  "signal-array": { label: { x: 55.5, y: 39 }, anchor: { x: 59, y: 60 } },
  "mission-archive": { label: { x: 70.5, y: 42 }, anchor: { x: 80, y: 57 } },
};

function instantScroll(top: number) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top, behavior: "auto" });
  window.setTimeout(() => { root.style.scrollBehavior = previous; }, 120);
}

function AnnotationLayer({ destinations, onAccess }: { destinations: MarsDestination[]; onAccess: (site: MarsDestination) => void }) {
  return <div className="mars-annotations" aria-label="MA-01 site annotations">
    <svg className="mars-annotation-lines" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
      {destinations.map((site) => {
        const layout = annotationLayout[site.id];
        return <g key={site.id}><line x1={layout.label.x} y1={layout.label.y} x2={layout.anchor.x} y2={layout.anchor.y} /><circle cx={layout.anchor.x} cy={layout.anchor.y} r=".45" /></g>;
      })}
    </svg>
    {destinations.map((site) => {
      const layout = annotationLayout[site.id];
      return <button key={site.id} className="mars-annotation" style={{ left: `${layout.label.x}%`, top: `${layout.label.y}%` }} onClick={() => onAccess(site)} aria-label={`Open ${site.description}: ${site.label}`}><span>{site.site}</span>{site.label}</button>;
    })}
  </div>;
}

export default function MarsExperience() {
  const [away, setAway] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const access = useCallback((site: MarsDestination) => {
    setTransitioning(true);
    window.setTimeout(() => {
      const target = document.getElementById(site.target);
      if (target) instantScroll(target.getBoundingClientRect().top + window.scrollY);
      setAway(true);
      setTransitioning(false);
    }, 180);
  }, []);
  const returnToSurface = () => { instantScroll(0); setAway(false); };

  return <section id="surface" className={`mars-experience mars-key-art-experience ${transitioning ? "surface-transitioning" : ""}`} aria-label="MA-01 mission interface">
    <picture className="mars-key-art"><img src="/mars/ma-01-key-art.png" alt="" /></picture>
    <div className="mars-key-art-shade" aria-hidden="true" />
    <div className="mars-mission-identity"><span>MARS SURFACE // MISSION INDEX</span><strong>MA-01</strong><small>AUTONOMOUS EXPLORATION PLATFORM</small></div>
    <aside className="mars-mission-directive"><span>MISSION DIRECTIVE</span><p>Explore the sites across the surface to discover engineering work, projects, and ideas.</p></aside>
    <AnnotationLayer destinations={marsDestinations} onAccess={access} />
    <details className="mars-directory"><summary>SITE DIRECTORY</summary><div>{marsDestinations.map((site) => <button key={site.id} onClick={() => access(site)}><span>{site.site}</span>{site.label}</button>)}</div></details>
    <div className="mars-compass" aria-label="Mission compass"><i>◆</i><b>N</b><span>NE // 042°</span></div>
    <a className="surface-skip" href="#about">SKIP EXPLORATION ↓</a>
    {away && <button className="return-surface" onClick={returnToSurface}>↑ MA-01 // SURFACE</button>}
  </section>;
}
