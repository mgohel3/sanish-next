import type { Metadata } from "next";
import { Bodoni_Moda, Heebo, Poppins } from "next/font/google";
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

const poppins = Poppins({
  variable: "--font-poppins-loaded",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sanish Laminates | Premium Decorative Surfaces",
  description:
    "Crafting elegant laminate and decorative surface solutions for architects, interior designers, commercial projects, and modern living spaces.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, navData] = await Promise.all([
    getSiteSettings(),
    getMegaNavData(),
  ]);

  return (
    <html
      lang="en"
      className={`${heebo.variable} ${vogueFallback.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteSettingsProvider settings={siteSettings} nav={navData}>
          <Preloader />
          <CustomCursor />
          <Popup />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <WhatsAppButton />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
