import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Kalam, Heebo } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Portfolio Levi",
  description: "Portfolio created with next, react, and typescript",
  icons: {
    icon: "/icon-logo.svg",
  },
};

const kalam = Kalam({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
});

const heebo = Heebo({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-heebo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${heebo.variable} ${kalam.variable} font-heebo scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className=" flex min-h-screen flex-col ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Toaster />
          <Footer />
        </ThemeProvider>
        <Analytics /> 
      </body>
    </html>
  );
}
