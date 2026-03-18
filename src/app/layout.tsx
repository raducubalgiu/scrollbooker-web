import "./globals.css";
import MUIProvider from "../providers/MUIProvider";
import QueryClientProvider from "../providers/QueryClientProvider";
import SessionProvider from "../providers/SessionProvider";
import ToastProvider from "@/providers/ToastProvider";
import LayoutWrapper from "@/components/core/Layout/LayoutWrapper";
import TopLoadingBar from "@/components/core/TopLoadingBar/TopLoadingBar";
import AuthListener from "@/components/core/AuthListener/AuthListener";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

type ChildrenType = { children: React.ReactNode };

export default async function RootLayout({ children }: ChildrenType) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <AuthListener />
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
