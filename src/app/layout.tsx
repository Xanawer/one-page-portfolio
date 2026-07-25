import "@simple/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

const siteDescription =
  "Full-stack developer portfolio of James Lim Zhong Zhi — projects, experience, and skills in web development, AI, and mobile apps.";

const siteUrl = "https://www.jameslimzz.me";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "James Lim Zhong Zhi",
    url: siteUrl,
    jobTitle: "Full-Stack Developer",
    sameAs: [
      "https://www.linkedin.com/in/Xanawer",
      "https://github.com/Xanawer",
    ],
  },
};

export const metadata: Metadata = {
  title: "James Lim - Portfolio",
  description: siteDescription,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "James Lim - Portfolio",
    description: siteDescription,
    url: siteUrl,
    siteName: "James Lim Portfolio",
    type: "website",
    images: [
      {
        url: "https://www.jameslimzz.me/mushroom_small.png",
        alt: "James Lim Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Lim - Portfolio",
    description: siteDescription,
    images: ["https://www.jameslimzz.me/mushroom_small.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-shell">
        <ClerkProvider>
          <SpeedInsights />
          <Analytics />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
