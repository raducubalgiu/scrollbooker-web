import { UserMiniType } from "@/ts/models/user/UserMiniType";
import { Avatar, Badge, Box, Button, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { formatRating } from "@/utils/formatters";

const UserItem = ({ user }: { user: UserMiniType }) => {
  const {
    is_business_or_employee,
    avatar,
    ratings_average,
    is_follow,
    fullname,
    username,
    profession,
  } = user;

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
      px: 1.5,
      py: 0.5,
      borderRadius: 50,
      boxShadow: 1,
    },
    avatar: { width: 70, height: 70, border: 1, borderColor: "divider" },
  };

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
            <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
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

  const followButton = useMemo(() => {
    return (
      <Button
        variant={!is_follow ? "contained" : "outlined"}
        color={is_follow ? "secondary" : "primary"}
        onClick={() => {}}
        size="large"
        disableElevation
        sx={{ textTransform: "capitalize" }}
      >
        {is_follow ? "Urmărești" : "Urmărește"}
      </Button>
    );
  }, [is_follow]);

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5 }}
    >
      <Stack flexDirection="row" alignItems="center">
        {user_avatar}

        <Box sx={{ ml: 2.5 }}>
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
  );
};

export default UserItem;
