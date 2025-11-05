import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata: Metadata = {
  title: "Bread👍",
  description: "Recipe Sharing +",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights/>
      <body>
        {children}
      </body>
    </html>
  );
}
