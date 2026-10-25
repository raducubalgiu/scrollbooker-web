import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { useShareBusinessProfile } from "@/controllers/social/share.controller";
import { useState, useCallback } from "react";

export const useBusinessSocialActions = (initialProfile: BusinessProfile) => {
  const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
  const isCurrentlyFollowing = profile.owner.is_follow;

  const rollbackFollowState = useCallback(() => {
    setProfile((prev) => {
      const wasFollowingBeforeAction = !prev.owner.is_follow;
      return {
        ...prev,
        owner: {
          ...prev.owner,
          is_follow: wasFollowingBeforeAction,
          counters: {
            ...prev.owner.counters,
            followers_count: wasFollowingBeforeAction
              ? prev.owner.counters.followers_count + 1
              : Math.max(0, prev.owner.counters.followers_count - 1),
          },
        },
      };
    });
  }, []);

  const { mutate: follow } = useFollow();
  const { mutate: unfollow } = useUnfollow();

  const handleFollow = useCallback(() => {
    setProfile((prev) => {
      const nextIsFollow = !prev.owner.is_follow;
      return {
        ...prev,
        owner: {
          ...prev.owner,
          is_follow: nextIsFollow,
          counters: {
            ...prev.owner.counters,
            followers_count: nextIsFollow
              ? prev.owner.counters.followers_count + 1
              : Math.max(0, prev.owner.counters.followers_count - 1),
          },
        },
      };
    });

    const mutate = isCurrentlyFollowing ? unfollow : follow;
    mutate(profile.owner.id, { onError: rollbackFollowState });
  }, [isCurrentlyFollowing, follow, unfollow, profile.owner.id, rollbackFollowState]);

  const { shareBusinessProfile, copiedSnackbarOpen, closeCopiedSnackbar } =
    useShareBusinessProfile();

  const handleShare = useCallback(() => {
    shareBusinessProfile({
      businessId: profile.id,
      ownerUsername: profile.owner.username,
      profession: profile.owner.profession,
      description: profile.description,
    });
  }, [
    shareBusinessProfile,
    profile.id,
    profile.owner.username,
    profile.owner.profession,
    profile.description,
  ]);

  return {
    profile,
    handleFollow,
    handleShare,
    copiedSnackbarOpen,
    closeCopiedSnackbar,
  };
};
