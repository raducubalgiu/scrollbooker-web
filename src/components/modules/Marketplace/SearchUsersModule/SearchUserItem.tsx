import CustomAvatar from "@/components/cutomized/Avatar/CustomAvatar";
import { SearchUser } from "@/ts/models/search/SearchUser";
import {
  Box,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

type SearchUserItemProps = {
  user: SearchUser;
  onNavigateToUserProfile: (username: string) => void;
};

export const SearchUserItem = ({
  user,
  onNavigateToUserProfile,
}: SearchUserItemProps) => {
  return (
    <ListItem disablePadding sx={{ px: 1.5 }}>
      <ListItemButton
        onClick={() => onNavigateToUserProfile(user.username)}
        sx={{ py: 2.5 }}
      >
        <Stack flexDirection="row" alignItems="center">
          <CustomAvatar
            avatar={user.avatar}
            ratingsAverage={user.ratings_average}
            showBadge={user.is_business_or_employee}
            size={{ xs: 60 }}
          />

          <Box sx={{ ml: 2.5 }}>
            <Typography fontSize={18} fontWeight={600}>
              {user.fullname}
            </Typography>
            <Typography color="text.secondary">
              {user.is_business_or_employee
                ? user.profession
                : `@${user.username}`}
            </Typography>
          </Box>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
};
