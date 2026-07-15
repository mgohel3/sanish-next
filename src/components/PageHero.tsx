import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  image: string;
  description?: string;
  breadcrumb?: Crumb[];
  rightSlot?: ReactNode;
};

export default function PageHero({
  title,
  image,
  description,
  breadcrumb,
  rightSlot,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <img src={image} alt="" className="page-hero__image" />
      <div className="page-hero__overlay" />
      <div className="page-hero__content">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-2 mb-4 text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>
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
        <div className={rightSlot ? "flex flex-col md:flex-row md:items-end md:justify-between gap-8" : undefined}>
          <div>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
          {rightSlot && <div className="w-full md:w-[320px] flex-shrink-0">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
}
