import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

export const metadata: Metadata = {
  title: "CLOSER 業績自動倍增 | AI Sales Mastery",
  description: "六大系統，帶走即用。Content Clone, Lead Lens, Offer Engine, Stay-in-Touch, Elite Hunter, Repeat Revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <ProfileProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
