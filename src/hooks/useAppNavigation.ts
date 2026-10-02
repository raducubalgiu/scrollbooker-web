"use client";

import { useRouter } from "next/navigation";
import { AppRoutes } from "@/utils/routes";

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

	// Multe ecrane sunt puncte de intrare directe (deep link dintr-un alt
	// tab/aplicație — share, ad, notificare), caz în care tab-ul nu are
	// niciun istoric real și router.back() nu ar face nimic. Verificăm
	// window.history.length înainte de a încerca efectiv să navigăm înapoi.
	const goBack = (fallbackUrl: string = AppRoutes.explore()) => {
		if (typeof window !== "undefined" && window.history.length <= 1) {
			router.replace(fallbackUrl);
			return;
		}
		router.back();
	};

	return { navigateTo, goBack };
};
