"use client";

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Modal from "@/components/core/Modal/Modal";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import { AppRoutes } from "@/utils/routes";

type ServicesWithProductsModalProps = {
  open: boolean;
  businessId: number;
  removedServiceIds: number[];
  onClose: () => void;
};

const ServicesWithProductsModal = ({
  open,
  businessId,
  removedServiceIds,
  onClose,
}: ServicesWithProductsModalProps) => {
  const t = useTranslations("myServices");
  const router = useRouter();

  const { data, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId,
    onlyServicesWithProducts: true,
  });

  const blockedServices = (data?.data ?? [])
    .filter(
      (group) =>
        removedServiceIds.includes(group.service.id) &&
        group.products.length > 0
    )
    .map((group) => ({
      id: group.service.id,
      name: group.service.name,
      productsCount: group.products.length,
    }));

  return (
    <Modal
      open={open}
      handleClose={onClose}
      title={t("servicesWithProductsTitle")}
      maxWidth="xs"
      fullWidth
      dividers={false}
      customFooter={
        <Stack direction="row" mt={1.5} spacing={1.5} sx={{ width: "100%" }}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            {t("understood")}
          </Button>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={() => router.push(AppRoutes.myProducts())}
          >
            {t("goToProducts")}
          </Button>
        </Stack>
      }
    >
      <Stack spacing={2} sx={{ px: { xs: 2, lg: 0 }, pb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {t("servicesWithProductsDescription")}
        </Typography>

        {isLoading && (
          <Box sx={styles.centered}>
            <CircularProgress size={24} />
          </Box>
        )}

        {!isLoading && blockedServices.length > 0 && (
          <Stack spacing={1}>
            {blockedServices.map((service) => (
              <Stack
                key={service.id}
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={styles.row}
              >
                <Inventory2OutlinedIcon sx={{ color: "text.secondary" }} />
                <Typography
                  fontWeight={600}
                  sx={{ flex: 1, minWidth: 0 }}
                  noWrap
                >
                  {service.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexShrink: 0 }}
                >
                  {t("productsCount", { count: service.productsCount })}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Modal>
  );
};

export default ServicesWithProductsModal;

const styles = {
  row: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    px: 2,
    py: 1.5,
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    py: 2,
  },
};
