"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, Maximize2 } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  variant?: "desktop" | "phone";
  priority?: boolean;
};

export default function ImageLightbox({
  src, alt, width, height, variant = "desktop", priority = false,
}: Props) {
  const [open, setOpen] = useState(false);\n  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); setZoomed(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`lifeops-gallery-image-button lifeops-gallery-${variant}`}
        onClick={() => { setZoomed(false); setOpen(true); }}
        aria-label={`Enlarge image: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} priority={priority}
          sizes={variant === "phone" ? "(max-width: 800px) 42vw, 230px" : "(max-width: 800px) 100vw, 82vw"} />
        <span className="lifeops-gallery-zoom-hint"><Maximize2 size={13} /> VIEW FULL SIZE</span>
      </button>
      {open && (
        <div className="lifeops-image-lightbox" role="dialog" aria-modal="true" aria-label={alt}
          onMouseDown={(event) => { if (event.target === event.currentTarget) { setOpen(false); setZoomed(false); } }}>
          <div className="lifeops-image-lightbox-toolbar">
            <span>LIFEOPS / IMAGE PREVIEW</span>
            <button type="button" onClick={() => { setOpen(false); setZoomed(false); }} aria-label="Close image preview">
              <X size={18} /> <span style={{ marginLeft: 7, font: "inherit", letterSpacing: "inherit" }}>CLOSE</span>
            </button>
          </div>
          <div className={`lifeops-image-lightbox-stage${zoomed ? " is-zoomed" : ""}`}
            onClick={(event) => { if (event.target === event.currentTarget) { setOpen(false); setZoomed(false); } }}>
            <Image src={src} alt={alt} width={width} height={height}
              sizes="(max-width: 800px) 96vw, 92vw"
              onClick={() => setZoomed((value) => !value)}
              className={zoomed ? "is-zoomed" : ""}
              draggable={false} />
            <span className="lifeops-lightbox-instruction">{zoomed ? "CLICK IMAGE TO FIT" : "CLICK IMAGE TO ZOOM"}</span>
          </div>
        </div>
      )}
    </>
  );
}
