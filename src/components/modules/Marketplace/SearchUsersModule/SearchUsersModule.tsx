import {
  alpha,
  InputAdornment,
  TextField,
  Typography,
  Theme,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useCustomQuery } from "@/hooks/useHttp";
import { SearchUser } from "@/ts/models/search/SearchUser";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { SearchUserItem } from "./SearchUserItem";

type SearchUsersModuleProps = {
  onNavigateToUserProfile: (username: string) => void;
};

const SearchUsersModule = ({
  onNavigateToUserProfile,
}: SearchUsersModuleProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value, 400);

  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useCustomQuery<SearchUser[]>({
    key: ["search-users", debouncedValue],
    url: "/api/search/users",
    params: {
      query: debouncedValue,
    },
    options: {
      enabled: debouncedValue.trim().length >= 2,
      staleTime: 1000 * 60,
    },
  });

  const loading = isLoading || isFetching;

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "background.paper",
          px: 3,
          pt: 3,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          fontWeight={700}
          fontSize={25}
          sx={{ mb: 2.5 }}
        >
          Caută utilizatori
        </Typography>

        <TextField
          autoFocus={true}
          placeholder="Caută utilizatori, afaceri, specialisti"
          variant="outlined"
          fullWidth
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={(e) => setValue(e.target.value)}
          sx={styles.search}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", ml: 1 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {loading && (
        <Stack justifyContent="center" alignItems="center" p={2.5}>
          <CircularProgress />
        </Stack>
      )}

      {!loading &&
        users?.map((user) => (
          <SearchUserItem
            key={user.id}
            user={user}
            onNavigateToUserProfile={onNavigateToUserProfile}
          />
        ))}
    </>
  );
};

export default SearchUsersModule;

const styles = {
  search: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "999px",
      bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.05),
      transition: "all 0.2s ease-in-out",
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "action.disabled",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
      },
      "& input": {
        fontSize: "18px",
      },
      "& input::placeholder": {
        fontSize: "18px",
        opacity: 0.8,
        color: (theme: Theme) => alpha(theme.palette.text.disabled, 0.5),
      },
    },
    mb: 1.5,
  },
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
  avatar: { width: 50, height: 50, border: 1, borderColor: "divider" },
};
