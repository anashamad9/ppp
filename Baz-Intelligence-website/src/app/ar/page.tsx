import type { Metadata } from "next";
import Home from "../(marketing)/(home)/home-page";

const siteName = "أتمت تيكنولوجيس";
const siteTitle = "أتمت تيكنولوجيس";
const siteDescription =
  "أتمت تيكنولوجيس هو مختبر تقنيات ذكاء اصطناعي يصمم ويدرّب وينشر أنظمة ذكاء اصطناعي متقدمة للشركات والناشئين والمؤسسات.";
const previewImage = "/Preview arab.png";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/ar",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "ar_JO",
    alternateLocale: ["en_US"],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "معاينة أتمت تيكنولوجيس العربية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
};

export default function ArabicPage() {
  return <Home initialLanguage="ar" showHeroBrandBlock={false} />;
}
