import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { JSX } from "react";

type NextPageProps = {
  params?: Promise<Record<string, string>>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type ServerPageComponent<P extends NextPageProps = Record<string, never>> = (
  props: P
) => Promise<JSX.Element>;

export function ProtectedPage<P extends NextPageProps = Record<string, never>>(
  Component: ServerPageComponent<P>,
  requiredPermission: string
): ServerPageComponent<P> {
  return async function ProtectedComponent(props: P): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/api/auth/signin");
    }

    if (!session?.permissions?.includes(requiredPermission)) {
      redirect("/unauthorized");
    }

    return <Component {...props} />;
  };
}
