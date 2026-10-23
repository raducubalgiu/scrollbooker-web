"use client";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import NextLink from "next/link";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import { AppRoutes } from "@/utils/routes";

type AccountListItem = {
  title: string;
  description: string;
  href: string;
};

const ACCOUNT_ITEMS: AccountListItem[] = [
  {
    title: "Informații Cont",
    description: "Vezi și editează datele tale personale",
    href: AppRoutes.accountInfo(),
  },
  {
    title: "Parolă",
    description: "Actualizează parola și securitatea contului",
    href: AppRoutes.accountPassword(),
  },
  {
    title: "Dezactivează sau șterge contul",
    description: "Dezactivează temporar sau șterge definitiv contul",
    href: AppRoutes.deactivateDeleteAccount(),
  },
];

const AccountModule = () => {
  return (
    <Box sx={styles.container}>
      <HeaderMobile title="Cont" />

      <List component="nav">
        {ACCOUNT_ITEMS.map((item, index) => (
          <React.Fragment key={item.href}>
            <ListItemButton component={NextLink} href={item.href}>
              <ListItemText
                primary={item.title}
                secondary={item.description}
                slotProps={{
                  primary: { fontWeight: 600 },
                }}
              />
              <ChevronRightIcon sx={{ color: "text.secondary" }} />
            </ListItemButton>

            {index < ACCOUNT_ITEMS.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default AccountModule;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
};
