import type { RichTextContent } from "@/lib/homepage";

/** Generic heading + formatted copy block, managed from the CMS. */
export default function RichTextBlock({ content = {} }: { content?: RichTextContent }) {
  const { heading, body, align = "left" } = content;
  if (!heading && !body) return null;

  return (
    <section className="home-section bg-[var(--bg-primary)]">
      <div className="site-container-narrow" style={{ textAlign: align }}>
        {heading && <h2 className="home-heading mb-6">{heading}</h2>}
        {body && (
          <div
            className="rich-text text-[15px] leading-[1.8] text-[var(--text-secondary)] space-y-4"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </div>
    </section>
  );
}
