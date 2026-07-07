"use client";

export default function InquireButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-popup"))}
      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[13px] font-semibold tracking-[0.04em] text-white transition-all duration-300 hover:-translate-y-[2px]"
      style={{ background: "#85addc", boxShadow: "0 8px 24px rgba(133,173,220,0.38)", fontFamily: "var(--font-jakarta)" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
      Inquire Now
    </button>
  );
}
