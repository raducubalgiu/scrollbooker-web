import { Stack, Typography, TypographyProps } from "@mui/material";
import React, { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { formatDistance } from "@/utils/formatters";

type ProfileAddressProps = {
  address: string;
  distanceKm?: number | null;
  icon?: boolean;
  variant?: TypographyProps["variant"];
};

const ProfileAddress = ({
  address,
  distanceKm = null,
  icon = false,
  variant = "caption",
}: ProfileAddressProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const label = [formatDistance(distanceKm), address]
    .filter((part): part is string => Boolean(part))
    .join(" • ");

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.5}
      onClick={() => setIsExpanded((prev) => !prev)}
      sx={styles.container}
    >
      {icon && <LocationOnOutlinedIcon sx={styles.icon} />}
      <Typography
        variant={variant}
        color="text.secondary"
        sx={isExpanded ? styles.addressExpanded : styles.addressCollapsed}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export default ProfileAddress;

const styles = {
  container: {
    cursor: "pointer",
    width: "100%",
    minWidth: 0,
  },
  icon: {
    fontSize: 16,
    color: "text.secondary",
    flexShrink: 0,
  },
  addressCollapsed: {
    display: "block",
    flex: 1,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: 20,
    transition: "max-height 0.25s ease",
  },
  addressExpanded: {
    display: "block",
    flex: 1,
    minWidth: 0,
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflow: "hidden",
    maxHeight: 120,
    transition: "max-height 0.25s ease",
  },
};
