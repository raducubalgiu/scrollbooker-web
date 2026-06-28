import { Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useMutate } from "@/hooks/useHttp";
import { UpdateFollowersAction } from "@/ts/enums/UpdateFollowersAction";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import IosShareIcon from "@mui/icons-material/IosShare";

type UserProfileActionsProps = {
  userId: number;
  is_business_or_employee: boolean;
  is_follow: boolean;
  onUpdateFollows: (action: UpdateFollowersAction) => void;
  onBookNow: () => void;
  onShare: () => void;
};

const UserProfileActions = ({
  userId,
  is_business_or_employee,
  is_follow,
  onUpdateFollows,
  onBookNow,
  onShare,
}: UserProfileActionsProps) => {
  const [localFollow, setLocalFollow] = useState<boolean>(is_follow);
  const previousLocalRef = useRef<boolean>(is_follow);
  const intendedNewFollowRef = useRef<boolean | null>(null);

  useEffect(() => {
    setLocalFollow(is_follow);
    previousLocalRef.current = is_follow;
  }, [is_follow]);

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

  const { mutate: followMutate, isPending: isFollowing } = useMutate({
    key: "follow_user",
    url: "/api/follow",
    method: "POST",
    options: {
      onError: onErrorHandler,
      onSuccess: onSuccessHandler,
    },
  });

  const { mutate: unfollowMutate, isPending: isUnfollowing } = useMutate({
    key: "unfollow_user",
    url: "/api/follow",
    method: "DELETE",
    options: {
      onError: onErrorHandler,
      onSuccess: onSuccessHandler,
    },
  });

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

    const payload = { followeeId: userId };

    if (newFollow) {
      followMutate(payload);
    } else {
      unfollowMutate(payload);
    }
  };

  const buttonSx = {
    textTransform: "none",
    flex: { xs: 1, sm: "none" },
    whiteSpace: "nowrap",
    minWidth: "max-content",
    py: { xs: 1, lg: 1.5 },
    px: { xs: 2.5, lg: 2 },
  };

  return (
    <>
      {is_business_or_employee && (
        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          <Button
            variant="contained"
            onClick={onBookNow}
            size="large"
            disableElevation
            sx={buttonSx}
          >
            Rezervă acum
          </Button>
        </Protected>
      )}
      <Button
        variant={localFollow ? "outlined" : "contained"}
        color="secondary"
        onClick={handleToggleFollow}
        size="large"
        disableElevation
        sx={{
          ...buttonSx,
          textTransform: "capitalize",
          color: "text.primary",
          "&.Mui-disabled": {
            opacity: 1,
            color: "inherit",
            backgroundColor: "transparent",
            boxShadow: "none",
            borderColor: "secondary",
          },
        }}
        disabled={isFollowing || isUnfollowing}
      >
        {localFollow ? "Urmărești" : "Urmărește"}
      </Button>

      {!is_business_or_employee && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onShare}
          size="large"
          startIcon={<IosShareIcon />}
          sx={buttonSx}
          disableElevation
        >
          Distribuie
        </Button>
      )}
    </>
  );
};

export default UserProfileActions;
