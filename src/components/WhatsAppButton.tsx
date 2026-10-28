"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const settings = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false); // phone/tablet speed-dial
  const [snd, setSnd] = useState<{ available: boolean; playing: boolean }>({ available: false, playing: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Site sound state is published by SoundToggle; the switch is offered here on phones/tablets
  useEffect(() => {
    const read = () => {
      const s = (window as unknown as { __sanishSound?: { available: boolean; playing: boolean } }).__sanishSound;
      if (s) setSnd({ available: s.available, playing: s.playing });
    };
    read();
    window.addEventListener("sanish-sound-state", read);
    return () => window.removeEventListener("sanish-sound-state", read);
  }, []);

  const waNumber   = settings.social.whatsapp.replace(/\D/g, "");
  const phoneClean = settings.phone_primary.replace(/\s/g, "");

  const btnCls = (delay: string) =>
    `transition-all duration-300 ${delay} ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  if (pathname?.startsWith("/cms-preview")) return null;

  return (
    <>
    <div className="hidden lg:flex fixed bottom-8 right-8 z-[900] flex-col items-center gap-3">
      {/* Phone call button */}
      <a
        href={`tel:${phoneClean}`}
        className={`flex items-center justify-center w-[48px] h-[48px] text-white rounded-full shadow-[0_8px_22px_rgba(91,141,200,0.45)] hover:scale-110 ${btnCls("delay-75")}`}
        style={{ backgroundColor: "#5B8DC8" }}
        aria-label="Call us"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
        </svg>
      </a>

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-pop relative flex items-center justify-center w-[54px] h-[54px] bg-[#25D366] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_12px_30px_rgba(37,211,102,0.5)] ${btnCls("delay-0")}`}
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-pop-ring" aria-hidden="true" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
      <style jsx>{`
        .whatsapp-pop {
          animation: whatsappSoftPop 2.35s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
          overflow: visible;
        }

        .whatsapp-pop-ring {
          position: absolute;
          inset: -7px;
          border: 1.5px solid rgba(37, 211, 102, 0.45);
          border-radius: 999px;
          box-shadow: 0 0 26px rgba(37, 211, 102, 0.24);
          animation: whatsappRing 2.35s ease-out infinite;
          pointer-events: none;
        }

        @keyframes whatsappSoftPop {
          0%, 100% {
            transform: scale(1);
          }
          12% {
            transform: scale(1.08);
          }
          22% {
            transform: scale(0.98);
          }
          34% {
            transform: scale(1.03);
          }
          48% {
            transform: scale(1);
          }
        }

        @keyframes whatsappRing {
          0% {
            opacity: 0;
            transform: scale(0.78);
          }
          12% {
            opacity: 0.72;
          }
          68%, 100% {
            opacity: 0;
            transform: scale(1.32);
          }
        }
      `}</style>
    </div>
    {/* Phones + tablets: one small button that opens Call / WhatsApp, so two big round buttons don't sit on the content */}
    {open && <button type="button" aria-label="Close contact options" className="lg:hidden fixed inset-0 z-[899] cursor-default" onClick={() => setOpen(false)} />}
    <div className={`lg:hidden fixed bottom-4 right-4 z-[900] pointer-events-none flex flex-col items-end gap-2 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`flex flex-col items-end gap-2 transition-all duration-200 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}>
        {snd.available && (
          <button type="button" onClick={() => window.dispatchEvent(new Event("sanish-sound-toggle"))}
            className="flex items-center gap-2 h-10 pl-3 pr-4 rounded-full text-white text-[13px] font-medium shadow-lg" style={{ backgroundColor: "#1E1E2E" }}
            aria-label={snd.playing ? "Turn website sound off" : "Turn website sound on"}>
            <span aria-hidden="true" className="inline-flex items-end gap-[2px] w-5 h-4 justify-center">
              {[0, 0.2, 0.4].map((d) => (
                <span key={d} style={{ width: 3, height: "100%", background: "currentColor", borderRadius: 2, transformOrigin: "bottom", transform: snd.playing ? undefined : "scaleY(.3)", animation: snd.playing ? `snd-bar 1s ease-in-out ${d}s infinite` : "none" }} />
              ))}
            </span>
            {snd.playing ? "Sound on" : "Sound off"}
          </button>
        )}
        <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
          className="flex items-center gap-2 h-10 pl-3 pr-4 rounded-full text-white text-[13px] font-medium shadow-lg" style={{ backgroundColor: "#25D366" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          WhatsApp
        </a>
        <a href={`tel:${phoneClean}`} onClick={() => setOpen(false)}
          className="flex items-center gap-2 h-10 pl-3 pr-4 rounded-full text-white text-[13px] font-medium shadow-lg" style={{ backgroundColor: "#5B8DC8" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
          Call us
        </a>
      </div>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close contact options" : "Contact us"}
        className="pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full text-white shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-colors"
        style={{ backgroundColor: open ? "#1E1E2E" : "#AC8CC0" }}>
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-5 h-5"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" /><path d="M12 11v5.5" /><circle cx="12" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
          </svg>
        )}
      </button>
    </div>
    </>
  );
}
