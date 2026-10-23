import { IconButton, Stack, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

type SearchBarProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onReset: () => void;
};

const SearchBar = ({
  value,
  placeholder,
  onChange,
  onReset,
}: SearchBarProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      flex={1}
      gap={1}
      sx={styles.container}
    >
      <SearchIcon
        sx={{
          color: "text.secondary",
          fontSize: 22,
          flexShrink: 0,
        }}
      />

      <TextField
        autoFocus
        fullWidth
        variant="standard"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        slotProps={{ input: { disableUnderline: true } }}
        sx={styles.input}
      />

      <IconButton
        size="small"
        onClick={onReset}
        sx={[
          { color: "text.secondary", p: 0.5, flexShrink: 0 },
          { visibility: value ? "visible" : "hidden" },
        ]}
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};

export default SearchBar;

const styles = {
  container: {
    bgcolor: "background.paper",
    borderRadius: "14px",
    height: 44,
    px: 1.5,
  },
  input: {
    "& .MuiInputBase-input": {
      padding: 0,
      fontSize: 16,
    },
  },
};
