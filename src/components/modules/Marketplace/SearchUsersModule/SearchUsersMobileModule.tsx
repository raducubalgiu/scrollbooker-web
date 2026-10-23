import { Box, IconButton, Stack, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useSearchUsersQuery } from "./useSearchUsersQuery";
import SearchUsersResultsList from "./SearchUsersResultsList";

const SearchUsersMobileModule = () => {
  const { goBack } = useAppNavigation();
  const { value, setValue, users, loading } = useSearchUsersQuery();

  return (
    <Box mt={1}>
      <Stack direction="row" alignItems="center" gap={0.5} sx={styles.header}>
        <IconButton onClick={() => goBack()}>
          <ArrowBackIcon />
        </IconButton>

        <Stack
          direction="row"
          alignItems="center"
          flex={1}
          gap={1}
          sx={styles.pill}
        >
          <SearchIcon sx={styles.searchIcon} />

          <TextField
            autoFocus
            fullWidth
            variant="standard"
            placeholder="Caută utilizatori, afaceri, specialiști"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            slotProps={{ input: { disableUnderline: true } }}
            sx={styles.input}
          />

          <IconButton
            size="small"
            onClick={() => setValue("")}
            sx={[
              styles.clearButton,
              { visibility: value ? "visible" : "hidden" },
            ]}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <SearchUsersResultsList users={users} loading={loading} />
    </Box>
  );
};

export default SearchUsersMobileModule;

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    bgcolor: "background.default",
    px: 1,
    py: 1,
  },
  pill: {
    bgcolor: "background.paper",
    borderRadius: "14px",
    height: 44,
    px: 1.5,
  },
  searchIcon: {
    color: "text.secondary",
    fontSize: 22,
    flexShrink: 0,
  },
  input: {
    "& .MuiInputBase-input": {
      padding: 0,
      fontSize: 16,
    },
  },
  clearButton: {
    color: "text.secondary",
    p: 0.5,
    flexShrink: 0,
  },
};
