import type { Metadata } from "next";
import Home from "../(marketing)/(home)/home-page";

const siteName = "Atmet Technologies";
const siteTitle = "Atmet Technologies";
const siteDescription =
  "Atmet Technologies is an AI Research & Technologies Lab that designs, trains, and deploys advanced AI systems for startups, businesses, and teams.";
const previewImage = "/Preview Eng.png";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/home",
    languages: {
      en: "/home",
      ar: "/ar",
      "x-default": "/home",
    },
  },
  openGraph: {
    type: "website",
    url: "/home",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["ar_JO"],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Atmet Technologies English preview",
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

export default function HomePage() {
  return <Home initialLanguage="en" showHeroBrandBlock={false} />;
}
