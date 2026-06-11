"use client";

import { createContext, useContext } from "react";
import { SiteSettings, DEFAULT_SITE_SETTINGS } from "@/lib/siteSettings";
import { MegaNavData, DEFAULT_NAV, DEFAULT_CATEGORIES, DEFAULT_COLLECTIONS } from "@/lib/navData";

interface AppContextValue {
  settings: SiteSettings;
  nav: MegaNavData;
}

const DEFAULT_NAV_DATA: MegaNavData = {
  navLinks: {
    main: DEFAULT_NAV.main,
    topbar: DEFAULT_NAV.topbar,
    mega_quick: DEFAULT_NAV.mega_quick,
    footer_company: [],
  },
  categories: DEFAULT_CATEGORIES,
  collections: DEFAULT_COLLECTIONS,
};

const AppContext = createContext<AppContextValue>({
  settings: DEFAULT_SITE_SETTINGS,
  nav: DEFAULT_NAV_DATA,
});

export function SiteSettingsProvider({
  settings,
  nav,
  children,
}: {
  settings: SiteSettings;
  nav: MegaNavData;
  children: React.ReactNode;
}) {
  return (
    <AppContext.Provider value={{ settings, nav }}>
      {children}
    </AppContext.Provider>
  );
}

export function useSiteSettings(): SiteSettings {
  return useContext(AppContext).settings;
}

export function useNavData(): MegaNavData {
  return useContext(AppContext).nav;
}
