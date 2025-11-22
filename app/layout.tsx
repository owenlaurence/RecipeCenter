import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from "./components/AuthProvider";
import { AuthenticationResponse, getAuthenticatedUser } from "./actions";
import { Analytics } from '@vercel/analytics/next'


export const metadata: Metadata = {
  title: "Bread👍",
  description: "Recipe Sharing +",
};

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session: AuthenticationResponse | undefined  = await getAuthenticatedUser()

  return (
    <html lang="en">
      <Analytics/>
      <SpeedInsights />
      <body>
        <AuthProvider initialSession={session}>
          {modal}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
