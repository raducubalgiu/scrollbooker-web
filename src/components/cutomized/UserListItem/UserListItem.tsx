import CustomStack from "@/components/core/CustomStack/CustomStack";
import {
  Avatar,
  Box,
  ListItemButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { Check } from "@mui/icons-material";

type UserListItemProps = {
  username: string | undefined;
  name: string;
  avatar?: string;
  isSelected?: boolean;
  onClick: () => void;
  sx?: SxProps;
};

export default function UserListItem({
  username,
  name,
  avatar,
  isSelected = false,
  onClick,
  sx,
}: UserListItemProps) {
  return (
    <ListItemButton sx={{ p: 0 }} onClick={onClick}>
      <CustomStack sx={{ width: "100%" }}>
        <Stack flexDirection="row" sx={sx}>
          <Avatar sx={{ width: 50, height: 50 }} src={avatar} />
          <Box sx={{ ml: 1.5 }}>
            <Typography fontWeight={600}>{name}</Typography>
            <Typography color="text.secondary">@{username}</Typography>
          </Box>
        </Stack>
        {isSelected && <Check color="success" sx={{ mr: 2.5 }} />}
      </CustomStack>
    </ListItemButton>
  );
}
