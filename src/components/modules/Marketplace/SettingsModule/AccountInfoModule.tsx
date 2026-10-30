"use client";

import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { useAccountInfo } from "@/controllers/auth/auth.controller";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { maskedEmail, maskedPhone } from "@/utils/maskContact";

type AccountInfoRowProps = {
  title: string;
  value: string;
  showChevron?: boolean;
  onClick?: () => void;
};

const AccountInfoRow = ({
  title,
  value,
  showChevron = false,
  onClick,
}: AccountInfoRowProps) => (
  <Stack
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    onClick={onClick}
    sx={{
      py: 2,
      cursor: onClick ? "pointer" : "default",
    }}
  >
    <Typography fontWeight={700}>{title}</Typography>

    <Stack flexDirection="row" alignItems="center" spacing={0.5}>
      <Typography color="text.secondary" noWrap>
        {value}
      </Typography>

      {showChevron && <ChevronRightIcon sx={{ color: "text.secondary" }} />}
    </Stack>
  </Stack>
);

const AccountInfoModule = () => {
  const { navigateTo } = useAppNavigation();
  const { data, isLoading, isError, refetch } = useAccountInfo();

  return (
    <Box sx={styles.container}>
      <HeaderMobile title="Informații Cont" />

      <Box sx={{ px: 2.5 }}>
        {isLoading && (
          <Stack spacing={2} sx={{ py: 2 }}>
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={32} />
          </Stack>
        )}

        {!isLoading && isError && (
          <Stack spacing={1.5} alignItems="flex-start" sx={{ py: 3 }}>
            <Typography color="text.secondary">
              Nu am putut încărca informațiile contului.
            </Typography>
            <Typography
              sx={{ cursor: "pointer", fontWeight: 600, color: "primary.main" }}
              onClick={() => refetch()}
            >
              Încearcă din nou
            </Typography>
          </Stack>
        )}

        {!isLoading && !isError && data && (
          <>
            <AccountInfoRow
              title="Număr de telefon"
              value={
                data.account_phone ? maskedPhone(data.account_phone) : "Nesetat"
              }
              showChevron
              onClick={() =>
                navigateTo(AppRoutes.accountInfoPhoneVerification())
              }
            />

            <Divider />

            <AccountInfoRow title="Email" value={maskedEmail(data.email)} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default AccountInfoModule;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
};
