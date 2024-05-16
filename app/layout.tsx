import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "./theme-provider";
import { NextAuthProvider } from "@/app/session-provider";
import Footer from "@/components/Footer";
import { LoadingContextProvider } from "./loading-provider";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/blocks/NavigationEvents";
import { Toaster } from "@/components/ui/toaster";
import siteConfig from "@/public/assets/content/site-config.json";
import NavbarSSR from "@/components/navigation/NavbarSSR";
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
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },

  description: siteConfig.description,
  authors: siteConfig.authors,

  icons: "./favicon.ico",
  openGraph: {
    title: siteConfig.title,
    images: [`${siteConfig.ogImage ?? ""}`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    images: [`${siteConfig.ogImage ?? ""}`],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${googleSans.className} w-full max-w-screen-4xl mx-auto scrollbar-hide`}
      >
        {" "}
        <LoadingContextProvider>
          <NextAuthProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              disableTransitionOnChange
            >
              <NavbarSSR />
              {children}
              <Footer />
              <Toaster />
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
