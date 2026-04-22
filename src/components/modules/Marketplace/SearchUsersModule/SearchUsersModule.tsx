import {
  alpha,
  InputAdornment,
  TextField,
  Typography,
  Theme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchUsersModule = () => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={600}
        fontSize={27}
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
};
