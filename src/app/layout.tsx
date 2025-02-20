import "./globals.css";

import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import type { Metadata } from "next";

import Header from "@/app/_navigation/header";
import Sidebar from "@/app/_navigation/sidebar/components/sidebar";
import ReactQueryProvider from "@/app/_providers/react-query/react-query-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Road to Next App",
  description: "My Road to Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#12100F] antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <Header />
              <div className='flex h-screen border-collapse overflow-hidden'>
                <Sidebar />
                <main className='bg-[ flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden bg-[#12100F] px-8 py-24'>
                  {children}
                </main>
              </div>
              <Toaster position='top-right' expand richColors />
            </ReactQueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
