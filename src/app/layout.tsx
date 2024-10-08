import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { QueryClientComponent } from "@/components/queryclient/QueryClientComponent";
import AuthComponent from "@/components/auth/AuthComponent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {SDKConfig} from "@/components/sdk-config/config";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "shadcn/ui sidebar",
  description:
    "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "shadcn/ui sidebar",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "shadcn/ui sidebar",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthComponent>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryClientComponent>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientComponent>
        </ThemeProvider>
        <SDKConfig />
      </body>
      </AuthComponent>
    </html>
  );
}
