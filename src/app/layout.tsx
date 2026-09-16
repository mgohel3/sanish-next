import type { Metadata } from "next";
import Script from "next/script";
import { Bodoni_Moda, Heebo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import Popup from "@/components/Popup";
import { SiteSettingsProvider } from "@/components/SiteSettingsProvider";
import { getSiteSettings } from "@/lib/siteSettings";
import { getMegaNavData } from "@/lib/navData";

const heebo = Heebo({
  variable: "--font-heebo-loaded",
  subsets: ["latin"],
  display: "swap",
});

const vogueFallback = Bodoni_Moda({
  variable: "--font-vogue-fallback",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const gscVerification = siteSettings.analytics.gsc_verification;

  return {
    title: "Sanish Laminates | Premium Decorative Surfaces",
    description:
      "Crafting elegant laminate and decorative surface solutions for architects, interior designers, commercial projects, and modern living spaces.",
    ...(gscVerification && { verification: { google: gscVerification } }),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, navData] = await Promise.all([
    getSiteSettings(),
    getMegaNavData(),
  ]);
  const { ga4_id, gtm_id, fb_pixel_id, clarity_id } = siteSettings.analytics;

  return (
    <html
      lang="en"
      className={`${heebo.variable} ${vogueFallback.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {gtm_id && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm_id}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SiteSettingsProvider settings={siteSettings} nav={navData}>
          <Preloader />
          <CustomCursor />
          <Popup />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <WhatsAppButton />
        </SiteSettingsProvider>

        {gtm_id && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm_id}');`}
          </Script>
        )}

        {ga4_id && !gtm_id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4_id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${ga4_id}');`}
            </Script>
          </>
        )}

        {clarity_id && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarity_id}");`}
          </Script>
        )}

        {fb_pixel_id && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${fb_pixel_id}');fbq('track', 'PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
}
