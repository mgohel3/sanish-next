import type { CSSProperties } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Optional per-block heading/title style override an editor can set from the
 * dashboard's "Text Style" fields on ANY block, in both the Home Page and
 * Pages builders — see sanish-backend's
 * templates/dashboard/partials/_text_style_fields.html and
 * dashboard.views.homepage.TEXT_STYLE_FIELDS. Mirrors BlockBackground's
 * "blank means use the theme default" convention: every field here is
 * optional, and an empty object changes nothing.
 *
 * Call this once per component and spread the result onto the one heading/
 * title element the block treats as its "title" — not every text node in
 * the block, matching how the dashboard field is scoped ("this block's
 * default heading/title colour, font and size").
 */
export function resolveTextStyle(content?: Record<string, any>): CSSProperties | undefined {
  const color: string | undefined = content?.text_color || undefined;
  const fontFamily =
    content?.heading_font === "serif" ? "var(--font-vogue)" :
    content?.heading_font === "sans"  ? "var(--font-heebo)" :
    undefined;
  const fontSize = HEADING_SIZE_CLAMP[content?.heading_size as string] || undefined;

  if (!color && !fontFamily && !fontSize) return undefined;
  return { color, fontFamily, fontSize };
}

/**
 * Bounded presets, not a free pixel value — stays a fluid clamp() like every
 * heading on the site already uses, just shifted up or down, so a size
 * override can never freeze a heading at one fixed size that looks wrong on
 * mobile or an ultra-wide screen.
 */
const HEADING_SIZE_CLAMP: Record<string, string> = {
  sm: "clamp(22px, 2.8vw, 34px)",
  lg: "clamp(34px, 4.2vw, 56px)",
  xl: "clamp(40px, 5vw, 68px)",
};
