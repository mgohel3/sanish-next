"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitInquiry, type InquiryType } from "@/lib/inquiries";

const COLLECTION_LABELS: Record<string, string> = {
  sshades: "S'Shades Premium",
  thre3: "Thre3",
  "cool-colour": "Cool Colour",
  "08mm": "Perspective V4",
  thermo: "Thermo Laminates",
};

const PURPOSE_LABELS: Record<string, string> = {
  commercial: "Commercial Project",
  residential: "Residential Project",
  architectural: "Architectural Specification",
  distributor: "Distributor / Dealer Inquiry",
};

const PURPOSE_TO_TYPE: Record<string, InquiryType> = {
  architectural: "architect",
  distributor: "dealer",
};

export default function CollectionInquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", collection: "", purpose: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(123,171,139,0.15)" }}>
          <svg className="w-7 h-7" fill="none" stroke="#4CAF6B" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-[22px] text-[var(--text-primary)] mb-2">Thank You!</h3>
        <p className="text-[14px] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
          Your inquiry has been received. Our design consultants will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitError(false);
        setSubmitting(true);
        const ok = await submitInquiry({
          name: form.name,
          email: form.email,
          phone: form.phone,
          type: PURPOSE_TO_TYPE[form.purpose] || "contact",
          message: [
            form.collection ? `Collection: ${COLLECTION_LABELS[form.collection] || form.collection}` : "",
            form.purpose ? `Purpose: ${PURPOSE_LABELS[form.purpose] || form.purpose}` : "",
            form.message,
          ].filter(Boolean).join("\n"),
        });
        setSubmitting(false);
        if (!ok) {
          setSubmitError(true);
          return;
        }
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Full Name</label>
          <input type="text" placeholder="Your full name" required
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Email Address</label>
          <input type="email" placeholder="you@example.com" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Contact Number</label>
          <input type="tel" placeholder="+91 00000 00000"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors"
            style={{ fontFamily: "var(--font-jakarta)" }} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
            style={{ fontFamily: "var(--font-jakarta)" }}>Select Collection</label>
          <select
            value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors appearance-none cursor-pointer"
            style={{ fontFamily: "var(--font-jakarta)" }}>
            <option value="">Choose a collection</option>
            <option value="sshades">S&apos;Shades Premium</option>
            <option value="thre3">Thre3</option>
            <option value="cool-colour">Cool Colour</option>
            <option value="08mm">Perspective V4</option>
            <option value="thermo">Thermo Laminates</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
          style={{ fontFamily: "var(--font-jakarta)" }}>Enquiry Purpose</label>
        <select
          value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors appearance-none cursor-pointer"
          style={{ fontFamily: "var(--font-jakarta)" }}>
          <option value="">Select purpose</option>
          <option value="commercial">Commercial Project</option>
          <option value="residential">Residential Project</option>
          <option value="architectural">Architectural Specification</option>
          <option value="distributor">Distributor / Dealer Inquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)] mb-2"
          style={{ fontFamily: "var(--font-jakarta)" }}>Message</label>
        <textarea rows={4} placeholder="Tell us about your project…"
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-[var(--color-border-subtle)] bg-white text-[14px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors resize-none"
          style={{ fontFamily: "var(--font-jakarta)" }} />
      </div>

      {submitError && (
        <p className="text-[13px]" style={{ color: "#d64545", fontFamily: "var(--font-jakarta)" }}>
          Something went wrong sending your inquiry. Please try again.
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth disabled={submitting}>
        {submitting ? "Sending…" : "Send Inquiry"}
      </Button>
    </form>
  );
}
