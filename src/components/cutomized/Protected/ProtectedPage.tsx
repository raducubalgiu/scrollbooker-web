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

		if (!session?.permissions?.includes(requiredPermission)) {
			return redirect("/unathorized");
		}

		return <Component {...props} />;
	};
}
