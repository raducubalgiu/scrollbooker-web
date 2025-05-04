import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function getUserServerSession() {
	const session = await getServerSession(authOptions);
	const userId = session?.user_id ?? undefined;
	const businessId = session?.business_id ?? undefined;

	return {
		userId,
		businessId,
		session,
	};
}
