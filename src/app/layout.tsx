import type { Metadata } from "next";
import { Dancing_Script, Outfit } from "next/font/google";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryClientProvider from "@/app/_providers/rqc-provider";
import { checkUser } from "@/lib/check-user";
import { ThemeProvider } from "@/app/_providers/theme-provider";
import Header from "@/app/_components/core/header";
import { Toaster } from "@/app/_components/ui/toaster";
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_META_DESRIPTION,
  SITE_NAME,
} from "@/app/_constants/seo";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import StoreInitializer from "@/app/_providers/store-initializer";
import Footer from "@/app/_components/core/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { frFR } from "@clerk/localizations";
import { GITHUB_URL } from "@/app/_constants/app";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_META_DESRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  keywords: [
    "escalade",
    "bloc",
    "voie",
    "falaise",
    "spots",
    "discussions",
    "blog",
    "communauté",
    "vertical sync",
  ],
  authors: [{ name: "Jordan BIESMANS", url: GITHUB_URL }],
  creator: "Jordan BIESMANS",
  publisher: "Vertical Sync",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_META_DESRIPTION,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_META_DESRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
    // creator: "@iotactile",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "votre-code-verification-google",
  // },
};

const mainFont = Outfit({ subsets: ["latin"] });
export const signatureFont = Dancing_Script({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkUser();

  return (
    <html
      lang="en"
      className="scroll-smooth bg-background"
      suppressHydrationWarning
    >
      <body className={cn(mainFont.className)}>
        <NextTopLoader
          color="hsl(124, 30%, 35%)"
          showSpinner={false}
          height={3}
        />

        <ClerkProvider
          signInUrl="/auth/sign-in"
          signUpUrl="/auth/sign-up"
          localization={frFR}
        >
          <ReactQueryClientProvider>
            <NuqsAdapter>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <StoreInitializer />

                <Header />

                <main className="min-h-screen-minus-header">{children}</main>

                <Footer />

                <Toaster />
              </ThemeProvider>
            </NuqsAdapter>
          </ReactQueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
