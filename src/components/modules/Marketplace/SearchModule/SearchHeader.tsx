import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchHeader = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
      <Paper
        sx={{
          p: 1,
          borderRadius: 16,
          boxShadow:
            "0 10px 30px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.04)",
          border: (theme) =>
            `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
          backdropFilter: "saturate(140%) blur(6px)",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(18,18,18,0.6)"
              : "rgba(255,255,255,0.8)",
        }}
      >
        <Stack direction={"row"} spacing={1} alignItems="center">
          <Button
            sx={{
              minWidth: 260,
              bgcolor: "transparent",
              textTransform: "none",
              borderRadius: 2,
            }}
            color="secondary"
          >
            <Typography sx={{ color: "text.primary" }} variant="h6">
              Toate serviciile
            </Typography>
          </Button>

          <Divider
            orientation="vertical"
            sx={{ height: 28, color: "divider" }}
          />

          <Button
            sx={{
              minWidth: 260,
              bgcolor: "transparent",
              textTransform: "none",
              borderRadius: 2,
            }}
            color="secondary"
          >
            <Typography sx={{ color: "text.primary" }} variant="h6">
              In apropiere
            </Typography>
          </Button>

          <Divider
            orientation="vertical"
            sx={{ height: 28, color: "divider" }}
          />

          <Button
            sx={{
              minWidth: 260,
              bgcolor: "transparent",
              textTransform: "none",
              borderRadius: 2,
            }}
            color="secondary"
          >
            <Typography sx={{ color: "text.primary" }} variant="h6">
              Oricand
            </Typography>
          </Button>
          <Tooltip title="Caută" arrow>
            <IconButton
              onClick={() => {}}
              size="large"
              aria-label="Caută"
              sx={{
                bgcolor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
                p: 1,
                borderRadius: "50%",
                "&:hover": {
                  bgcolor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default SearchHeader;
