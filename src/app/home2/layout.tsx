import type { ReactNode } from "react";

export default function Home2Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Fontshare — Clash Display, General Sans, Satoshi */}
      <link rel="preconnect" href="https://api.fontshare.com" />
      <link
        href="https://api.fontshare.com/v2/css2?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600&f[]=satoshi@400,500,700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
