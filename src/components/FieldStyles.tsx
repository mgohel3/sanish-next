"use client";

import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */

type FieldStyle = {
  color?: string;
  font?: string;
  size?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: string;
};

const SCALE: Record<string, number> = { sm: 0.85, lg: 1.2, xl: 1.5 };

const loadedFonts = new Set<string>();
function loadGoogleFont(name: string) {
  if (typeof document === "undefined" || loadedFonts.has(name)) return;
  loadedFonts.add(name);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name).replace(/%20/g, "+")}:ital,wght@0,400;0,700;1,400&display=swap`;
  document.head.appendChild(link);
}
const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const PROPS = ["color", "font-family", "font-size", "font-weight", "font-style", "text-align", "text-decoration-line"] as const;

/**
 * Applies the per-field text styles an editor set with the dashboard's field
 * toolbar (content.field_styles = { fieldName: {color, font, size, bold,
 * italic, align} }) without every block component having to know about them:
 * it finds the element inside the block whose text equals that field's value
 * and styles it inline. Blank / absent styles do nothing, so existing blocks
 * look exactly as before. Rendered as a hidden marker as the LAST child of the
 * block's wrapper — see BlockBackground.
 */
export default function FieldStyles({ content }: { content: Record<string, any> }) {
  const marker = useRef<HTMLSpanElement>(null);
  const styles: Record<string, FieldStyle> = content?.field_styles || {};
  const key = JSON.stringify([styles, Object.keys(styles).map((k) => content?.[k])]);

  useEffect(() => {
    const root = marker.current?.parentElement;
    if (!root) return;
    const originals = new Map<HTMLElement, Record<string, string>>();

    const setProp = (el: HTMLElement, prop: string, value: string) => {
      let o = originals.get(el);
      if (!o) { o = {}; originals.set(el, o); }
      if (!(prop in o)) o[prop] = el.style.getPropertyValue(prop);
      el.style.setProperty(prop, value);
    };
    const restore = () => {
      originals.forEach((o, el) => {
        PROPS.forEach((p) => {
          if (p in o) {
            if (o[p]) el.style.setProperty(p, o[p]);
            else el.style.removeProperty(p);
          }
        });
      });
      originals.clear();
    };

    const targets: { el: HTMLElement; st: FieldStyle }[] = [];
    const all = Array.from(root.querySelectorAll<HTMLElement>("*"));
    Object.entries(styles).forEach(([field, st]) => {
      const raw = content?.[field];
      if (typeof raw !== "string" || !st) return;
      const want = norm(raw.replace(/<[^>]*>/g, " "));
      if (!want) return;
      const hits = all.filter((el) => {
        if (el === marker.current || el.closest("svg, script, style")) return false;
        return norm(el.textContent || "") === want;
      });
      // deepest matching elements only
      hits
        .filter((el) => !hits.some((o) => o !== el && el.contains(o)))
        .forEach((el) => targets.push({ el, st }));
    });

    const apply = () => {
      restore();
      targets.forEach(({ el, st }) => {
        if (st.color) setProp(el, "color", st.color);
        if (st.font === "serif") setProp(el, "font-family", "var(--font-vogue)");
        else if (st.font === "sans") setProp(el, "font-family", "var(--font-heebo)");
        else if (st.font) { loadGoogleFont(st.font); setProp(el, "font-family", `'${st.font}', serif`); }
        if (st.bold) setProp(el, "font-weight", "700");
        if (st.italic) setProp(el, "font-style", "italic");
        if (st.underline) setProp(el, "text-decoration-line", "underline");
        if (st.align) setProp(el, "text-align", st.align);
        if (st.size && /^\d+$/.test(st.size)) {
          // exact px on desktop, fluid down to ~60% on small screens
          const px = parseInt(st.size, 10);
          setProp(el, "font-size", `clamp(${Math.max(12, Math.round(px * 0.6))}px, ${((px / 1280) * 100).toFixed(2)}vw + 0.4rem, ${px}px)`);
        } else if (st.size && SCALE[st.size]) {
          const base = parseFloat(getComputedStyle(el).fontSize);
          if (base) setProp(el, "font-size", `${(base * SCALE[st.size]).toFixed(2)}px`);
        }
      });
    };
    apply();

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(apply, 150); };
    const hasSize = targets.some(({ st }) => st.size && SCALE[st.size]);
    if (hasSize) window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      restore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return <span ref={marker} hidden aria-hidden="true" data-field-styles />;
}
