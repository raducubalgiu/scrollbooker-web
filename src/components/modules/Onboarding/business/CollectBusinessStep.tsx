"use client";

import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";
import {
  alpha,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const BUSINESS_TYPES: BusinessType[] = [
  {
    id: 1,
    name: "Frizerie",
    active: true,
    created_at: "",
    updated_at: "",
    service_domains: [],
    filters: [],
  },
  {
    id: 2,
    name: "Salon de infrumusetare",
    active: true,
    created_at: "",
    updated_at: "",
    service_domains: [],
    filters: [],
  },
];

const CollectBusinessStep = () => {
  const [selectedBusinessTypeId, setSelectedBusinessTypeId] = useState<
    number | null
  >(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBusinessTypeId(Number(event.target.value));
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
    >
      <Container maxWidth="sm">
        <Stack mb={2} gap={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Ce business ai?
          </Typography>

          <Typography color="text.secondary">
            Alege categoria care descrie cel mai bine activitatea ta
          </Typography>
        </Stack>

        <TextField
          autoFocus={false}
          placeholder="Caută"
          variant="outlined"
          fullWidth
          sx={styles.search}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={styles.searchFieldIcon} />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl fullWidth>
          <RadioGroup
            name="business_type"
            value={selectedBusinessTypeId ?? ""}
            onChange={handleChange}
          >
            {BUSINESS_TYPES.map((businessType) => (
              <FormControlLabel
                key={businessType.id}
                value={businessType.id}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 32.5,
                      },
                    }}
                  />
                }
                label={businessType.name}
                labelPlacement="start"
                sx={{
                  justifyContent: "space-between",
                  m: 0,
                  py: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Container>
    </Stack>
  );
};

export default CollectBusinessStep;

const styles = {
  search: {
    "& .MuiOutlinedInput-root": {
      minHeight: 56,
      borderRadius: "999px",
      bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.05),
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "action.disabled",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
      },
      "& input": {
        fontSize: 18,
        py: 1.6,
      },
      "& input::placeholder": {
        fontSize: 18,
        opacity: 0.8,
        color: (theme: Theme) => alpha(theme.palette.text.disabled, 0.5),
      },
    },
  },
  searchFieldIcon: {
    color: "text.secondary",
    ml: 0.5,
    fontSize: 24,
  },
};
