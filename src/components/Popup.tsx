"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { submitInquiry } from "@/lib/inquiries";

export default function Popup() {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const pendingDownload = useRef<{ url: string; filename: string } | null>(null);

  const openPopup = () => {
    setRender(true);
    setTimeout(() => setShow(true), 50);
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ downloadAfterSubmit?: boolean; downloadUrl?: string; downloadFilename?: string }>).detail;
      pendingDownload.current = detail?.downloadAfterSubmit
        ? {
            url: detail.downloadUrl || "/assets/pdf/sanish-catalogue.pdf",
            filename: detail.downloadFilename || "Sanish-Laminates-Catalogue.pdf",
          }
        : null;
      setHasTriggered(true);
      openPopup();
    };
    window.addEventListener("open-inquiry-popup", onOpen);
    return () => window.removeEventListener("open-inquiry-popup", onOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasTriggered) return;

    const timer = setTimeout(() => {
      if (hasTriggered) return;
      setHasTriggered(true);
      openPopup();
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasTriggered]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setRender(false), 500);
  };

  const [form, setForm] = useState({ name: "", phone: "", email: "", pincode: "", enquire_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  if (!render) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-y-auto transition-all duration-500 ${
        show
          ? "bg-black/65 backdrop-blur-[6px] opacity-100 visible"
          : "bg-black/0 backdrop-blur-none opacity-0 invisible"
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className={`relative w-full max-w-[500px] max-h-[90vh] flex flex-col rounded-[28px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)] transform transition-all duration-500 ease-out ${
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
        }`}
      >
        {/* Close button — pinned above the scrollable content */}
        <IconButton onClick={handleClose} size="sm" aria-label="Close" className="absolute top-4 right-4 z-20">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </IconButton>

        <div className="min-h-0 overflow-y-auto overflow-x-hidden">
        {/* ── Branded header zone ─────────────────────────── */}
        <div
          className="relative px-6 pt-8 pb-6 sm:px-9 sm:pt-9 sm:pb-7"
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
                "radial-gradient(circle, #85addc 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #f39ba2 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Logo */}
          <div className="mb-5 pr-8">
            <img src="/assets/img/logo/black-logo.svg" alt="Sanish Laminates" className="h-8 w-auto" />
          </div>

          <div
            className="text-[10.5px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#85addc", fontFamily: "var(--font-jakarta)" }}
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
        <div className="bg-white px-6 py-6 sm:px-9 sm:py-8">
          <form
            className="flex flex-col gap-3.5"
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitError(false);
              setSubmitting(true);
              const ok = await submitInquiry({
                name: form.name,
                email: form.email,
                phone: form.phone,
                type: "contact",
                message: [
                  form.message,
                  form.pincode ? `Pin Code: ${form.pincode}` : "",
                  form.enquire_type ? `Enquire Type: ${form.enquire_type}` : "",
                ].filter(Boolean).join("\n"),
              });
              setSubmitting(false);
              if (!ok) {
                setSubmitError(true);
                return;
              }
              if (pendingDownload.current) {
                const { url, filename } = pendingDownload.current;
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                pendingDownload.current = null;
              }
              handleClose();
            }}
          >
            {/* Row 1: Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "name",  type: "text", placeholder: "Name *",  required: true },
                { key: "phone", type: "tel",  placeholder: "Phone *", required: true },
              ].map((f) => (
                <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.required}
                  value={(form as Record<string,string>)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200"
                  style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #f39ba2"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; }}
                />
              ))}
            </div>
            {/* Row 2: Email + Pin Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "email",   type: "email", placeholder: "Email *",    required: true },
                { key: "pincode", type: "text",  placeholder: "Pin Code *", required: true },
              ].map((f) => (
                <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.required}
                  value={(form as Record<string,string>)[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200"
                  style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #f39ba2"; e.currentTarget.style.background = "#fff"; }}
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
              onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #f39ba2"; e.currentTarget.style.background = "#fff"; }}
              onBlur={(e) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; }}
            >
              <option value="" disabled>Enquire Type *</option>
              <option value="commercial">Commercial</option>
              <option value="consumer">Consumer</option>
            </select>

            {/* Message */}
            <textarea
              placeholder={"Enter the Product IDs You're Interested In\ne.g.,\nLM-19928\nLM-19920\nLM-19785"}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 resize-none"
              style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" }}
              onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #f39ba2"; e.currentTarget.style.background = "#fff"; }}
              onBlur={(e) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; }}
            />

            {submitError && (
              <p className="text-center text-[12px]" style={{ color: "#d64545", fontFamily: "var(--font-jakarta)" }}>
                Something went wrong sending your inquiry. Please try again.
              </p>
            )}

            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Inquiry"}
            </Button>
            <p className="text-center text-[11px] mt-1" style={{ color: "#A0A0B0", fontFamily: "var(--font-jakarta)" }}>
              We typically respond within 24 hours.
            </p>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
