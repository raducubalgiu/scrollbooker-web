import React from "react";
import { CircularProgress } from "@mui/material";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export type PostMoreOptionsItem = {
  key: "statistics" | "edit" | "delete";
  label: string;
  icon: React.ReactNode;
  isDestructive?: boolean;
  onClick: () => void;
};

type BuildPostMoreOptionsItemsParams = {
  onStatisticsClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isLoadingDelete: boolean;
};

export const buildPostMoreOptionsItems = ({
  onStatisticsClick,
  onEditClick,
  onDeleteClick,
  isLoadingDelete,
}: BuildPostMoreOptionsItemsParams): PostMoreOptionsItem[] => [
  {
    key: "statistics",
    label: "Statistici",
    icon: <BarChartOutlinedIcon fontSize="small" />,
    onClick: onStatisticsClick,
  },
  {
    key: "edit",
    label: "Editează",
    icon: <EditOutlinedIcon fontSize="small" />,
    onClick: onEditClick,
  },
  {
    key: "delete",
    label: "Șterge",
    icon: isLoadingDelete ? (
      <CircularProgress size={20} color="error" />
    ) : (
      <DeleteOutlineIcon fontSize="small" color="error" />
    ),
    isDestructive: true,
    onClick: onDeleteClick,
  },
];
