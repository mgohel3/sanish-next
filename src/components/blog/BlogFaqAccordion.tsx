import type { BlogFaq } from "@/lib/blog";

/**
 * Renders the CMS-authored FAQ list as a native <details>/<summary>
 * accordion — no JS needed, and each panel stays crawlable/expandable
 * for accessibility and SEO out of the box.
 */
export default function BlogFaqAccordion({ faqs }: { faqs: BlogFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className="blog-faq" aria-label="Frequently asked questions">
      <h2 className="blog-faq__heading">Frequently Asked Questions</h2>
      <div className="blog-faq__list">
        {faqs.map((faq, i) => (
          <details key={i} className="blog-faq__item">
            <summary className="blog-faq__question">
              <span>{faq.question}</span>
              <svg
                className="blog-faq__chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div
              className="blog-faq__answer"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}
