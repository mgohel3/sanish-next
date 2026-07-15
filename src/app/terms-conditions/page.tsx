import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Terms & Conditions | Sanish Laminates",
  description:
    "Read the terms and conditions governing the use of the Sanish Laminates website and services.",
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "These Terms & Conditions (\"Terms\") govern your access to and use of the website operated by SAPPHIRE WOODS (INDIA) LLP under the brand Sanish Laminates (\"Sanish\", \"we\", \"us\", or \"our\"). By accessing or using this website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please discontinue use of the website.",
    ],
  },
  {
    heading: "2. Use of This Website",
    body: [
      "This website is intended to provide information about Sanish Laminates' products, collections, dealer network, and the Sanish Rewards programme. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the site.",
      "You must not misuse this website by knowingly introducing viruses, malware, or other technologically harmful material, or attempt to gain unauthorised access to any part of the website, the server on which it is hosted, or any connected system.",
    ],
  },
  {
    heading: "3. Product Information & Availability",
    body: [
      "We make reasonable efforts to ensure that product descriptions, designs, finishes, dimensions and images displayed on this website are accurate. However, due to differences in display settings and manufacturing variances, actual product colour and texture may vary slightly from what is shown online. We recommend requesting a physical sample before finalising your order.",
      "Product availability, specifications and pricing are subject to change without prior notice. Inclusion of a product on this website does not guarantee its availability at all times or through all dealers.",
    ],
  },
  {
    heading: "4. Intellectual Property",
    body: [
      "All content on this website, including but not limited to text, graphics, logos, product images, designs and the Sanish brand name and monogram, is the property of SAPPHIRE WOODS (INDIA) LLP or its licensors and is protected by applicable intellectual property laws.",
      "You may not reproduce, distribute, modify, publicly display, or create derivative works from any content on this website without our prior written consent, except for personal, non-commercial reference.",
    ],
  },
  {
    heading: "5. Dealer & Distributor Network",
    body: [
      "Information regarding our dealer and distributor network is provided for convenience. Sanish Laminates is not responsible for the individual business practices, pricing, or conduct of independent dealers and distributors, and any transaction entered into with a dealer is solely between you and that dealer.",
    ],
  },
  {
    heading: "6. Sanish Rewards Programme",
    body: [
      "Use of the Sanish Rewards mobile application and participation in the Rewards programme is subject to the programme's own terms, including eligibility, points accrual, redemption conditions and expiry rules, which are made available within the app. We reserve the right to modify, suspend or discontinue the Rewards programme at our discretion.",
    ],
  },
  {
    heading: "7. Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Sanish Laminates shall not be liable for any indirect, incidental, special or consequential damages arising out of or in connection with your use of this website or reliance on any information provided on it.",
      "Nothing in these Terms shall exclude or limit our liability for fraud, or for death or personal injury caused by our negligence, or any other liability that cannot be excluded or limited under applicable law.",
    ],
  },
  {
    heading: "8. Warranty Disclaimer",
    body: [
      "This website and its content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. Product warranties, where applicable, are governed separately by the specific product warranty terms provided at the time of purchase.",
    ],
  },
  {
    heading: "9. Governing Law & Jurisdiction",
    body: [
      "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms or your use of this website shall be subject to the exclusive jurisdiction of the courts at Delhi, India.",
    ],
  },
  {
    heading: "10. Changes to These Terms",
    body: [
      "We may revise these Terms from time to time. The updated Terms will be posted on this page with a revised \"Last updated\" date, and your continued use of the website after such changes constitutes acceptance of the revised Terms.",
    ],
  },
  {
    heading: "11. Contact Us",
    body: [
      "If you have any questions about these Terms & Conditions, please contact us at info@sanishlaminate.com or (+91) 7027 777 032, or write to us at SAPPHIRE WOODS (INDIA) LLP, Regd. Office: 203 Aggarwal Chamber, Sainik Vihar, Pitam Pura, Delhi - 110034.",
    ],
  },
];

export default function TermsConditionsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000"
        description="The terms governing your use of the Sanish Laminates website and services."
      />

      <section className="home-section--compact bg-[var(--bg-primary)]">
        <div className="site-container-narrow">
          <p className="text-[13px] text-[var(--text-secondary)] mb-12" style={{ fontFamily: "var(--font-jakarta)" }}>
            Last updated: July 2026
          </p>

          {SECTIONS.map((s) => (
            <div key={s.heading} className="mb-10">
              <h2 className="text-[22px] font-serif text-[var(--text-primary)] mb-3">{s.heading}</h2>
              <div className="flex flex-col gap-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.8] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
