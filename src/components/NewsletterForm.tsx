"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/inquiries";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { getRecaptchaV3Token } from "@/lib/recaptcha";

/** Footer "Stay Connected" box. A submitted email is saved as a lead (CMS > Leads) so the team can follow up. */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const { recaptcha } = useSiteSettings();

  if (state === "done") {
    return (
      <p className="mb-6 text-[13px] text-[var(--text-primary)]" style={{ fontFamily: "var(--font-jakarta)" }}>
        Thank you! You are subscribed.
      </p>
    );
  }

  return (
    <form
      className="mb-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        const token = recaptcha.version === "v3" ? await getRecaptchaV3Token(recaptcha.site_key, "newsletter_subscribe") : null;
        const ok = await submitInquiry({
          name: "Newsletter subscriber",
          email,
          type: "contact",
          message: "Newsletter subscription request from the website footer.",
          source_page: "/newsletter-footer",
          recaptcha_token: token,
        });
        setState(ok ? "done" : "error");
      }}
    >
      <div className="flex rounded-full overflow-hidden border border-[var(--color-border-subtle)] focus-within:border-[var(--accent-blue)] transition-colors">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          style={{ outline: "none" }}
          className="flex-1 min-w-0 bg-white px-5 py-3 text-[12px] text-[var(--text-primary)]"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="text-white px-5 py-3 text-[12px] md:text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors whitespace-nowrap disabled:opacity-60"
          style={{ background: "var(--accent-blue)", fontFamily: "var(--font-heebo)" }}
        >
          {state === "sending" ? "Sending" : "Subscribe"}
        </button>
      </div>
      {state === "error" && (
        <p className="mt-2 text-[12px]" style={{ color: "#d64545", fontFamily: "var(--font-jakarta)" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
