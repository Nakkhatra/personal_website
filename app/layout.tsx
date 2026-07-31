import type { Metadata } from "next";
import { Instrument_Sans, Sora, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CursorGlow from "@/components/ui/CursorGlow";
import BackgroundEffects from "@/components/ui/BackgroundEffects";
import FilmGrain from "@/components/ui/FilmGrain";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { activeTheme, buildCssVars } from "@/lib/theme";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400", "500", "600", "700"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Shahrin Nakkhatra — Data Scientist & AI Engineer",
    template: "%s — Shahrin Nakkhatra",
  },
  description:
    "Data Scientist and AI Engineer focused on building practical, end-to-end AI systems, including RAG and agentic workflows.",
  metadataBase: new URL("https://nakkhatra.dev"),
  openGraph: {
    title: "Shahrin Nakkhatra — Data Scientist & AI Engineer",
    description:
      "Data Scientist and AI Engineer focused on building practical, end-to-end AI systems.",
    url: "https://nakkhatra.dev",
    siteName: "Shahrin Nakkhatra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahrin Nakkhatra — Data Scientist & AI Engineer",
    description:
      "Data Scientist and AI Engineer focused on building practical, end-to-end AI systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${sora.variable} ${jetbrains.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: buildCssVars(activeTheme) }} />
      </head>
      <body className="flex flex-col min-h-screen relative">
        <ThemeProvider>
          <BackgroundEffects />
          <FilmGrain />
          <ScrollProgressBar />
          <CursorGlow />
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
