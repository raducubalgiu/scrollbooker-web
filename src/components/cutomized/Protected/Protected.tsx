"use client";

import { useSession } from "next-auth/react";
import React from "react";

type ProtectedProps = { permission: string; children: React.ReactNode };

export default function Protected({ permission, children }: ProtectedProps) {
	const { data: session } = useSession();

	const visible =
		permission &&
		(permission === "NO_PROTECTION" ||
			session?.permissions.includes(permission));

	return <>{visible && children}</>;
}
