"use client";
/* Native images preserve intrinsic engineering-artifact dimensions in the zoom viewer. */
/* eslint-disable @next/next/no-img-element */

import type { MissionMedia } from "@/types/content";
import { useEffect, useRef, useState } from "react";

function MediaPlaceholder({ media }: { media: MissionMedia }) {
  return <div className="media-placeholder" role="img" aria-label={`${media.alt} Asset pending.`}>
    <span className="media-crosshair" aria-hidden="true" />
    <strong>MEDIA ASSET PENDING</strong>
    <code>{media.src}</code>
  </div>;
}

export function EngineeringDiagram({ media }: { media: MissionMedia }) {
  const [open, setOpen] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    closeButton.current?.focus();
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("modal-open"); };
  }, [open]);

  return <figure className="engineering-diagram">
    {media.technicalLabel && <span className="telemetry-label">{media.technicalLabel}</span>}
    <button className="diagram-trigger" type="button" onClick={() => setOpen(true)} aria-label={`Expand diagram: ${media.alt}`}>
      {media.available ? <img src={media.src} alt={media.alt} /> : <MediaPlaceholder media={media} />}
      <span className="expand-label">EXPAND ARTIFACT ↗</span>
    </button>
    <figcaption>{media.caption}</figcaption>
    {open && <div className="diagram-modal" role="dialog" aria-modal="true" aria-labelledby={`${media.id}-title`} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="diagram-modal-inner">
        <header><div><span className="telemetry-label">ENGINEERING DOCUMENT VIEWER</span><h2 id={`${media.id}-title`}>{media.technicalLabel ?? "Technical diagram"}</h2></div><button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Close diagram viewer">CLOSE ×</button></header>
        <div className="diagram-canvas">{media.available ? <img src={media.src} alt={media.alt} /> : <MediaPlaceholder media={media} />}</div>
        <p>{media.caption}</p>
      </div>
    </div>}
  </figure>;
}

export function VideoEvidence({ media }: { media: MissionMedia }) {
  return <figure className="video-evidence">
    {media.technicalLabel && <span className="telemetry-label">{media.technicalLabel}</span>}
    <div className="video-frame">
      {media.available ? <video controls preload="metadata" poster={media.poster}><source src={media.src} />Your browser does not support HTML video.</video> : media.poster && media.posterAvailable ? <div className="pending-video"><img src={media.poster} alt={media.alt} /><span>VIDEO DELIVERY PENDING</span></div> : <MediaPlaceholder media={media} />}
      <div className="evidence-status"><span><i />STATUS // {media.available ? "EVIDENCE AVAILABLE" : "ASSET PENDING"}</span><span>LOCAL MEDIA // HTML5</span></div>
    </div>
    <figcaption>{media.caption}</figcaption>
    {media.deliveryNote && <p className="delivery-note">{media.deliveryNote}</p>}
  </figure>;
}

export function ImageGallery({ media }: { media: MissionMedia[] }) {
  return <div className="image-gallery">{media.map((item) => <figure key={item.id}>{item.available ? <img src={item.src} alt={item.alt} /> : <MediaPlaceholder media={item} />}<figcaption><span>{item.technicalLabel}</span>{item.caption}</figcaption></figure>)}</div>;
}
