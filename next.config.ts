import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being loaded inside an iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Prevent browsers from MIME-sniffing the content type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer info sent to other sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features (no need for camera, mic, or geolocation)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Force HTTPS for 2 years (Vercel serves over HTTPS; ignored on plain HTTP)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  // unsafe-inline is required for Next.js App Router hydration scripts and Framer Motion inline styles.
  // Fonts are served from /_next/static/ (next/font downloads at build time), so no google domains needed.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
