import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "./components/AppThemeProvider";
import { metadata as metadataConstants } from "@/Constants/metadata";
import { PWAErrorBoundary } from "./components/PWAErrorBoundary";
import GoogleAnalytics from "./components/GoogleAnalytics";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = metadataConstants;


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Macintosh OS" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      </head>
      <AppThemeProvider className={`${poppins.variable} antialiased select-none`}>
        <PWAErrorBoundary>
          <svg style={{ display: "none" }}>

            <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          {children}
        </PWAErrorBoundary>
      </AppThemeProvider>
    </html>
  );
}
