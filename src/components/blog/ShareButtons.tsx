"use client";

import { useEffect, useState } from "react";

/**
 * Social share row for the article sidebar. Reads the live page URL on the
 * client so it works on any host (localhost, staging, production).
 */
export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Facebook", color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: <path d="M24 12.07C24 5.45 18.63.07 12 .07S0 5.45 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.39H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.39C19.61 23.03 24 18.06 24 12.07z" />,
    },
    {
      label: "WhatsApp", color: "#25D366",
      href: `https://wa.me/?text=${t}%20${u}`,
      icon: <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z" />,
    },
    {
      label: "X", color: "#111111",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z" />,
    },
    {
      label: "LinkedIn", color: "#0A66C2",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />,
    },
    {
      label: "Email", color: "#85addc",
      href: `mailto:?subject=${t}&body=${u}`,
      icon: <path d="M2 5.5A1.5 1.5 0 013.5 4h17A1.5 1.5 0 0122 5.5v13a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-13zM4.2 6L12 11.6 19.8 6H4.2zM20 7.9l-8 5.7-8-5.7V18h16V7.9z" />,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--color-border-subtle)" }}
    >
      <p className="text-[12px] md:text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#6B6B80" }}>
        Share
      </p>
      <div className="flex flex-wrap gap-2.5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${l.label}`}
            title={l.label}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(30,30,46,0.14)", color: "#4A4A5A", backgroundColor: "#fff" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = l.color;
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = l.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#4A4A5A";
              e.currentTarget.style.borderColor = "rgba(30,30,46,0.14)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {l.icon}
            </svg>
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          title={copied ? "Copied!" : "Copy link"}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ border: "1px solid rgba(30,30,46,0.14)", color: copied ? "#2e9e5b" : "#4A4A5A", backgroundColor: "#fff" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {copied ? (
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
