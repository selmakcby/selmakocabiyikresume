import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selma Kocabıyık - Financial Data Analyst Application | Adyen",
  description: "AI & Data Engineer application for Adyen's Merchant Finance & Treasury team. Specializing in LLMs, NLP, RAG Systems and Business Automation.",
  keywords: "Adyen, Financial Data Analyst, AI Engineer, Data Science, Machine Learning, Amsterdam, Fintech",
  authors: [{ name: "Selma Kocabıyık" }],
  openGraph: {
    title: "Selma Kocabıyık - Financial Data Analyst Application",
    description: "AI & Data Engineer application for Adyen's Merchant Finance & Treasury team",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b border-black/10 dark:border-white/15">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-6">
            <Link href="/" className="font-medium">Home</Link>
            <Link href="/about" className="font-medium">About</Link>
            <Link href="/cv" className="font-medium">CV</Link>
            <Link href="/motivation" className="font-medium">Motivation</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
