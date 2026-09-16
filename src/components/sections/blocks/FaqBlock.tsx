import type { FaqContent } from "@/lib/pages";

/** Heading over an expandable question / answer list. CMS-managed. */
export default function FaqBlock({ content = {} }: { content?: FaqContent }) {
  const { heading, items = [] } = content;

  if (items.length === 0) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container max-w-3xl">
        {heading && (
          <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)] text-center mb-14">
            {heading}
          </h2>
        )}
        <div className="divide-y divide-[var(--border)]">
          {items.map((item, i) => (
            <details key={i} className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none text-[16px] font-medium text-[var(--text-primary)]">
                {item.q}
                <span className="ml-4 flex-shrink-0 text-[var(--text-secondary)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              {item.a && (
                <p className="mt-4 text-[15px] text-[var(--text-secondary)] leading-[1.7]">{item.a}</p>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
