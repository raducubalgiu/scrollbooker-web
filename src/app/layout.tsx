import "./globals.css";
import MUIProvider from "../providers/MUIProvider";
import Layout from "../components/core/Layout/Layout";
import QueryClientProvider from "../providers/QueryClientProvider";
import SessionProvider from "../providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import ToastProvider from "@/providers/ToastProvider";

type ChildrenType = { children: React.ReactNode };

export default async function RootLayout({ children }: ChildrenType) {
	const session = await getServerSession(authOptions);
	const layout = session?.accessToken ? (
		<Layout>{children}</Layout>
	) : (
		<>{children}</>
	);

	return (
		<html lang="en">
			<body>
				<MUIProvider>
					<ToastProvider />
					<SessionProvider>
						<QueryClientProvider>{layout}</QueryClientProvider>
					</SessionProvider>
				</MUIProvider>
			</body>
		</html>
	);
}
