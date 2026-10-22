import { useState } from "react";

export const useFeedFilterDraft = (
  appliedServiceIds: Set<number>,
  appliedOnlyVideoReviews: boolean,
  appliedOnlyNearby: boolean
) => {
  const [draftSelectedIds, setDraftSelectedIds] = useState<Set<number>>(
    appliedServiceIds
  );
  const [draftOnlyVideoReviews, setDraftOnlyVideoReviews] = useState(
    appliedOnlyVideoReviews
  );
  const [draftOnlyNearby, setDraftOnlyNearby] = useState(appliedOnlyNearby);

  const toggleService = (serviceId: number) => {
    setDraftSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  };

  const toggleVideoReviews = () => {
    setDraftOnlyVideoReviews((prev) => !prev);
  };

  const toggleOnlyNearby = () => {
    setDraftOnlyNearby((prev) => !prev);
  };

  const clear = () => {
    setDraftSelectedIds(new Set());
    setDraftOnlyVideoReviews(false);
    setDraftOnlyNearby(false);
  };

  const isClearEnabled =
    draftSelectedIds.size > 0 || draftOnlyVideoReviews || draftOnlyNearby;

  return {
    draftSelectedIds,
    draftOnlyVideoReviews,
    draftOnlyNearby,
    toggleService,
    toggleVideoReviews,
    toggleOnlyNearby,
    clear,
    isClearEnabled,
  };
};
