import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Paper, Typography } from "@mui/material";
import React from "react";

export default async function Settings() {
  return (
    <MainLayout title="Setări" hideAction>
      <Paper sx={{ p: 2.5 }}>
        <Typography mb={2.5} fontWeight={600}>
          Setări generale
        </Typography>
      </Paper>
    </MainLayout>
  );
}
