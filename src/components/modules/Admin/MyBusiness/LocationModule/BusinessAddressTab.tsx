"use client";

import React from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Card,
  CardContent,
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Adresă
      </Typography>

      <Card elevation={0} sx={{ borderRadius: 2, mb: 2, boxShadow: 0 }}>
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              alignItems: "stretch",
            }}
          >
            <Box sx={{ mb: 2.5 }}>
              <Stack spacing={3} sx={{ height: "100%" }}>
                <Stack flexDirection="row" gap={1}>
                  <LocationOnIcon color="primary" />
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {address || "Adresa nu este setată."}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant={map_url ? "contained" : "outlined"}
                    onClick={handleOpenInNewTab}
                    disabled={!map_url}
                    disableElevation
                  >
                    Direcții
                  </Button>

                  <Button size="small" startIcon={<EditLocationIcon />}>
                    Editează adresă
                  </Button>
                </Stack>
              </Stack>
            </Box>

            <Box>
              {map_url ? (
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 220, sm: 280, md: 360 },
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
                    style={{
                      display: "block",
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    priority={false}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: (theme) => `1px dashed ${theme.palette.divider}`,
                  }}
                >
                  <Typography color="text.secondary">
                    Nu este disponibil un link către hartă.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BusinessAddressTab;
