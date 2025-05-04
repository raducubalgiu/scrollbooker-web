import { useSession } from "next-auth/react";

export function useUserClientSession() {
	const { data: session, status } = useSession();

	const isLoading = status === "loading";
	const isAuthenticated = status === "authenticated";
	const userId = session?.user_id ?? undefined;
	const businessId = session?.business_id ?? undefined;
	const businessTypeId = session?.business_type_id ?? undefined;

	return {
		isLoading,
		isAuthenticated,
		userId,
		businessId,
		businessTypeId,
		session,
	};
}
