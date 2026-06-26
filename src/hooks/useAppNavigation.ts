"use client";

import { useRouter } from "next/navigation";

export const useAppNavigation = () => {
	const router = useRouter();

	const navigateTo = (
		routeUrl: string,
		options?: { replace?: boolean; scroll?: boolean },
	) => {
		if (options?.replace) {
			router.replace(routeUrl, { scroll: options.scroll ?? false });
		} else {
			router.push(routeUrl, { scroll: options?.scroll ?? false });
		}
	};

	const goBack = () => router.back();

	return { navigateTo, goBack };
};
