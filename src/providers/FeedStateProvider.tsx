"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FeedTabEnum } from "@/components/modules/Marketplace/FeedModule/FeedTabs";

type FeedStateContextValue = {
  currentTab: FeedTabEnum;
  currentIndex: number;
  appliedServiceIds: Set<number>;
  appliedOnlyVideoReviews: boolean;
  appliedOnlyNearby: boolean;
  setCurrentTab: (tab: FeedTabEnum) => void;
  setCurrentIndex: (index: number) => void;
  setAppliedFilters: (
    serviceIds: Set<number>,
    onlyVideoReviews: boolean,
    onlyNearby: boolean
  ) => void;
};

const FeedStateContext = createContext<FeedStateContextValue | null>(null);

export default function FeedStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentTab, setCurrentTab] = useState<FeedTabEnum>(
    FeedTabEnum.EXPLORE
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appliedServiceIds, setAppliedServiceIds] = useState<Set<number>>(
    new Set()
  );
  const [appliedOnlyVideoReviews, setAppliedOnlyVideoReviews] =
    useState(false);
  const [appliedOnlyNearby, setAppliedOnlyNearby] = useState(false);

  const setAppliedFilters = useCallback(
    (
      serviceIds: Set<number>,
      onlyVideoReviews: boolean,
      onlyNearby: boolean
    ) => {
      setAppliedServiceIds(serviceIds);
      setAppliedOnlyVideoReviews(onlyVideoReviews);
      setAppliedOnlyNearby(onlyNearby);
    },
    []
  );

  const value = useMemo(
    () => ({
      currentTab,
      currentIndex,
      appliedServiceIds,
      appliedOnlyVideoReviews,
      appliedOnlyNearby,
      setCurrentTab,
      setCurrentIndex,
      setAppliedFilters,
    }),
    [
      currentTab,
      currentIndex,
      appliedServiceIds,
      appliedOnlyVideoReviews,
      appliedOnlyNearby,
      setAppliedFilters,
    ]
  );

  return (
    <FeedStateContext.Provider value={value}>
      {children}
    </FeedStateContext.Provider>
  );
}

export const useFeedState = () => {
  const ctx = useContext(FeedStateContext);
  if (!ctx) {
    throw new Error("useFeedState must be used within a FeedStateProvider");
  }
  return ctx;
};
