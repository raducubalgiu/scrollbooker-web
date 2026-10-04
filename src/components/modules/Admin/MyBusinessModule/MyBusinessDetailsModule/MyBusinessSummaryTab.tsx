"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Rating,
  Paper,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { BusinessDetails } from "@/ts/models/booking/business/BusinessDetails";
import { formatRating } from "@/utils/formatters";

type MyBusinessSummaryTabProps = {
  businessDetails: BusinessDetails | undefined;
};

const MyBusinessSummaryTab = ({
  businessDetails,
}: MyBusinessSummaryTabProps) => {
  const { owner } = businessDetails || {};

  return (
    <Paper>
      <Box
        sx={{
          borderRadius: 3,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2.5, alignItems: "center" }}
        >
          <Avatar
            src={owner?.avatar ?? ""}
            alt="Owner Avatar"
            variant="rounded"
            sx={{
              width: 48,
              height: 48,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "12px",
            }}
          />

          <Stack direction="column" spacing={1}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, lineHeight: 1.2 }}
            >
              {owner?.fullname}
            </Typography>

            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {owner?.profession}
            </Typography>

            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
              <Typography variant="body2" fontWeight={600}>
                {formatRating(owner?.ratings_average)}
              </Typography>
              <Rating
                value={owner?.ratings_average || 0}
                precision={0.5}
                readOnly
                size="medium"
              />
              <Typography
                variant="body2"
                fontWeight={600}
                color="text.secondary"
              >
                ({owner?.ratings_count || 0})
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ px: 2.5 }}>
          <Divider />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          sx={{ p: 2.5, alignItems: "center" }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: "rgba(0, 122, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#007aff",
            }}
          >
            {businessDetails?.has_employees ? <GroupIcon /> : <PersonIcon />}
          </Box>

          <Stack direction="column">
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {businessDetails?.has_employees
                ? "Companie cu angajați"
                : "Freelancer / Fără angajați"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MyBusinessSummaryTab;
