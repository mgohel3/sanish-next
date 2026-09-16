"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import IconButton from "@/components/ui/IconButton";

/**
 * Full-screen image viewer, rendered into document.body via a portal — nesting
 * a `fixed` overlay inside a `sticky`/transformed ancestor made it inherit
 * that ancestor's box instead of covering the viewport.
 */
export default function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-h-[85vh] sm:max-h-[90vh] max-w-full sm:max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <IconButton
        variant="glass"
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6"
        onClick={onClose}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </IconButton>
    </div>,
    document.body,
  );
}
