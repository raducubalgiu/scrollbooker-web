import { UserMini } from "@/ts/models/user/UserMini";
import { Avatar, Box, ListItemButton, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

type SelectedEmployeeItemProps = {
  isSelected: boolean;
  user: UserMini;
  onClick: () => void;
};

const SelectedEmployeeItem = ({
  onClick,
  user,
  isSelected,
}: SelectedEmployeeItemProps) => {
  return (
    <ListItemButton onClick={onClick} sx={{ p: 2.5, m: 0 }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        flex={1}
      >
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <Avatar src={user.avatar ?? ""} sx={{ width: 60, height: 60 }} />
          <Box>
            <Typography fontWeight={600} fontSize={18}>
              {user.fullname}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              @{user.username}
            </Typography>
          </Box>
        </Stack>

        {isSelected && <CheckCircleIcon fontSize="large" color="primary" />}
      </Stack>
    </ListItemButton>
  );
};

export default SelectedEmployeeItem;
