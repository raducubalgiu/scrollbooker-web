import "./globals.css";
import MUIProvider from "../providers/MUIProvider";
import QueryClientProvider from "../providers/QueryClientProvider";
import SessionProvider from "../providers/SessionProvider";
import ToastProvider from "@/providers/ToastProvider";
import LayoutWrapper from "@/components/core/Layout/LayoutWrapper";
import TopLoadingBar from "@/components/core/TopLoadingBar/TopLoadingBar";

type ChildrenType = { children: React.ReactNode };

export default function RootLayout({ children }: ChildrenType) {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<MUIProvider>
						<ToastProvider />
						<QueryClientProvider>
							<TopLoadingBar />
							<LayoutWrapper>{children}</LayoutWrapper>
						</QueryClientProvider>
					</MUIProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
