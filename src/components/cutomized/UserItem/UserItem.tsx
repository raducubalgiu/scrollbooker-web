import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { UserMini } from "@/ts/models/user/UserMini";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";
import { useRecordProfileVisit } from "@/controllers/social/engagement.controller";
import AvatarWithRating from "../Avatar/AvatarWithRating";

type UserItemProps = {
  user: UserMini;
  onToggleFollow: (user: UserMini) => void;
  isTogglingFollow?: boolean;
};

const UserItem = ({
  user,
  onToggleFollow,
  isTogglingFollow = false,
}: UserItemProps) => {
  const {
    is_business_or_employee,
    avatar,
    ratings_average,
    is_follow,
    fullname,
    username,
    profession,
  } = user;

  const { mutate: recordProfileVisit } = useRecordProfileVisit();

  const handleFollowClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onToggleFollow(user);
    },
    [user, onToggleFollow]
  );

  const handleNavigateToProfile = useCallback(() => {
    recordProfileVisit({
      userId: user.id,
      postId: null,
      source: EngagementSourceEnum.BUSINESS_PROFILE,
    });
  }, [user.id, recordProfileVisit]);

  return (
    <ListItem disablePadding>
      <ListItemButton
        LinkComponent={Link}
        href={AppRoutes.profile(user.username, user.profession)}
        onClick={handleNavigateToProfile}
        sx={{ py: 2.5 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <AvatarWithRating
              avatar={avatar}
              ratingsAverage={ratings_average}
            />

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {fullname}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {is_business_or_employee ? profession : `@${username}`}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant={!is_follow ? "contained" : "outlined"}
            color={is_follow ? "secondary" : "primary"}
            onClick={handleFollowClick}
            size="small"
            disableElevation
            loading={isTogglingFollow}
            disabled={isTogglingFollow}
          >
            {is_follow ? "Urmărești" : "Urmărește"}
          </Button>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default UserItem;
