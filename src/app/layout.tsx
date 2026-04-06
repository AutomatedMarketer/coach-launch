import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CoachHelper } from "@/components/layout/CoachHelper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coachlaunch.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Coach Launch — AI-Powered Marketing for Coaching Businesses",
    template: "%s | Coach Launch",
  },
  description:
    "Launch your coaching business in minutes. Answer a short questionnaire and let AI generate your complete marketing package — website copy, emails, social posts, ad copy, and more.",
  keywords: [
    "coaching business launch",
    "AI marketing for coaches",
    "coaching marketing package",
    "AI copywriting for coaches",
    "coaching business marketing",
    "launch coaching business",
    "coaching content generator",
    "marketing automation for coaches",
  ],
  authors: [{ name: "Steve Krebs" }],
  creator: "Steve Krebs",
  publisher: "Coach Launch",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Coach Launch",
    title: "Coach Launch — AI-Powered Marketing for Coaching Businesses",
    description:
      "Answer a short questionnaire and let AI generate your complete coaching marketing package — website copy, emails, social posts, ad copy, and more. Ready to publish from day one.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coach Launch — AI-Powered Marketing for Coaching Businesses",
    description:
      "Launch your coaching business in minutes with AI-generated marketing. Website copy, emails, social posts, and more — all from one questionnaire.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0f1e" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CoachHelper />
      </body>
    </html>
  );
}
