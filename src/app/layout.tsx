import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Inter } from "next/font/google";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ro";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import MUIProvider from "../providers/MUIProvider";
import { getSystemThemeGuess, getThemeMode } from "../providers/themeCookie";
import { ThemeModeEnum } from "../providers/ThemeModeEnum";
import QueryClientProvider from "../providers/QueryClientProvider";
import SessionProvider from "../providers/SessionProvider";
import ToastProvider from "@/providers/ToastProvider";
import AuthListener from "@/components/core/AuthListener/AuthListener";
import Layout from "@/components/core/Layout/Layout";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Viewport } from "next";

import "./globals.css";

dayjs.extend(utc);
dayjs.locale("ro");

type ChildrenType = { children: React.ReactNode };

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Valoare de bază — ThemeModeProvider își sincronizează același tag
  // reactiv la fiecare schimbare de temă (light/dark folosesc amândouă
  // același primary.main, deci practic rămâne mereu această culoare),
  // iar ForceDarkChrome îl suprascrie temporar pe ecranele cu video.
  themeColor: "#FF6F00",
};

export default async function RootLayout({ children }: ChildrenType) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  const messages = await getMessages();
  const themeMode = await getThemeMode();
  const resolvedTheme =
    themeMode === ThemeModeEnum.DARK || themeMode === ThemeModeEnum.LIGHT
      ? themeMode
      : await getSystemThemeGuess();

  return (
    <html
      lang={locale}
      data-theme={resolvedTheme}
      style={{ colorScheme: resolvedTheme }}
      suppressHydrationWarning
    >
      <AppRouterCacheProvider options={{ enableCssLayer: false }}>
        <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SessionProvider session={session}>
              <AuthListener />
              <MUIProvider initialMode={themeMode} initialResolvedMode={resolvedTheme}>
                <ToastProvider />
                <QueryClientProvider>
                  <Layout>{children}</Layout>
                </QueryClientProvider>
              </MUIProvider>
            </SessionProvider>
          </NextIntlClientProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
