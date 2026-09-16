export interface LogoItem {
  image?: string;
  name?: string;
}
export interface LogosStripContent {
  heading?: string;
  logos?: LogoItem[];
}

/** A row of partner / certification / press logos. CMS-managed, addable to any page. */
export default function LogosStripBlock({ content = {} }: { content?: LogosStripContent }) {
  const { heading, logos = [] } = content;

  if (logos.length === 0) return null;

  return (
    <section className="home-section--compact bg-[var(--bg-primary)]">
      <div className="site-container">
        {heading && (
          <div className="text-center text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] mb-8">
            {heading}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center" style={{ height: "40px" }}>
              {logo.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.image}
                  alt={logo.name || ""}
                  className="h-full w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
