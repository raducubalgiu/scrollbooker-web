"use client";

import { Chip } from "@mui/material";
import { ProblemStatus } from "@/ts/models/nomenclature/Problem";
import {
  ADMIN_STATUS_LABELS,
  STATUS_CHIP_COLORS,
  USER_STATUS_LABELS,
} from "./problemStatus";

type ProblemStatusChipProps = {
  status: ProblemStatus;
  audience: "admin" | "user";
};

const ProblemStatusChip = ({ status, audience }: ProblemStatusChipProps) => {
  const labels =
    audience === "admin" ? ADMIN_STATUS_LABELS : USER_STATUS_LABELS;

  return (
    <Chip
      size="small"
      label={labels[status]}
      color={STATUS_CHIP_COLORS[status]}
      variant={status === "rejected" ? "outlined" : "filled"}
      sx={{ fontWeight: 600 }}
    />
  );
};

export default ProblemStatusChip;
