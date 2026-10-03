import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { UserMini } from "@/ts/models/user/UserMini";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
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

  const handleFollowClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onToggleFollow(user);
    },
    [user, onToggleFollow]
  );

  const followButton = useMemo(
    () => (
      <Button
        variant={!is_follow ? "contained" : "outlined"}
        color={is_follow ? "secondary" : "primary"}
        onClick={handleFollowClick}
        size="medium"
        disableElevation
        loading={isTogglingFollow}
        disabled={isTogglingFollow}
      >
        {is_follow ? "Urmărești" : "Urmărește"}
      </Button>
    ),
    [is_follow, handleFollowClick, isTogglingFollow]
  );

  return (
    <ListItem disablePadding>
      <ListItemButton
        LinkComponent={Link}
        href={AppRoutes.profile(user.username, user.profession)}
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

          {followButton}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};

export default UserItem;
