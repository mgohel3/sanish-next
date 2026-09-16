"use client";

import { useState, useEffect, useRef, type FocusEvent } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { useCmsForm, type FormFieldSchema } from "@/lib/forms";
import RecaptchaCheckbox from "@/components/RecaptchaCheckbox";

/**
 * Mirrors the CMS "Inquiry Popup" form (`inquiry-popup`) exactly — the
 * instant-render fallback until that schema loads. Add/remove/relabel fields
 * from `/cms/forms/inquiry-popup/`; submissions still land in Leads.
 */
const FALLBACK_FIELDS: FormFieldSchema[] = [
  { name: "name", field_type: "text", label: "Name", required: true, options: [] },
  { name: "phone", field_type: "tel", label: "Phone", required: true, options: [] },
  { name: "email", field_type: "email", label: "Email", required: true, options: [] },
  { name: "pincode", field_type: "text", label: "Pin Code", required: true, options: [] },
  { name: "enquire_type", field_type: "select", label: "Enquire Type", required: true, options: ["Commercial", "Consumer"] },
  {
    name: "message",
    field_type: "textarea",
    label: "Message",
    placeholder: "Enter the Product IDs You're Interested In\ne.g.,\nLM-19928\nLM-19920\nLM-19785",
    required: false,
    options: [],
  },
];

const fieldStyle = { background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)", fontFamily: "var(--font-jakarta)" };
const onFocus = (e: FocusEvent<HTMLElement>) => { e.currentTarget.style.border = "1.5px solid #f39ba2"; e.currentTarget.style.background = "#fff"; };
const onBlur = (e: FocusEvent<HTMLElement>) => { e.currentTarget.style.border = "1.5px solid transparent"; e.currentTarget.style.background = "#F7F7F9"; };

export default function Popup() {
  const pathname = usePathname();
  const isPreview = pathname?.startsWith("/cms-preview");
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
    if (hasTriggered || isPreview) return;

    const timer = setTimeout(() => {
      if (hasTriggered) return;
      setHasTriggered(true);
      openPopup();
    }, 30000);

    return () => clearTimeout(timer);
  }, [hasTriggered, isPreview]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => setRender(false), 500);
  };

  const { fields, values, setValue, submitting, error, submitLabel, handleSubmit, recaptcha } =
    useCmsForm("inquiry-popup", FALLBACK_FIELDS, "Submit Inquiry", "Thanks — we typically respond within 24 hours.");

  if (!render) return null;

  const lineFields = fields.filter((f) => ["text", "email", "tel", "number"].includes(f.field_type));
  const otherFields = fields.filter((f) => !lineFields.includes(f));

  const onSubmit = (e: { preventDefault: () => void }) =>
    handleSubmit(e, undefined, () => {
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
    });

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
          <form className="flex flex-col gap-3.5" onSubmit={onSubmit}>
            {lineFields.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lineFields.map((field) => (
                  <input
                    key={field.name}
                    type={field.field_type}
                    placeholder={field.required ? `${field.label} *` : field.label}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200"
                    style={fieldStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                ))}
              </div>
            )}

            {otherFields.map((field) => {
              if (field.field_type === "select") {
                return (
                  <select
                    key={field.name}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 appearance-none"
                    style={{ ...fieldStyle, color: values[field.name] ? "var(--text-primary)" : "#9B9BB0" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    <option value="" disabled>{field.label}{field.required ? " *" : ""}</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                );
              }
              if (field.field_type === "textarea") {
                return (
                  <textarea
                    key={field.name}
                    placeholder={field.placeholder}
                    rows={5}
                    required={field.required}
                    value={values[field.name] || ""}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 resize-none"
                    style={fieldStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                );
              }
              return null;
            })}

            {recaptcha.version === "v2" && (
              <RecaptchaCheckbox siteKey={recaptcha.siteKey} onVerify={recaptcha.onVerify} />
            )}

            {error && (
              <p className="text-center text-[12px]" style={{ color: "#d64545", fontFamily: "var(--font-jakarta)" }}>
                Something went wrong sending your inquiry. Please try again.
              </p>
            )}

            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? "Submitting…" : submitLabel}
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
