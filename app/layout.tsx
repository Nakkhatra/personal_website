import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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
      className={`${inter.variable} ${sora.variable} ${jetbrains.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
