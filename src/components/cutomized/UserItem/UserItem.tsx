import {
  Avatar,
  Badge,
  Box,
  Button,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { formatRating } from "@/utils/formatters";
import { UserMini } from "@/ts/models/user/UserMini";
import { useFollowMutation } from "@/hooks/mutations/useFollowMutation";
import Link from "next/link";
import { getProfileUrl } from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";

type UserItemProps = {
  user: UserMini;
  ownerId: number | undefined;
  type: "followers" | "followings";
};

const UserItem = ({ user, ownerId, type }: UserItemProps) => {
  const {
    id,
    is_business_or_employee,
    avatar,
    ratings_average,
    is_follow,
    fullname,
    username,
    profession,
  } = user;

  const formattedRating = formatRating(ratings_average);

  const user_avatar = useMemo(() => {
    if (!is_business_or_employee) return <Avatar sx={styles.avatar} />;

    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={styles.badgeContent}
          >
            <StarIcon sx={{ fontSize: 20, mr: 0.5, color: "rating.main" }} />
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {formattedRating}
            </Typography>
          </Stack>
        }
        sx={styles.badge}
      >
        <Avatar sx={styles.avatar} src={avatar ?? ""} />
      </Badge>
    );
  }, [
    is_business_or_employee,
    formattedRating,
    avatar,
    styles.avatar,
    styles.badge,
    styles.badgeContent,
  ]);

  const { mutate: toggleFollow } = useFollowMutation(ownerId, type);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFollow({ targetUserId: id, isFollow: !!is_follow });
  };

  const followButton = useMemo(
    () => (
      <Button
        variant={!is_follow ? "contained" : "outlined"}
        color={is_follow ? "secondary" : "primary"}
        onClick={handleFollowClick}
        size="large"
        disableElevation
        sx={{
          py: { xs: 0.35, lg: 0.5 },
          px: { xs: 1.25, lg: 1.5 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {is_follow ? "Urmărești" : "Urmărește"}
      </Button>
    ),
    [is_follow, handleFollowClick]
  );

  return (
    <ListItem disablePadding>
      <ListItemButton
        LinkComponent={Link}
        href={getProfileUrl(user.username)}
        sx={{ py: 2.5 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
        >
          <Stack flexDirection="row" alignItems="center" gap={2}>
            {user_avatar}

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {fullname}
              </Typography>
              <Typography color="text.secondary">
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

const styles = {
  badge: {
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: {
    backgroundColor: "background.paper",
    px: { xs: 1, lg: 1.5 },
    py: { xs: 0.2, lg: 0.5 },
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: {
    width: { xs: 55, lg: 70 },
    height: { xs: 55, lg: 70 },
    border: 1,
    borderColor: "divider",
  },
};
