"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Layout from "./Layout";

export default function LayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();

	if (status === "loading") return null;

	if (session?.accessToken) {
		return <Layout>{children}</Layout>;
	}

	return <>{children}</>;
}
