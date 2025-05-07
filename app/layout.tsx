import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "./components/AppThemeProvider";
import { metadata as metadataConstants } from "@/Constants/metadata";

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
        <AppThemeProvider className={`${poppins.variable} antialiased`}>
          {children}
        </AppThemeProvider>
    </html>
  );
}
