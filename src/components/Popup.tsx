"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Popup() {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggerPopup = () => {
      if (hasTriggered) return;
      setHasTriggered(true);
      setRender(true);
      setTimeout(() => setShow(true), 50);
    };

    const timer = setTimeout(() => {
      triggerPopup();
    }, 30000);

    const aboutSection = document.getElementById("about");
    let st: ScrollTrigger | null = null;

    if (aboutSection) {
      st = ScrollTrigger.create({
        trigger: aboutSection,
        start: "bottom center",
        once: true,
        onEnter: triggerPopup,
      });
    }

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setRender(false), 500);
  };

  const [form, setForm] = useState({ name: "", phone: "", email: "", pincode: "", enquire_type: "" });

  if (!render) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-500 ${
        show
          ? "bg-black/65 backdrop-blur-[6px] opacity-100 visible"
          : "bg-black/0 backdrop-blur-none opacity-0 invisible"
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className={`relative max-w-[500px] w-[92%] rounded-[28px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)] transform transition-all duration-500 ease-out ${
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        }`}
      >
        {/* ── Branded header zone ─────────────────────────── */}
        <div
          className="relative px-9 pt-9 pb-7"
          style={{
            background:
              "linear-gradient(135deg, #EBF1F8 0%, #F5EDF4 40%, #FBF0EA 100%)",
          }}
        >
          {/* Decorative large blurred circle */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #7B9EC4 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #C97A92 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-black/8 hover:bg-black/15 transition-colors"
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#3A3A4A]"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo dot grid */}
          <div className="grid grid-cols-2 gap-[1.5px] w-fit mb-5">
            {(["#7B9EC4", "#E8956D", "#C97A92", "#E8B49A"] as const).map((c) => (
              <span
                key={c}
                className="block w-3 h-3 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div
            className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#7B9EC4", fontFamily: "var(--font-jakarta)" }}
          >
            Have a Project?
          </div>
          <h3
            className="font-serif text-[clamp(30px,5vw,38px)] leading-[1.1] mb-3"
            style={{ color: "#1E1E2E" }}
          >
            Request an Inquiry
          </h3>
          <p
            className="text-[13.5px] leading-relaxed"
            style={{ color: "#6B6B80", fontFamily: "var(--font-jakarta)" }}
          >
            Share your details and our architectural consultants will get back
            to you shortly.
          </p>
        </div>

        {/* ── Form zone ───────────────────────────────────── */}
        <div className="bg-white px-9 py-8">
          <form
            className="flex flex-col gap-3.5"
            onSubmit={(e) => { e.preventDefault(); handleClose(); }}
          >
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "name",  type: "text", placeholder: "Name *",  required: true },
                { key: "phone", type: "tel",  placeholder: "Phone *", required: true },
              ].map((f) => (
                <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.required}
                  value={(form as Record<string,string>)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200"
                  style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #7B9EC4"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; }}
                />
              ))}
            </div>
            {/* Row 2: Email + Pin Code */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "email",   type: "email", placeholder: "Email *",    required: true },
                { key: "pincode", type: "text",  placeholder: "Pin Code *", required: true },
              ].map((f) => (
                <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.required}
                  value={(form as Record<string,string>)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200"
                  style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #7B9EC4"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; }}
                />
              ))}
            </div>
            {/* Enquire Type */}
            <select
              required
              value={form.enquire_type}
              onChange={(e) => setForm({ ...form, enquire_type: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 appearance-none"
              style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: form.enquire_type ? "var(--text-primary)" : "#9B9BB0", fontFamily: "var(--font-jakarta)" }}
              onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #7B9EC4"; e.currentTarget.style.background = "#fff"; }}
              onBlur={(e) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; }}
            >
              <option value="" disabled>Enquire Type *</option>
              <option value="commercial">Commercial</option>
              <option value="consumer">Consumer</option>
            </select>

            <button type="submit"
              className="w-full mt-1 relative overflow-hidden rounded-2xl py-4 text-[13px] font-semibold tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-[2px]"
              style={{ background: "linear-gradient(135deg, #7B9EC4 0%, #8BAED4 100%)", boxShadow: "0 8px 28px rgba(123,158,196,0.45)", fontFamily: "var(--font-jakarta)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 36px rgba(123,158,196,0.60)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(123,158,196,0.45)"; }}
            >
              <span className="relative z-10">Submit Inquiry</span>
            </button>
            <p className="text-center text-[11px] mt-1" style={{ color: "#A0A0B0", fontFamily: "var(--font-jakarta)" }}>
              We typically respond within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
