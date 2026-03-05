// ============================================
// FILE: app/layout.tsx
// ============================================

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {

    default: "IDC",
    template: "%s | IDC",
  },
  description: "NZ's best talent in photography, directing and cinematography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Preconnect to CMS origin — saves DNS+TLS handshake time (~200-400ms)
            Must come BEFORE any resource requests to this domain */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_CMS_DOMAIN || ''} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_CMS_DOMAIN || ''} />

        {/* ✅ Preload critical fonts — removes them from the critical rendering chain
            Without preload: HTML → CSS parse → discover font URL → fetch font
            With preload: HTML → immediately start fetching font (parallel with CSS) */}
        <link
          rel="preload"
          href="/fonts/mo4-1.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RemixaTest-Regular-BF649a5c12202eb-2.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/FormaDJRBanner-Medium-Testing-1.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}