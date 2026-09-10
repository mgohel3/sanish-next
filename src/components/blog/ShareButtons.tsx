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
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      icon: (
        <path d="M13.5 9H15V6.5h-1.9C11 6.5 10 7.8 10 9.6V11H8.5v2.5H10V20h2.7v-6.5h1.9l.4-2.5h-2.3V9.9c0-.6.2-.9.9-.9z" />
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${t}%20${u}`,
      icon: (
        <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3zm0 2a7 7 0 016 10.6l.2.3-.6 2.2-2.3-.6-.3-.2A7 7 0 1112 5zm-2.6 3c-.2 0-.5 0-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3.1 4.9 4.2 2.4.9 2.9.7 3.4.7.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3l-.9-.4-1.4-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.7-1.6c-.1-.4-.3-.4-.5-.4z" />
      ),
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      icon: <path d="M17.5 4h2.4l-5.3 6 6.2 8.2h-4.9l-3.8-5-4.4 5H3l5.6-6.4L2.7 4h5l3.4 4.6L15.4 4h2.1zm-.9 12.8h1.3L9.3 5.4H7.9l8.7 11.4z" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      icon: (
        <path d="M6.5 8.3H4v11h2.5v-11zM5.2 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM20 19.3v-6c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V8.3H10.4c0 .7 0 11 0 11h2.5v-6.1c0-.3 0-.7.1-.9.3-.7.9-1.4 2-1.4 1.4 0 2 1.1 2 2.7v5.7H20z" />
      ),
    },
    {
      label: "Email",
      href: `mailto:?subject=${t}&body=${u}`,
      icon: (
        <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm1.4 2L12 12l6.6-5H5.4zM19 8.3l-7 5.3-7-5.3V17h14V8.3z" />
      ),
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
      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: "#6B6B80" }}>
        Share
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${l.label}`}
            title={l.label}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(30,30,46,0.14)", color: "#4A4A5A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#85addc";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#85addc";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#4A4A5A";
              e.currentTarget.style.borderColor = "rgba(30,30,46,0.14)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              {l.icon}
            </svg>
          </a>
        ))}
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          title={copied ? "Copied!" : "Copy link"}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ border: "1px solid rgba(30,30,46,0.14)", color: copied ? "#2e9e5b" : "#4A4A5A" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
