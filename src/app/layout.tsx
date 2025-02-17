import type { Metadata } from "next";
import { Dancing_Script, Outfit } from "next/font/google";
import "@/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryClientProvider from "@/app/_providers/rqc-provider";
import { checkUser } from "@/lib/check-user";
import { ThemeProvider } from "@/app/_providers/theme-provider";
import Header from "@/app/_components/core/header";
import { Toaster } from "@/app/_components/ui/toaster";
import { SITE_META_DESRIPTION, SITE_NAME } from "@/app/_constants/seo";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import StoreInitializer from "@/app/_providers/store-initializer";
import Footer from "@/app/_components/core/footer";
export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_META_DESRIPTION,
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

        <ClerkProvider signInUrl="/auth/sign-in" signUpUrl="/auth/sign-up">
          <ReactQueryClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <StoreInitializer />

              <Header />

              <main>{children}</main>

              <Footer />

              <Toaster />
            </ThemeProvider>
          </ReactQueryClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
