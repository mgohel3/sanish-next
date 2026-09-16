import type { CSSProperties, ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Optional per-section background (colour, and/or an image with a colour
 * tint overlay) an editor can set on ANY CMS block from the "Background"
 * fields in the dashboard — see sanish-backend's
 * templates/dashboard/partials/_background_fields.html. Every block
 * component renders its own `<section className="... bg-[var(--bg-primary)]">`
 * root, so this wraps that output and forces the section's own background
 * transparent only when an override is actually set, letting this
 * wrapper's background show through instead.
 */
export default function BlockBackground({
  content,
  children,
}: {
  content?: Record<string, any>;
  children: ReactNode;
}) {
  const bgColor: string = content?.bg_color || "";
  const bgImage: string = content?.bg_image || "";

  if (!bgColor && !bgImage) return <>{children}</>;

  const wrapperStyle: CSSProperties = bgImage
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: bgColor };

  const opacityRaw = content?.bg_overlay_opacity;
  const opacity = opacityRaw === null || opacityRaw === undefined || opacityRaw === ""
    ? 0.4
    : Number(opacityRaw) / 100;

  return (
    <div className="relative isolate" style={wrapperStyle}>
      {bgImage && bgColor && (
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: bgColor, opacity }} />
      )}
      <div className="relative z-10 [&>section]:!bg-transparent [&>section]:!bg-none">{children}</div>
    </div>
  );
}
