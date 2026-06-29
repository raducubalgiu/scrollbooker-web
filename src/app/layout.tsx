import { SpeedInsights } from "@vercel/speed-insights/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Inter } from "next/font/google";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ro";

import MUIProvider from "../providers/MUIProvider";
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
};

export default async function RootLayout({ children }: ChildrenType) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<AppRouterCacheProvider options={{ enableCssLayer: true }}>
				<body className={inter.className}>
					<SessionProvider session={session}>
						<AuthListener />
						<MUIProvider>
							<ToastProvider />
							<QueryClientProvider>
								<Layout>{children}</Layout>
							</QueryClientProvider>
						</MUIProvider>
					</SessionProvider>
				</body>
			</AppRouterCacheProvider>
		</html>
	);
}
