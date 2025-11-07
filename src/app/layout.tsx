import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = "https://your-domain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Madan Y · Full Stack Developer",
    template: "%s · Madan Y",
  },
  description:
    "Building modern, scalable web applications and data solutions with passion and creativity.",
  keywords: [
    "full stack developer",
    "web development",
    "data science",
    "Next.js",
    "React",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Madan Y · Full Stack Developer",
    title: "Madan Y · Full Stack Developer",
    description:
      "Building modern, scalable web applications and data solutions with passion and creativity.",
    images: [
      {
        url: `${siteUrl}/og.svg`,
        width: 1200,
        height: 630,
        alt: "Alex Morgan – Creative Technologist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madan Y · Full Stack Developer",
    description:
      "Building modern, scalable web applications and data solutions with passion and creativity.",
    images: [`${siteUrl}/og.svg`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} font-body antialiased bg-grid`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
