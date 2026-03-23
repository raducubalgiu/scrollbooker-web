import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

const DATETIME_OPTIONS = [
  "Azi",
  "Mâine",
  "Weekend",
  "Săptămâna aceasta",
  "Oricând",
];

const SearchDateTimeSection = () => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Când?
      </Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {DATETIME_OPTIONS.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            clickable
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 500 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SearchDateTimeSection;
