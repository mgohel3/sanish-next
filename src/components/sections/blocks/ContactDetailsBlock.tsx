import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import DynamicForm from "@/components/DynamicForm";
import type { ContactDetailsContent } from "@/lib/pages";
import { addressLines, getSiteSettings, mapEmbedSrc } from "@/lib/siteSettings";

/** Headquarters address / phone / email list beside an embedded map + enquiry form. CMS-managed. */
export default async function ContactDetailsBlock({ content = {} }: { content?: ContactDetailsContent }) {
  // CMS > SEO & Settings > Site Settings is the source of truth; what is typed in the block is only the fallback.
  const site = await getSiteSettings();
  const siteAddress = addressLines(site).join("\n");
  const sitePhones = [site.phone_primary, site.phone_secondary].filter(Boolean).map((p) => ({ label: p, value: p.replace(/[^\d+]/g, "") }));
  const siteEmails = [site.email_primary, site.email_secondary].filter(Boolean).map((e) => ({ value: e }));
  const {
    heading = "Our Headquarters",
  } = content;
  const address = siteAddress || content.address;
  const phones = sitePhones.length ? sitePhones : content.phones ?? [];
  const emails = siteEmails.length ? siteEmails : content.emails ?? [];
  const map_embed_url = mapEmbedSrc(site.map_embed_url) || mapEmbedSrc(content.map_embed_url);
  const {
    form_heading,
    form_sub,
    form_slug,
  } = content;

  return (
    <section className="home-section bg-[var(--bg-primary)]">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] lg:gap-[100px]">
          {/* Contact Info & Map */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-serif text-[clamp(28px,3vw,36px)] text-[var(--text-primary)] mb-8">{heading}</h3>

              <div className="space-y-8">
                {address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 text-[var(--accent-blue)]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[12px] md:text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--text-secondary)] mb-2">
                        Address
                      </h4>
                      <p className="text-[15px] text-[var(--text-primary)] leading-[1.6] whitespace-pre-line">
                        {address}
                      </p>
                    </div>
                  </div>
                )}

                {phones.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 text-[var(--accent-blue)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[12px] md:text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--text-secondary)] mb-2">
                        Phone
                      </h4>
                      <p className="text-[15px] text-[var(--text-primary)] leading-[1.6]">
                        {phones.map((p, i) => (
                          <span key={i}>
                            <a href={`tel:${p.value}`} className="hover:text-[var(--accent-blue)] transition-colors">
                              {p.label || p.value}
                            </a>
                            {i < phones.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}

                {emails.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 text-[var(--accent-blue)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[12px] md:text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--text-secondary)] mb-2">
                        Email
                      </h4>
                      <p className="text-[15px] text-[var(--text-primary)] leading-[1.6]">
                        {emails.map((e, i) => (
                          <span key={i}>
                            <a href={`mailto:${e.value}`} className="hover:text-[var(--accent-blue)] transition-colors">
                              {e.value}
                            </a>
                            {i < emails.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {map_embed_url && (
              <div className="w-full h-[300px] bg-gray-200 border border-[var(--border)] overflow-hidden">
                <iframe
                  src={map_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location map"
                ></iframe>
              </div>
            )}
          </div>

          {/* Premium Form */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[40px] md:p-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.04)] h-fit">
            {form_heading && (
              <h3 className="font-serif text-[28px] text-[var(--text-primary)] mb-2">{form_heading}</h3>
            )}
            {form_sub && (
              <p className="text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">{form_sub}</p>
            )}
            {form_slug ? <DynamicForm slug={form_slug} /> : <ContactForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
