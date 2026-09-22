/** Shown at the top of a page when it's being rendered via a CMS "Preview"
 * link (?preview=<token>) instead of a normal visit — makes it obvious this
 * is a preview (which may be a draft, not live on the real site) and gives
 * a one-click way back into the editor. Server component: no client JS
 * needed for a static banner. */
export default function CmsPreviewBanner({
  status,
  editHref,
}: {
  status?: string;
  editHref: string;
}) {
  const isDraft = status && status !== "published";
  return (
    <div
      className="sticky top-0 z-[9500] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-[12px] font-semibold text-white"
      style={{ backgroundColor: isDraft ? "#b45309" : "#24262b", fontFamily: "var(--font-jakarta)" }}
    >
      <span className="uppercase tracking-[0.12em]">CMS Preview</span>
      {status && (
        <span
          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
        >
          {status}
        </span>
      )}
      <span className="opacity-70">— this is how it will look once published; it isn&apos;t the live page.</span>
      <a href={editHref} className="underline underline-offset-2 hover:opacity-80">
        Back to Editor →
      </a>
    </div>
  );
}
