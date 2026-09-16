import type { ContentSectionContent } from "@/lib/pages";

/** Eyebrow + heading + rich-text body, optionally beside an image. CMS-managed. */
export default function ContentSectionBlock({ content = {} }: { content?: ContentSectionContent }) {
  const { eyebrow, heading, body, image, image_side = "right" } = content;

  if (!heading && !body && !image) return null;

  const imageEl = image ? (
    <div className="relative">
      <div className="h-full min-h-[420px] rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} className="w-full h-full object-cover" alt={heading || ""} />
      </div>
    </div>
  ) : null;

  const copyEl = (
    <div>
      {eyebrow && (
        <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium">
          {eyebrow}
        </div>
      )}
      {heading && (
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] text-[var(--text-primary)] mb-8 leading-[1.1]">
          {heading}
        </h2>
      )}
      {body && (
        <div
          className="space-y-6 text-[15px] text-[var(--text-secondary)] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </div>
  );

  if (image_side === "none" || !image) {
    return (
      <section className="home-section bg-[var(--bg-primary)]">
        <div className="site-container max-w-3xl">{copyEl}</div>
      </section>
    );
  }

  return (
    <section className="home-section bg-[var(--bg-primary)]">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[100px] items-stretch">
          {image_side === "left" ? (
            <>
              {imageEl}
              {copyEl}
            </>
          ) : (
            <>
              {copyEl}
              {imageEl}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
