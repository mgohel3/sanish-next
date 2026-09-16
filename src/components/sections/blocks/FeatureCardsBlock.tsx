import type { FeatureCardsContent } from "@/lib/pages";

const GRID_COLS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

/** Heading over a grid of image + title + text cards (certifications, perks, mission…). CMS-managed. */
export default function FeatureCardsBlock({ content = {} }: { content?: FeatureCardsContent }) {
  const { heading, sub, columns = "3", cards = [] } = content;

  if (!heading && cards.length === 0) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        {(heading || sub) && (
          <div className="text-center mb-14">
            {heading && (
              <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">
                {heading}
              </h2>
            )}
            {sub && (
              <p
                className="text-[15px] text-[var(--text-secondary)] mt-3 max-w-xl mx-auto leading-[1.7]"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {sub}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${GRID_COLS[columns] || GRID_COLS["3"]} gap-10`}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-[28px] overflow-hidden border border-[var(--color-border-subtle)] bg-white"
              style={{ boxShadow: "0 12px 40px rgba(30,30,46,0.08)" }}
            >
              {card.image && (
                <div className="relative overflow-hidden bg-[#f8f8f8]" style={{ height: "260px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.title || ""}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}
              <div className="px-8 py-7">
                {card.accent && (
                  <div className="w-8 h-1 rounded-full mb-5" style={{ backgroundColor: card.accent }} />
                )}
                {card.title && (
                  <h3 className="font-serif text-[22px] text-[var(--text-primary)] mb-1">{card.title}</h3>
                )}
                {card.subtitle && (
                  <div
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-4"
                    style={{ color: card.accent || "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}
                  >
                    {card.subtitle}
                  </div>
                )}
                {card.body && (
                  <p
                    className="text-[14px] text-[var(--text-secondary)] leading-[1.75]"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {card.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
