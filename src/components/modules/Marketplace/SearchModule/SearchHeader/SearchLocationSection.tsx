import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const SearchLocationSection = () => {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Unde?
      </Typography>
      <TextField
        fullWidth
        placeholder="Caută un oraș, cartier sau adresă..."
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />
      <Button
        size="small"
        startIcon={<MyLocationIcon fontSize="small" />}
        color="secondary"
        sx={{ textTransform: "none" }}
      >
        Folosește locația mea curentă
      </Button>
    </Box>
  );
};

export default SearchLocationSection;
