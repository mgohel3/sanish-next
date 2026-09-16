export interface TestimonialItem {
  quote?: string;
  name?: string;
  role?: string;
  avatar?: string;
}
export interface TestimonialsContent {
  heading?: string;
  sub?: string;
  items?: TestimonialItem[];
}

/** Heading over a grid of customer quotes. CMS-managed, addable to any page. */
export default function TestimonialsBlock({ content = {} }: { content?: TestimonialsContent }) {
  const { heading, sub, items = [] } = content;

  if (items.length === 0) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        {(heading || sub) && (
          <div className="text-center mb-14">
            {heading && (
              <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] text-[var(--text-primary)]">{heading}</h2>
            )}
            {sub && (
              <p className="text-[15px] text-[var(--text-secondary)] mt-3 max-w-xl mx-auto leading-[1.7]">{sub}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-[24px] p-8 border border-[var(--color-border-subtle)] bg-white flex flex-col gap-5"
              style={{ boxShadow: "0 8px 32px rgba(30,30,46,0.06)" }}
            >
              {item.quote && (
                <p className="text-[15px] text-[var(--text-secondary)] leading-[1.75] italic">&ldquo;{item.quote}&rdquo;</p>
              )}
              <div className="flex items-center gap-3 mt-auto">
                {item.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.avatar} alt={item.name || ""} className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
                )}
                <div>
                  {item.name && <div className="text-[14px] font-semibold text-[var(--text-primary)]">{item.name}</div>}
                  {item.role && <div className="text-[12px] text-[var(--text-secondary)]">{item.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
