"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
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
        onClick={() => setOpen(true)}
        aria-label={`View full image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={variant === "phone" ? "(max-width: 800px) 42vw, 230px" : "(max-width: 800px) 100vw, 82vw"}
        />
      </button>
      {open && (
        <div
          className="lifeops-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            type="button"
            className="lifeops-image-lightbox-close"
            onClick={() => setOpen(false)}
            aria-label="Close image preview"
          >
            <X size={21} />
          </button>
          <div className="lifeops-image-lightbox-stage">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="96vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
