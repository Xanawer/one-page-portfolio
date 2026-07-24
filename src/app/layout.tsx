import "@simple/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "James Lim - Portfolio",
  description:
    "Full-stack developer portfolio of James Lim Zhong Zhi — projects, experience, and skills in web development, AI, and mobile apps.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "James Lim - Portfolio",
    description:
      "Full-stack developer portfolio of James Lim Zhong Zhi — projects, experience, and skills in web development, AI, and mobile apps.",
    url: "https://www.jameslimzz.me",
    siteName: "James Lim Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="overflow-clip">
        <ClerkProvider>
          <SpeedInsights />
          <Analytics />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
