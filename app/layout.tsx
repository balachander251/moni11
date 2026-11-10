import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito, Kalam } from "next/font/google";
import { content } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTrail from "@/components/CursorTrail";
import "./globals.css";

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const handwriting = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
  display: "swap",
});

const title = `Happy Birthday, ${content.partnerName}`;
const description = "A little digital gift, made just for you 💛";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://birthday-jani.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7ea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${handwriting.variable}`}>
        <SmoothScroll />
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
