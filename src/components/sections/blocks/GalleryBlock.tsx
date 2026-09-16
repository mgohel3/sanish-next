export interface GalleryImage {
  image?: string;
  caption?: string;
}
export interface GalleryContent {
  heading?: string;
  sub?: string;
  columns?: "2" | "3" | "4";
  images?: GalleryImage[];
}

const GRID_COLS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

/** Heading over a responsive image grid. CMS-managed, addable to any page. */
export default function GalleryBlock({ content = {} }: { content?: GalleryContent }) {
  const { heading, sub, columns = "3", images = [] } = content;

  if (images.length === 0) return null;

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

        <div className={`grid grid-cols-1 ${GRID_COLS[columns] || GRID_COLS["3"]} gap-6`}>
          {images.map((img, i) => (
            <figure key={i} className="rounded-[20px] overflow-hidden" style={{ aspectRatio: "4 / 3" }}>
              {img.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.image} alt={img.caption || ""} className="w-full h-full object-cover" />
              )}
              {img.caption && (
                <figcaption className="text-[12px] text-[var(--text-secondary)] mt-2 px-1">{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
