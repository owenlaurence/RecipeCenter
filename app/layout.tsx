import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider, BASession } from "./components/AuthProvider";
import { getAuthenticatedUser } from "./actions";


export const metadata: Metadata = {
  title: "Bread👍",
  description: "Recipe Sharing +",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session : BASession | null = await getAuthenticatedUser()

  return (
    <html lang="en">
      <SpeedInsights/>
      <body>
        <AuthProvider initialSession={session}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
