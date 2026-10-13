import { SearchUser } from "@/ts/models/search/SearchUser";
import {
  Box,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import AvatarWithRating from "@/components/cutomized/Avatar/AvatarWithRating";
import { AppRoutes } from "@/utils/routes";

type SearchUserItemProps = {
  user: SearchUser;
  onNavigate?: () => void;
};

export const SearchUserItem = ({
  user,
  onNavigate = () => {},
}: SearchUserItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NextLink}
        href={AppRoutes.profile(user.username, user.profession)}
        onClick={onNavigate}
        sx={{ py: 2 }}
      >
        <Stack flexDirection="row" alignItems="center">
          <AvatarWithRating
            avatar={user.avatar}
            ratingsAverage={user.ratings_average}
            isBusinessOrEmployee={user.is_business_or_employee}
          />

          <Box sx={{ ml: 2.5 }}>
            <Typography fontSize={{ xs: 16, lg: 18 }} fontWeight={600}>
              {user.fullname}
            </Typography>
            <Typography color="text.secondary" variant="body2">
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
