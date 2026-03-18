import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/authOptions";
import { ComponentType, JSX } from "react";

export function ProtectedPage<P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>,
  requiredPermission: string
): ComponentType<P> {
  return async function ProtectedComponent(props: P): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);

    // If user is not logged in, redirect to sign-in
    if (!session) {
      return redirect("/api/auth/signin");
    }

    // If user is logged in but lacks the required permission, send to an unauthorized page
    if (!session?.permissions?.includes(requiredPermission)) {
      return redirect("/unauthorized");
    }

    return <Component {...props} />;
  };
}
