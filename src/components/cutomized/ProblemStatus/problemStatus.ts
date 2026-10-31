import { ChipProps } from "@mui/material";
import {
  ProblemPlatform,
  ProblemStatus,
} from "@/ts/models/nomenclature/Problem";

export const PROBLEM_STATUSES: ProblemStatus[] = [
  "new",
  "in_progress",
  "resolved",
  "rejected",
];

export const PROBLEM_PLATFORMS: ProblemPlatform[] = [
  "ios",
  "android",
  "web",
  "unknown",
];

export const ADMIN_STATUS_LABELS: Record<ProblemStatus, string> = {
  new: "Nou",
  in_progress: "În lucru",
  resolved: "Rezolvat",
  rejected: "Respins",
};

export const USER_STATUS_LABELS: Record<ProblemStatus, string> = {
  new: "Primit",
  in_progress: "În lucru",
  resolved: "Rezolvat",
  rejected: "Închis",
};

export const STATUS_CHIP_COLORS: Record<
  ProblemStatus,
  NonNullable<ChipProps["color"]>
> = {
  new: "info",
  in_progress: "warning",
  resolved: "success",
  rejected: "default",
};

export const PLATFORM_LABELS: Record<ProblemPlatform, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
  unknown: "Necunoscut",
};
