import React from "react";
import { Stack, StackProps, Typography } from "@mui/material";

type UserInfoCounterProps = {
  label: string;
  counter: number | undefined;
  isLoading: boolean;
} & StackProps;

export default function UserInfoCounter({
  label,
  counter,
  isLoading,
  ...props
}: UserInfoCounterProps) {
  return (
    <Stack alignItems="center" {...props}>
      <Typography
        sx={{ mb: 1.5, fontWeight: 500, fontSize: 17 }}
        color="text.secondary"
      >
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800, fontSize: 25 }}>{counter}</Typography>
    </Stack>
  );
}
