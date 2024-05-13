import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme-provider";
import { NextAuthProvider } from "@/app/session-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingContextProvider } from "./loading-provider";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/blocks/NavigationEvents";
const googleSans = localFont({
  src: [
    {
      path: "../public/assets/fonts/GoogleSans-Regular_0.ttf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/GoogleSans-Bold-v1.27.ttf",
      weight: "700",
    },
  ],
  variable: "--font-google",
});
export const metadata: Metadata = {
  title: "Cloud community days 2024 | GDG Cloud Kolkata",
  description: "CCD 2024 Website of GDG Cloud Kolkata",
  icons: "./favicon.ico",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${googleSans.className} w-full max-w-screen-2xl mx-auto`}
      >
        {" "}
        <LoadingContextProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Footer />

              <Suspense fallback={null}>
                <NavigationEvents />
              </Suspense>
            </ThemeProvider>
          </NextAuthProvider>
        </LoadingContextProvider>
      </body>
    </html>
  );
}
