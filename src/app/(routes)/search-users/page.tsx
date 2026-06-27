"use client";

import SearchUsersModule from "@/components/modules/Marketplace/SearchUsersModule/SearchUsersModule";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";

export default function SearchUsersPage() {
  const { navigateTo } = useAppNavigation();

  return (
    <SearchUsersModule
      onNavigateToUserProfile={(username, profession) => {
        navigateTo(AppRoutes.profile(username, profession));
      }}
      showTitle={false}
    />
  );
}
