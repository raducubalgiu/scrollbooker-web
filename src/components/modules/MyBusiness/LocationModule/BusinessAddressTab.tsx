"use client";

import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditLocationIcon from "@mui/icons-material/EditLocationAlt";

type BusinessAddressTabProps = {
  address: string;
  map_url?: string;
  has_employees: boolean;
};

const BusinessAddressTab = ({
  address,
  map_url,
  has_employees,
}: BusinessAddressTabProps) => {
  const handleOpenInNewTab = () => {
    if (map_url) window.open(map_url, "_blank");
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Adresă
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 2, mb: 2, boxShadow: 0 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="flex-start"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon color="primary" />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {address || "Adresa nu este setată."}
              </Typography>
            </Box>
          </Stack>
        </CardContent>

        <CardActions sx={{ px: 2, py: 1 }}>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant={map_url ? "contained" : "outlined"}
              onClick={handleOpenInNewTab}
              disabled={!map_url}
            >
              Direcții
            </Button>

            <Button size="small" startIcon={<EditLocationIcon />}>
              Editează adresă
            </Button>
          </Stack>
        </CardActions>
      </Card>

      {/* Inline Map preview */}
      {map_url ? (
        <Box
          sx={{
            width: 640,
            height: 360,
            borderRadius: 2,
            overflow: "hidden",
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Image
            src={map_url}
            alt="Map preview"
            width={640}
            height={360}
            style={{ display: "block", objectFit: "cover" }}
            priority={false}
          />
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography color="text.secondary">
            Nu este disponibil un link către hartă.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BusinessAddressTab;
