import Button from "@/components/ui/Button";

export interface PricingPlan {
  title?: string;
  price?: string;
  period?: string;
  features?: string; // newline-separated
  cta_label?: string;
  cta_url?: string;
  highlighted?: boolean;
}
export interface PricingContent {
  heading?: string;
  sub?: string;
  plans?: PricingPlan[];
}

/** Heading over a row of pricing / plan cards. CMS-managed, addable to any page. */
export default function PricingBlock({ content = {} }: { content?: PricingContent }) {
  const { heading, sub, plans = [] } = content;

  if (plans.length === 0) return null;

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => {
            const features = (plan.features || "").split("\n").map((f) => f.trim()).filter(Boolean);
            return (
              <div
                key={i}
                className={`rounded-[24px] p-9 flex flex-col gap-6 border ${
                  plan.highlighted ? "border-[var(--accent-blue)] bg-white" : "border-[var(--color-border-subtle)] bg-white"
                }`}
                style={{
                  boxShadow: plan.highlighted ? "0 24px 60px rgba(30,30,46,0.14)" : "0 8px 32px rgba(30,30,46,0.06)",
                  transform: plan.highlighted ? "translateY(-8px)" : undefined,
                }}
              >
                {plan.title && <h3 className="text-[18px] font-bold text-[var(--text-primary)]">{plan.title}</h3>}
                {plan.price && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-[36px] font-serif text-[var(--text-primary)]">{plan.price}</span>
                    {plan.period && <span className="text-[13px] text-[var(--text-secondary)]">{plan.period}</span>}
                  </div>
                )}
                {features.length > 0 && (
                  <ul className="flex flex-col gap-3">
                    {features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--accent-blue)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {plan.cta_label && plan.cta_url && (
                  <Button href={plan.cta_url} variant={plan.highlighted ? "primary" : "ghost"} fullWidth className="mt-auto">
                    {plan.cta_label}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
