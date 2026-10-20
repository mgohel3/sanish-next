import type { NextConfig } from "next";
import legacyBlogRedirects from "./src/legacy-blog-redirects.json";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  outputFileTracingExcludes: {
    "/*": ["./public/assets/img/gallery/**/*"],
  },
  async redirects() {
    // 301s from the old PHP site's extension-less /<slug> URLs to /blog/<slug>.
    return [
      ...legacyBlogRedirects,
      // Duplicate home-page addresses -> the one canonical "/" (301).
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
