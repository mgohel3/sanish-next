"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { submitInquiry } from "@/lib/inquiries";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", pincode: "", enquire_type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "rgba(123,171,139,0.15)" }}>
          <svg className="w-8 h-8" fill="none" stroke="#4CAF6B" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-[24px] text-[var(--text-primary)] mb-2">Thank You!</h3>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Your inquiry has been received. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
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
        setSubmitted(true);
      }}
    >
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Name</label>
          <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Phone</label>
          <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
        </div>
      </div>

      {/* Row 2: Email + Pin Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Email</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Pin Code</label>
          <input type="text" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
        </div>
      </div>

      {/* Enquire Type */}
      <div className="flex flex-col gap-2 mt-2">
        <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Enquire Type</label>
        <select required value={form.enquire_type} onChange={(e) => setForm({ ...form, enquire_type: e.target.value })}
          className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full appearance-none">
          <option value="" disabled>Select type</option>
          <option value="commercial">Commercial</option>
          <option value="consumer">Consumer</option>
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Message</label>
        <textarea placeholder={"Enter the Product IDs You're Interested In\ne.g.,\nLM-19928\nLM-19920\nLM-19785"} rows={5}
          value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full resize-none" />
      </div>

      {submitError && (
        <p className="text-[13px]" style={{ color: "#d64545" }}>
          Something went wrong sending your inquiry. Please try again.
        </p>
      )}

      <Button type="submit" variant="primary" fullWidth className="mt-8" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Inquiry"}
      </Button>
    </form>
  );
}
