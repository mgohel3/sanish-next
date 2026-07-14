"use client";

import { useState } from "react";

const BG  = "#2C3E50";
const ON  = "#F5F2EE";
const ACC = "#C4916A";

export default function Home2SampleCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", pincode: "", enquire_type: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      await fetch(`${apiUrl}/inquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, phone: form.phone, email: form.email,
          message: `Sample request — Pin Code: ${form.pincode} | Enquire Type: ${form.enquire_type}`,
          inquiry_type: "sample_request",
        }),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: BG }}>
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(196,145,106,0.10) 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(139,123,171,0.08) 0%, transparent 70%)`, transform: "translate(-30%, 30%)" }} />

      <div className="relative z-10 site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: ACC }} />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium"
                style={{ color: ACC, fontFamily: "var(--font-heebo)" }}>Free Samples</span>
            </div>
            <h2 className="font-medium leading-[1.1] mb-5"
              style={{ fontSize: "clamp(34px,4vw,52px)", fontFamily: "var(--font-vogue)", color: ON, letterSpacing: "-0.01em" }}>
              See the Quality<br /><em>Before You Decide</em>
            </h2>
            <p className="text-[16px] leading-[1.75] mb-8"
              style={{ color: "rgba(245,242,238,0.75)", fontFamily: "var(--font-heebo)" }}>
              Request free physical laminate samples delivered to your door. Architects, interior designers, and builders get priority dispatch within 48 hours.
            </p>
            <div className="space-y-3">
              {[
                "Choose from 500+ designs",
                "A4-size physical sample chips",
                "Delivered anywhere in India",
                "No cost, no commitment",
              ].map((pt) => (
                <div key={pt} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${ACC}25` }}>
                    <svg className="w-3 h-3" fill="none" stroke={ACC} strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[14px]"
                    style={{ color: "rgba(245,242,238,0.75)", fontFamily: "var(--font-heebo)" }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="p-8 md:p-10"
            style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "28px", border: "1px solid rgba(255,255,255,0.12)" }}>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(123,171,139,0.2)" }}>
                  <svg className="w-8 h-8" fill="none" stroke="#7BAB8B" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[22px] font-medium mb-2"
                  style={{ color: ON, fontFamily: "var(--font-heebo)" }}>Request Received!</h3>
                <p className="text-[14px]"
                  style={{ color: "rgba(245,242,238,0.6)", fontFamily: "var(--font-heebo)" }}>
                  Our team will contact you within 24 hours to confirm your sample selections.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-medium mb-6"
                  style={{ color: ON, fontFamily: "var(--font-heebo)" }}>Request Free Samples</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "name",  label: "Name *",  type: "text", ph: "Your name",       req: true },
                      { key: "phone", label: "Phone *", type: "tel",  ph: "+91 XXXXX XXXXX", req: true },
                    ].map(({ key, label, type, ph, req }) => (
                      <div key={key}>
                        <label className="text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 block"
                          style={{ color: ON, fontFamily: "var(--font-heebo)" }}>{label}</label>
                        <input required={req} type={type} placeholder={ph}
                          value={(form as Record<string,string>)[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full px-4 py-3 text-[14px] border outline-none transition-colors"
                          style={{ borderRadius: "12px", color: ON, backgroundColor: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.15)", fontFamily: "var(--font-heebo)" }} />
                      </div>
                    ))}
                  </div>
                  {/* Row 2: Email + Pin Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "email",   label: "Email *",    type: "email", ph: "your@email.com", req: true },
                      { key: "pincode", label: "Pin Code *", type: "text",  ph: "e.g. 110001",    req: true },
                    ].map(({ key, label, type, ph, req }) => (
                      <div key={key}>
                        <label className="text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 block"
                          style={{ color: ON, fontFamily: "var(--font-heebo)" }}>{label}</label>
                        <input required={req} type={type} placeholder={ph}
                          value={(form as Record<string,string>)[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full px-4 py-3 text-[14px] border outline-none transition-colors"
                          style={{ borderRadius: "12px", color: ON, backgroundColor: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.15)", fontFamily: "var(--font-heebo)" }} />
                      </div>
                    ))}
                  </div>
                  {/* Enquire Type */}
                  <div>
                    <label className="text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 block"
                      style={{ color: ON, fontFamily: "var(--font-heebo)" }}>Enquire Type *</label>
                    <select required value={form.enquire_type} onChange={(e) => setForm({ ...form, enquire_type: e.target.value })}
                      className="w-full px-4 py-3 text-[14px] border outline-none transition-colors appearance-none"
                      style={{ borderRadius: "12px", color: ON, backgroundColor: BG, borderColor: "rgba(255,255,255,0.15)", fontFamily: "var(--font-heebo)" }}>
                      <option value="" disabled>Select type</option>
                      <option value="commercial">Commercial</option>
                      <option value="consumer">Consumer</option>
                    </select>
                  </div>
                  <button type="submit"
                    className="w-full py-4 text-[13px] font-medium text-white uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:opacity-90"
                    style={{ backgroundColor: ACC, borderRadius: "14px", fontFamily: "var(--font-heebo)" }}>
                    Request My Free Samples
                  </button>
                  <p className="text-[11px] text-center" style={{ color: "rgba(245,242,238,0.35)", fontFamily: "var(--font-heebo)" }}>
                    Free delivery. No credit card required.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
