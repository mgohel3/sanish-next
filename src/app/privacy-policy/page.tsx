import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Privacy Policy | Sanish Laminates",
  description:
    "Read the Sanish Laminates privacy policy to understand how we collect, use and protect your personal information.",
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Introduction",
    body: [
      "SAPPHIRE WOODS (INDIA) LLP, operating under the brand Sanish Laminates (\"Sanish\", \"we\", \"us\", or \"our\"), respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose and safeguard information when you visit our website, contact our team, register for our Rewards programme, or otherwise interact with us.",
      "By using our website or services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access or use our website.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "We may collect personal information that you voluntarily provide to us, including your name, phone number, email address, company or business name, city/pincode, and any details you submit through our contact, dealer, or product enquiry forms.",
      "We may also collect non-personal information automatically as you browse our website, such as your IP address, browser type, device information, pages visited, and time spent on the site, through cookies and similar tracking technologies.",
      "If you register for the Sanish Rewards programme, we collect additional information necessary to process points, redemptions and payouts, such as your carpenter/professional details, UPI ID or bank account information for reward disbursal.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    body: [
      "We use the information we collect to respond to your enquiries, process dealer and product requests, provide customer support, and administer the Rewards programme, including crediting points and processing redemptions.",
      "We may also use your information to send you updates about new collections, promotions, and offers, where you have opted in to receive such communications. You may unsubscribe from marketing communications at any time.",
      "We use aggregated, anonymised website usage data to understand how visitors interact with our site so that we can improve its content, layout and performance.",
    ],
  },
  {
    heading: "4. Cookies & Tracking Technologies",
    body: [
      "Our website uses cookies and similar technologies to remember your preferences, understand site traffic, and improve your browsing experience. You can control or disable cookies through your browser settings; however, doing so may affect certain features of the website.",
    ],
  },
  {
    heading: "5. Sharing of Information",
    body: [
      "We do not sell your personal information to third parties. We may share information with trusted service providers who assist us in operating our website, processing enquiries, or administering the Rewards programme (such as payment processors for reward disbursal), and who are contractually obligated to keep your information confidential.",
      "We may disclose information where required to comply with applicable law, regulation, legal process, or governmental request, or to protect the rights, property or safety of Sanish Laminates, our customers, or others.",
    ],
  },
  {
    heading: "6. Data Security",
    body: [
      "We implement reasonable administrative, technical and physical safeguards designed to protect your personal information from unauthorised access, disclosure, alteration or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "7. Your Rights & Choices",
    body: [
      "You may request access to, correction of, or deletion of the personal information we hold about you by contacting us using the details below. We will respond to such requests in accordance with applicable law.",
      "You may opt out of receiving marketing communications from us at any time by using the unsubscribe link in our emails or by contacting us directly.",
    ],
  },
  {
    heading: "8. Third-Party Links",
    body: [
      "Our website may contain links to third-party websites, including social media platforms and app stores. We are not responsible for the privacy practices or content of these third-party sites and encourage you to review their respective privacy policies.",
    ],
  },
  {
    heading: "9. Children's Privacy",
    body: [
      "Our website and services are not directed at individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.",
    ],
  },
  {
    heading: "10. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal or regulatory reasons. The updated policy will be posted on this page with a revised \"Last updated\" date.",
    ],
  },
  {
    heading: "11. Contact Us",
    body: [
      "If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at info@sanishlaminate.com or (+91) 7027 777 032, or write to us at SAPPHIRE WOODS (INDIA) LLP, Regd. Office: 203 Aggarwal Chamber, Sainik Vihar, Pitam Pura, Delhi - 110034.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000"
        description="How Sanish Laminates collects, uses and protects your information."
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
