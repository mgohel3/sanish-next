"use client";

import { useEffect, useRef } from "react";
import { loadRecaptchaV2Script } from "@/lib/recaptcha";

/** Renders the visible "I'm not a robot" checkbox for reCAPTCHA v2. */
export default function RecaptchaCheckbox({
  siteKey,
  onVerify,
}: {
  siteKey: string;
  onVerify: (token: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    loadRecaptchaV2Script().then(() => {
      if (cancelled || rendered.current || !containerRef.current || !window.grecaptcha) return;
      rendered.current = true;
      window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onVerify(token),
        "expired-callback": () => onVerify(null),
      });
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey]);

  if (!siteKey) return null;
  return <div ref={containerRef} className="my-1" />;
}
