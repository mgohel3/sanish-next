import type { NextConfig } from "next";
import legacyBlogRedirects from "./src/legacy-blog-redirects.json";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  outputFileTracingExcludes: {
    "/*": ["./public/assets/img/gallery/**/*"],
  },
  async redirects() {
    // 301s from the old PHP site's extension-less /<slug> URLs to /blog/<slug>.
    return legacyBlogRedirects;
  },
};

export default nextConfig;
