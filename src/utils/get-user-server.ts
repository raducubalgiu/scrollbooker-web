import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function getUserServerSession() {
	const session = await getServerSession(authOptions);
	const userId = session?.user_id ?? null;
	const businessId = session?.business_id ?? null;

	return {
		userId,
		businessId,
		session,
	};
}
