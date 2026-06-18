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
  title: "breathCult | Free Breathing Pacer - Box Breathing, 4-7-8, Wim Hof & More",
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
    title: "breathCult | Align Your Natural Hardware",
    description:
      "Join breathCult today. Align your natural hardware. 6 science-backed breathing techniques, free, no app required.",
    siteName: "breathCult",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "breathCult | Align Your Natural Hardware",
    description:
      "Join breathCult today. Align your natural hardware. 6 science-backed breathing techniques, free, no app required.",
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
  name: "breathCult",
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
      <body className="min-h-full flex flex-col">
        {children}
        {/* dh-protect: ownership + copy detection. © 2026 Dylon Hernandez. Kit in /_protection. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `window.__DH_PROTECT__={app:"breathcult pacer",owner:"Dylon Hernandez",entity:"",site:"breathcult.com",allow:["breathcult.vercel.app","breathcult.com"],beacon:"PASTE_YOUR_BEACON_URL",watermark:true};` +
              `;(function(){"use strict";var C=window.__DH_PROTECT__||{},O=C.owner||"Dylon Hernandez",E=C.entity||"",S=C.site||"",AL=Array.isArray(C.allow)?C.allow:[],B=C.beacon||"",WM=C.watermark!==false,A=C.app||document.title||"app",Y=new Date().getFullYear();if(typeof location==="undefined")return;var h=(location.hostname||"").toLowerCase(),L=h===""||h==="localhost"||h==="127.0.0.1"||h==="0.0.0.0"||/\\.local$/.test(h)||location.protocol==="file:";try{console.log("%c "+A+" ","background:#D97757;color:#fff;font-weight:700;border-radius:3px;padding:1px 4px","© "+Y+" "+O+(E?" / "+E:"")+". All rights reserved."+(S?"  "+S:""))}catch(e){}if(L)return;var ok=false;for(var i=0;i<AL.length;i++){var a=String(AL[i]).toLowerCase().replace(/^\\*\\./,"");if(h===a||h.slice(-(a.length+1))==="."+a){ok=true;break}}if(ok)return;try{if(B&&B.indexOf("PASTE_")===-1){var k="__dhp_seen_"+A;if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,"1");var bd=JSON.stringify({app:A,host:h,url:location.href,referrer:document.referrer||"",at:new Date().toISOString()});if(navigator.sendBeacon){try{navigator.sendBeacon(B,bd)}catch(e2){fetch(B,{method:"POST",mode:"no-cors",keepalive:true,body:bd}).catch(function(){})}}else{fetch(B,{method:"POST",mode:"no-cors",keepalive:true,body:bd}).catch(function(){})}}}}catch(e){}try{if(WM&&AL.length>0){var p=function(){if(!document.body||document.querySelector("[data-dh-protect]"))return;var b=document.createElement("div");b.setAttribute("data-dh-protect","1");b.textContent="Unauthorized copy. Original work © "+Y+" "+O+(S?"  ·  "+S:"");b.style.cssText="position:fixed;left:0;right:0;bottom:0;z-index:2147483647;background:#D97757;color:#fff;font:600 13px/1.45 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:11px 16px;text-align:center;letter-spacing:.2px;box-shadow:0 -2px 14px rgba(0,0,0,.28)";document.body.appendChild(b)};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",p);else p()}}catch(e){}})();`
          }}
        />
        <div className="sr-only" aria-hidden="false" suppressHydrationWarning>
          <h1>breathCult - Free Breathing Pacer</h1>
          <p>Free guided breathing exercises with precise timing. 6 science-backed techniques. No app download required. Works on any device.</p>
          <h2>Breathing Techniques</h2>
          <article>
            <h3>Box Breathing</h3>
            <p>Used by Navy SEALs. Equal parts inhale, hold, exhale, hold. Pattern: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Duration: 5 minutes. Best for focus, calm, and stress management.</p>
          </article>
          <article>
            <h3>4-7-8 Breathing</h3>
            <p>Dr. Andrew Weil's technique. The natural tranquilizer. Pattern: Inhale 4s, Hold 7s, Exhale 8s. Duration: 1 minute. Best for sleep and anxiety.</p>
          </article>
          <article>
            <h3>Physiological Sigh</h3>
            <p>Stanford-studied. One breath can change your state. Pattern: Inhale 2s, Sniff 1s, Exhale 6s. Duration: 27 seconds. Best for instant stress relief.</p>
          </article>
          <article>
            <h3>Resonant Breathing</h3>
            <p>5.5 breaths per minute. Where your systems sync up. Pattern: Inhale 5.5s, Exhale 5.5s. Duration: 5 minutes. Best for heart rate variability and coherence.</p>
          </article>
          <article>
            <h3>Wim Hof Method</h3>
            <p>Controlled hyperventilation plus breath holds. Morning activation only. Pattern: 30 Power Breaths, Hold Empty 60s, Recovery Breath 15s. Duration: 7.5 minutes. Best for energy and activation. Safety: Never practice near water, while driving, or standing.</p>
          </article>
          <article>
            <h3>Cyclic Sighing</h3>
            <p>Beat meditation in a Stanford trial. 5 minutes per day. Pattern: Inhale 3s, Sniff 1s, Exhale 8s. Duration: 5 minutes. Best for daily mood boost.</p>
          </article>
          <h2>About breathCult</h2>
          <p>breathCult is a free web-based breathing pacer created by Dylon Hernandez. No app download needed. Open it on any device, pick a science-backed breathing protocol, and start breathing. All techniques are validated against published research from Stanford University, the U.S. military, and peer-reviewed journals.</p>
        </div>
      </body>
    </html>
  );
}
