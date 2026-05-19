import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "breathcult | Free Breathing Pacer - Box Breathing, 4-7-8, Wim Hof & More",
  description:
    "Free guided breathing exercises with precise timing. 6 science-backed techniques: box breathing, 4-7-8, physiological sigh, Wim Hof method, resonant breathing, and cyclic sighing. No app download required. Works on any device.",
  keywords: [
    "breathing exercises",
    "box breathing",
    "4-7-8 breathing",
    "Wim Hof breathing",
    "physiological sigh",
    "resonant breathing",
    "cyclic sighing",
    "breathwork",
    "breathing pacer",
    "guided breathing",
    "free breathing app",
    "breath timer",
    "stress relief breathing",
    "sleep breathing technique",
  ],
  openGraph: {
    title: "breathcult | Free Breathing Pacer",
    description:
      "6 science-backed breathing techniques with precise timing. Box breathing, 4-7-8, physiological sigh, Wim Hof, resonant, and cyclic sighing. Free, no app required.",
    siteName: "breathcult",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "breathcult | Free Breathing Pacer",
    description:
      "6 science-backed breathing techniques with precise timing. Free, no app required.",
  },
  alternates: {
    canonical: "https://breathcult.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "breathcult",
  url: "https://breathcult.com",
  description:
    "Free guided breathing pacer with 6 science-backed techniques: box breathing, 4-7-8, physiological sigh, Wim Hof method, resonant breathing, and cyclic sighing.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Box Breathing: 4-4-4-4 pattern used by Navy SEALs for focus and calm",
    "4-7-8 Breathing: Dr. Andrew Weil's natural tranquilizer for sleep",
    "Physiological Sigh: Stanford-studied double inhale for instant stress relief",
    "Resonant Breathing: 5.5 breaths per minute for HRV and coherence",
    "Wim Hof Method: Controlled hyperventilation with breath holds for energy",
    "Cyclic Sighing: Beat meditation in a Stanford trial, 5 minutes per day",
  ],
  creator: {
    "@type": "Person",
    name: "Dylon Hernandez",
    url: "https://instagram.com/dylonhernandez",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is box breathing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Box breathing is a 4-4-4-4 pattern: inhale 4 seconds, hold 4 seconds, exhale 4 seconds, hold 4 seconds. Used by Navy SEALs for focus and calm under pressure.",
      },
    },
    {
      "@type": "Question",
      name: "What is the 4-7-8 breathing technique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 4-7-8 technique was developed by Dr. Andrew Weil. Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. It acts as a natural tranquilizer for the nervous system and helps with sleep.",
      },
    },
    {
      "@type": "Question",
      name: "What is a physiological sigh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A physiological sigh is a double inhale followed by a long exhale: inhale 2 seconds, sniff 1 second, exhale 6 seconds. Studied at Stanford, it can shift your nervous system state in a single breath.",
      },
    },
    {
      "@type": "Question",
      name: "What is cyclic sighing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cyclic sighing repeats the physiological sigh pattern (inhale 3s, sniff 1s, exhale 8s) for about 5 minutes. A Stanford study found it improved mood more effectively than meditation.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Wim Hof breathing method safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Wim Hof method involves controlled hyperventilation and should only be practiced sitting or lying down, never near water or while driving. It is not recommended for people with epilepsy, pregnancy, seizure history, or serious cardiovascular conditions.",
      },
    },
    {
      "@type": "Question",
      name: "What is resonant breathing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Resonant breathing is breathing at 5.5 breaths per minute (inhale 5.5 seconds, exhale 5.5 seconds). At this rate, your heart, lungs, and blood pressure synchronize, maximizing heart rate variability.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
