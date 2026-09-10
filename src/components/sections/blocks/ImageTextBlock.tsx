import type { ImageTextContent } from "@/lib/homepage";

/** Generic two-column image + copy block, managed from the CMS. */
export default function ImageTextBlock({ content = {} }: { content?: ImageTextContent }) {
  const {
    heading,
    body,
    image,
    image_side = "left",
    cta_label,
    cta_url,
  } = content;

  if (!heading && !body && !image) return null;

  const imageEl = image ? (
    <div
      className="relative overflow-hidden w-full"
      style={{ borderRadius: "28px", aspectRatio: "3 / 2" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={heading || ""} className="w-full h-full object-cover" />
    </div>
  ) : null;

  const copyEl = (
    <div>
      {heading && <h2 className="home-heading mb-6">{heading}</h2>}
      {body && (
        <div
          className="text-[15px] leading-[1.8] text-[var(--text-secondary)] space-y-4 mb-8"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {cta_label && cta_url && (
        <a href={cta_url} className="btn-pill btn-pill-primary inline-flex">
          {cta_label}
        </a>
      )}
    </div>
  );

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {image_side === "right" ? (
          <>
            {copyEl}
            {imageEl}
          </>
        ) : (
          <>
            {imageEl}
            {copyEl}
          </>
        )}
      </div>
    </section>
  );
}
