export interface StatItem {
  value?: string;
  label?: string;
}
export interface StatsContent {
  heading?: string;
  stats?: StatItem[];
}

/** A row of big numbers with labels. CMS-managed, addable to any page. */
export default function StatsBlock({ content = {} }: { content?: StatsContent }) {
  const { heading, stats = [] } = content;

  if (stats.length === 0) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-secondary)] border-y border-[var(--color-border-subtle)]">
      <div className="site-container">
        {heading && (
          <h2 className="font-serif text-[clamp(24px,3vw,38px)] text-[var(--text-primary)] text-center mb-12">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              {s.value && (
                <div className="font-serif text-[clamp(28px,4vw,44px)] text-[var(--text-primary)] leading-none mb-2">
                  {s.value}
                </div>
              )}
              {s.label && (
                <div className="text-[12px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">{s.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
