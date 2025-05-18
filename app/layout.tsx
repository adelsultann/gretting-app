import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "تهنئتي",
  description: " أنشىءبطاقات تهنئة جميلة ومخصصة للمناسبات الخاصة مثل عيد الفطر، عيد الأضحى وغيرها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <GoogleTagManager gtmId='GTM-K3TZTFN4'
       />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
          {children}
       
      </body>
    </html>
  );
}
