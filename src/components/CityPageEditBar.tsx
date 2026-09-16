"use client";

/** Small "Edit Page" affordance on published city pages — mirrors the classic
 *  WP admin-bar pattern. Links straight to this CityPage's dashboard edit
 *  form; harmless to show to anyone since the dashboard route itself is
 *  login-gated (SEOManagerRequiredMixin), same as every other CMS edit link. */
export default function CityPageEditBar({ cmsBaseUrl, pageId }: { cmsBaseUrl: string; pageId: number }) {
  return (
    <a
      href={`${cmsBaseUrl}/cms/city-pages/${pageId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[9000] flex items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-semibold text-white shadow-[0_8px_22px_rgba(30,30,46,0.28)] transition-transform hover:scale-105"
      style={{ backgroundColor: "#24262b" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
      Edit Page
    </a>
  );
}
