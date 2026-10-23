import Link from "next/link";
import { Fragment, type ReactNode } from "react";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  image: string;
  description?: string;
  breadcrumb?: Crumb[];
  rightSlot?: ReactNode;
  /** Set when `image` isn't the ~3.4:1 aspect the default crop is tuned for
   *  (see globals.css .page-hero__image) — fills the band width-first instead. */
  imageFill?: boolean;
  /** Centre the image in the part of the band that is visible below the fixed header (instead of the whole band,
   *  whose top ~83px sits under the header) — for banners with a subject that must not look pushed up. */
  belowHeader?: boolean;
  /** Set when the source image must never be cropped, on any viewport —
   *  letterboxes instead of cover-cropping (see globals.css
   *  .page-hero__image--no-crop). Opt-in only, so every other page's hero
   *  keeps its existing cover-crop behaviour unchanged. */
  noCrop?: boolean;
  /** Hide the title/description overlay and show only the breadcrumb,
   *  bottom-aligned — used on the blog single post page, where the title
   *  and description live in the article content instead. */
  breadcrumbOnly?: boolean;
};

export default function PageHero({
  title,
  image,
  description,
  breadcrumb,
  rightSlot,
  imageFill,
  belowHeader,
  noCrop,
  breadcrumbOnly,
}: PageHeroProps) {
  const imageClass = [
    "page-hero__image",
    imageFill ? "page-hero__image--fill" : "",
    noCrop ? "page-hero__image--no-crop" : "",
    belowHeader ? "page-hero__image--below-header" : "",
  ].filter(Boolean).join(" ");

  return (
    <section className="page-hero">
      <img
        src={image}
        alt=""
        className={imageClass}
      />
      <div className="page-hero__overlay" />
      <div className="page-hero__content">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-[12px] md:text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>
            {breadcrumb.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-white transition-colors">{c.label}</Link>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.92)" }}>{c.label}</span>
                )}
              </span>
            ))}
          </div>
        )}
        {!breadcrumbOnly && (
          <div className={rightSlot ? "flex flex-col md:flex-row md:items-end md:justify-between gap-8" : undefined}>
            <div>
              {/* A "|" (or a real newline) in the title starts a new line — e.g. "Earn Rewards on | Every Installation". */}
              <h1>
                {title.split(/\s*\|\s*|\n/).map((line, i) => (
                  <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
                ))}
              </h1>
              {description && <p>{description}</p>}
            </div>
            {rightSlot && <div className="w-full md:w-[320px] flex-shrink-0">{rightSlot}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
