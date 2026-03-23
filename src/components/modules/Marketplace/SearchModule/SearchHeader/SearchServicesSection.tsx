import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

const SERVICE_CATEGORIES = [
  "Beauty",
  "Medical",
  "Auto",
  "Fitness",
  "Wellness",
  "Educație",
  "Pet Care",
];

const SearchServicesSection = () => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Ce serviciu cauți?
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {SERVICE_CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 500 }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SearchServicesSection;
