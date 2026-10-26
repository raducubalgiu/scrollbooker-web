import React, { useEffect, useState, useRef } from "react";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import ContactActionButton from "@/components/cutomized/Contact/ContactActionButton";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";
import ProfileActionButton from "./ProfileActionButton";

type UserProfileActionsProps = {
  userId: number;
  businessId: number | null;
  isBusinessOrEmployee: boolean;
  isFollow: boolean;
  instantBooking: boolean;
  contact: ContactInfo;
  onUpdateFollows: (action: UpdateFollowersAction) => void;
  onBookNow: () => void;
};

const UserProfileActions = ({
  userId,
  businessId,
  isBusinessOrEmployee,
  isFollow,
  instantBooking,
  contact,
  onUpdateFollows,
  onBookNow,
}: UserProfileActionsProps) => {
  const [localFollow, setLocalFollow] = useState<boolean>(isFollow);
  const previousLocalRef = useRef<boolean>(isFollow);
  const intendedNewFollowRef = useRef<boolean | null>(null);

  useEffect(() => {
    setLocalFollow(isFollow);
    previousLocalRef.current = isFollow;
  }, [isFollow]);

  const onErrorHandler = () => {
    const intended = intendedNewFollowRef.current;
    const previous = previousLocalRef.current;

    if (typeof intended === "boolean") {
      try {
        const rollbackAction = intended
          ? UpdateFollowersAction.UNFOLLOW
          : UpdateFollowersAction.FOLLOW;
        onUpdateFollows && onUpdateFollows(rollbackAction);
      } catch (e) {
        console.warn("onUpdateFollows rollback threw an error", e);
      }
    }

    setLocalFollow(previous);
    intendedNewFollowRef.current = null;
  };

  const onSuccessHandler = () => {
    intendedNewFollowRef.current = null;
  };

  const { mutate: followMutate, isPending: isFollowing } = useFollow();
  const { mutate: unfollowMutate, isPending: isUnfollowing } = useUnfollow();

  const handleToggleFollow = () => {
    const previousLocal = localFollow;
    const newFollow = !localFollow;

    if (!userId) {
      console.warn(
        "UserProfileActions: missing userId, aborting follow toggle"
      );
      return;
    }

    previousLocalRef.current = previousLocal;
    intendedNewFollowRef.current = newFollow;
    setLocalFollow(newFollow);

    try {
      if (onUpdateFollows) {
        onUpdateFollows(
          newFollow
            ? UpdateFollowersAction.FOLLOW
            : UpdateFollowersAction.UNFOLLOW
        );
      }
    } catch (e) {
      console.warn("onUpdateFollows threw an error", e);
    }

    const mutate = newFollow ? followMutate : unfollowMutate;
    mutate(userId, {
      onError: onErrorHandler,
      onSuccess: onSuccessHandler,
    });
  };

  const contactButton = (
    <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
      <ContactActionButton
        instantBooking={instantBooking}
        contact={contact}
        onBookNow={onBookNow}
        userId={userId}
        businessId={businessId}
        source={EngagementSourceEnum.BUSINESS_PROFILE}
        size="medium"
        sx={styles.contactButton}
      />
    </Protected>
  );

  return (
    <>
      {isBusinessOrEmployee && contactButton}
      <ProfileActionButton
        title={localFollow ? "Urmărești" : "Urmărește"}
        variant={localFollow ? "outlined" : "contained"}
        color="secondary"
        onClick={handleToggleFollow}
        disabled={isFollowing || isUnfollowing}
      />
    </>
  );
};

export default UserProfileActions;

const styles = {
  contactButton: {
    textTransform: "none",
    flex: { xs: 1, sm: "none" },
    whiteSpace: "nowrap",
    minWidth: "max-content",
  },
};
