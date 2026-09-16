/**
 * Loads Google reCAPTCHA v2/v3 on demand and fetches tokens. Version + site
 * key come from the CMS (`SiteSettings.recaptcha`, see `siteSettings.ts`) —
 * nothing here is hard-coded.
 */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
        }
      ) => number;
    };
  }
}

const scriptCache = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const cached = scriptCache.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"));
    document.head.appendChild(script);
  });
  scriptCache.set(src, promise);
  return promise;
}

/** Invisible v3 — fetches a fresh token for the given action, or null on failure. */
export async function getRecaptchaV3Token(siteKey: string, action: string): Promise<string | null> {
  if (!siteKey || typeof window === "undefined") return null;
  try {
    await loadScript(`https://www.google.com/recaptcha/api.js?render=${siteKey}`);
    return await new Promise<string | null>((resolve) => {
      window.grecaptcha!.ready(() => {
        window.grecaptcha!
          .execute(siteKey, { action })
          .then(resolve)
          .catch(() => resolve(null));
      });
    });
  } catch {
    return null;
  }
}

/** v2 checkbox — loads the widget script; the widget itself renders via RecaptchaCheckbox. */
export function loadRecaptchaV2Script(): Promise<void> {
  return loadScript("https://www.google.com/recaptcha/api.js");
}
