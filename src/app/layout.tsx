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

  // determine which top-level area we are rendering based on path — default to admin for my-business routes on server
  // Note: In app router nested layouts will still apply; this is a simple top-level splitting approach.
  // We can't access request pathname easily here without server props, so we rely on nested layouts under /admin and /marketplace.

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
