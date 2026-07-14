"use client";

export default function PopupTrigger() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-inquiry-popup"))}
      className="btn-pill btn-pill-primary"
    >
      Open Inquiry Popup
    </button>
  );
}
