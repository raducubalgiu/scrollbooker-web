"use client";

import {
	QueryClient,
	QueryClientProvider as QueryClientProviderComponent,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function QueryClientProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<QueryClientProviderComponent client={queryClient}>
			{children}
		</QueryClientProviderComponent>
	);
}
