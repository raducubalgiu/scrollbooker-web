import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

interface DecodedToken {
	id: string;
	role: string;
}

export const decodeToken = async (): Promise<{
	user_id: string;
	role: string;
}> => {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.accessToken) {
			throw new Error('"Invalid or missing access token"');
		}

		const decoded = jwt.verify(
			session.accessToken,
			process.env.JWT_SECRET as string
		) as DecodedToken;

		if (!decoded?.id || !decoded?.role) {
			throw new Error("Invalid token or missing User id or Role");
		}

		return { ...decoded, user_id: decoded?.id, role: decoded?.role };
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(`Authentication Error: ${error.message}`);
		}
		throw new Error(`An unknown authentication error occured!`);
	}
};
