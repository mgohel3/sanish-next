import Button from "@/components/ui/Button";
import type { CtaBannerContent } from "@/lib/homepage";

/** Generic full-width call-to-action band, managed from the CMS. */
export default function CtaBannerBlock({ content = {} }: { content?: CtaBannerContent }) {
  const {
    heading,
    sub,
    bg_image,
    primary_label,
    primary_url,
    secondary_label,
    secondary_url,
  } = content;

  if (!heading && !sub) return null;

  return (
    <section className="relative home-section overflow-hidden">
      {bg_image && (
        <div className="absolute inset-0 z-0 bg-[#1c130a] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bg_image} alt="" className="w-full h-full object-cover absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(28,19,10,0.72) 0%, rgba(20,30,50,0.62) 60%, rgba(28,19,10,0.72) 100%)",
            }}
          />
        </div>
      )}

      <div className="site-container relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          {heading && (
            <h2
              className={`font-serif text-[clamp(32px,4.5vw,56px)] leading-[1.15] mb-6 font-normal ${
                bg_image ? "text-white drop-shadow-sm" : "text-[var(--text-primary)]"
              }`}
            >
              {heading}
            </h2>
          )}
          {sub && (
            <p
              className={`text-[16px] leading-[1.6] mb-10 max-w-lg mx-auto ${
                bg_image ? "text-white/90" : "text-[var(--text-secondary)]"
              }`}
            >
              {sub}
            </p>
          )}
          <div className="flex items-center justify-center gap-5 flex-wrap">
            {primary_label && primary_url && (
              <Button href={primary_url} variant={bg_image ? "light" : "primary"}>
                {primary_label}
              </Button>
            )}
            {secondary_label && secondary_url && (
              <Button href={secondary_url} variant={bg_image ? "glass" : "ghost"}>
                {secondary_label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
