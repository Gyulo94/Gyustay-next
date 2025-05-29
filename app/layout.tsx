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
  title: {
    template: `%s | GyuStay`,
    default: APP_NAME as string,
  },
  description: APP_DESCRIPTION,
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
          </QueryProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
