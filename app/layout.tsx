import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/common";
import OpenProvider from "@/provider/open-provider";
import QueryProvider from "@/provider/query-provider";
import "@/style/globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gyustay.vercel.app"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s | GyuStay`,
    default: APP_NAME as string,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "여행",
    "숙소",
    "예약",
    "여행지",
    "여행 숙소",
    "숙박",
    "펜션",
    "호텔",
    "최저가",
  ],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: "https://gyustay.vercel.app",
    siteName: APP_NAME,
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <SessionProvider session={session}>
          <QueryProvider>
            <OpenProvider />
            {children}
            <Toaster />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
