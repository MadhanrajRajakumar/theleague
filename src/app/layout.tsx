import type { Metadata } from "next";
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
  title: "THE LEAGUE | Identity Engine",
  description: "Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives.",
  openGraph: {
    title: "THE LEAGUE | Identity Engine",
    description: "Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives.",
    url: "https://theleague.app",
    siteName: "THE LEAGUE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE LEAGUE | Identity Engine",
    description: "Discover your archetype, uncover your biggest limitation, and join ambitious people building stronger lives.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#030303] text-[#f5f5f7] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
