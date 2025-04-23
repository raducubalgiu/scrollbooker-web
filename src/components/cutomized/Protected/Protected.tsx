"use client";

import { Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

type ProtectedProps = {
	permission: string;
	children: React.ReactNode;
	showSkeleton?: boolean;
};

export default function Protected({
	permission,
	children,
	showSkeleton = false,
}: ProtectedProps) {
	const { data: session, status } = useSession();

	const visible =
		permission &&
		(permission === "NO_PROTECTION" ||
			session?.permissions.includes(permission));

	switch (true) {
		case showSkeleton && status === "loading":
			return <Skeleton height={47.5} sx={{ mx: 2.5 }} />;
		case visible && status !== "loading":
			return children;
		default:
			return <></>;
	}
}
