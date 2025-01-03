import type { Metadata } from "next";
import "../styles/globals.css";
import { Vazirmatn } from "next/font/google";
import React from "react";
import Providers from "../providers/providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuBarWrapper from "@/components/MenuBarWrapper";

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-roboto',
// });

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TA Connect",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${vazirmatn.className} antialiased`}>
        <Providers>
          <MenuBarWrapper />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
