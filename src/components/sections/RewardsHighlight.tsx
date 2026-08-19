import Button from "@/components/ui/Button";
import StoreBadges from "@/components/ui/StoreBadges";

const PERKS = [
  { label: "Earn Points",       desc: "Earn reward points on every purchase of Sanish products.",        icon: "/assets/img/icon/rewards-earn-points.svg" },
  { label: "Exclusive Offers",  desc: "Unlock member-only discounts, gifts, and seasonal promotions.",   icon: "/assets/img/icon/rewards-exclusive-offers.svg" },
  { label: "Track Rewards",     desc: "Real-time tracking of your points balance and redemption history.", icon: "/assets/img/icon/rewards-track-rewards.svg" },
  { label: "Easy Redemption",   desc: "Redeem points instantly for cash discounts on your next order.",   icon: "/assets/img/icon/rewards-easy-redemption.svg" },
];

export default function RewardsHighlight() {
  return (
    <section className="home-section--compact relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)" }}>
      {/* Subtle gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(133,173,220,0.16) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(172,140,192,0.12) 0%, transparent 70%)" }} />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — Content */}
          <div>
            <h2 className="home-heading mb-5">
              S&apos;Rewards App
            </h2>
            <p className="text-[15px] leading-[1.8] mb-8 max-w-lg"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}>
              Join thousands of carpenters and contractors already earning with Sanish. Download the S&apos;Rewards app and start turning every purchase into points, gifts, and cash rewards.
            </p>

            {/* Perks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {PERKS.map((perk) => (
                <div key={perk.label} className="p-5 rounded-[18px]"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--color-border-subtle)", boxShadow: "0 16px 40px rgba(30,30,46,0.04)" }}>
                  <img src={perk.icon} alt="" className="w-8 h-8 mb-3" />
                  <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {perk.label}
                  </div>
                  <div className="text-[12px] leading-[1.6]" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-jakarta)" }}>
                    {perk.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <StoreBadges size="md" />
              <Button href="/rewards" variant="ghost" size="sm">
                Learn more about the programme →
              </Button>
            </div>

          {/* Right — App visual */}
          </div>

          <div className="relative flex items-center justify-center">
            {/* Glow ring */}
            <div className="absolute w-[360px] h-[360px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(133,173,220,0.18) 0%, transparent 70%)" }} />

            {/* Phone mockup photo */}
            <img
              src="/assets/img/phone-mckp.jpg"
              alt="S'Rewards app on a smartphone"
              className="relative z-10 w-[340px] sm:w-[400px] h-auto rounded-[28px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
