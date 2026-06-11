"use client";

import { useEffect, useState } from "react";
import { useSiteSettings } from "@/components/SiteSettingsProvider";

export default function WhatsAppButton() {
  const settings = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const waNumber   = settings.social.whatsapp.replace(/\D/g, "");
  const phoneClean = settings.phone_primary.replace(/\s/g, "");

  const cls = (delay: string) =>
    `transition-all duration-300 ${delay} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9000] flex flex-col items-center gap-3">
      {/* Phone call button */}
      <a
        href={`tel:${phoneClean}`}
        className={`flex items-center justify-center w-[48px] h-[48px] text-white rounded-full shadow-[0_8px_22px_rgba(91,141,200,0.45)] hover:scale-110 transition-all duration-300 ${cls("delay-75")}`}
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
        className={`flex items-center justify-center w-[54px] h-[54px] bg-[#25D366] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_12px_30px_rgba(37,211,102,0.5)] transition-all duration-300 ${cls("delay-0")}`}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
