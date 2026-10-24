"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import Modal from "@/components/core/Modal/Modal";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import { Product } from "@/ts/models/booking/product/Product";
import UploadVideoProductsContent from "./UploadVideoProductsContent";
import UploadVideoProductsBottomBar from "./UploadVideoProductsBottomBar";

const MAX_SELECTED_PRODUCTS = 5;

type UploadVideoProductsPickerProps = {
  selectedProducts: Product[];
  onAddProducts: (products: Product[]) => void;
  open: boolean;
  onClose: () => void;
};

const UploadVideoProductsPicker = ({
  selectedProducts,
  onAddProducts,
  open,
  onClose,
}: UploadVideoProductsPickerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session } = useSession();

  const businessId = session?.business_id;
  const businessOwnerId = session?.business_owner_id;
  const userId = session?.user_id;
  const isEmployee = businessOwnerId !== userId;

  const [localSelectedProducts, setLocalSelectedProducts] =
    useState<Product[]>(selectedProducts);

  useEffect(() => {
    if (open) setLocalSelectedProducts(selectedProducts);
  }, [open, selectedProducts]);

  const { data: products, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId: businessId ?? 0,
    employeeId: isEmployee ? userId ?? null : null,
    onlyServicesWithProducts: true,
  });

  const handleToggleProduct = (product: Product, isSelected: boolean) => {
    if (isSelected) {
      setLocalSelectedProducts((products) =>
        products.filter((p) => p.id !== product.id)
      );
    } else {
      setLocalSelectedProducts((products) => {
        if (products.length >= MAX_SELECTED_PRODUCTS) return products;
        return [...products, product];
      });
    }
  };

  const handleReset = () => setLocalSelectedProducts([]);

  const handleConfirm = () => {
    onAddProducts(localSelectedProducts);
    onClose();
  };

  const body = isLoading || !products ? (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress />
    </Box>
  ) : (
    <UploadVideoProductsContent
      products={products}
      localSelectedProducts={localSelectedProducts}
      onToggleProduct={handleToggleProduct}
    />
  );

  const bottomBar = (
    <UploadVideoProductsBottomBar
      selectedCount={localSelectedProducts.length}
      onReset={handleReset}
      onConfirm={handleConfirm}
    />
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        sx={styles.drawer}
        slotProps={{ paper: { sx: styles.drawerPaper } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2, pb: 1 }}
        >
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>

          <Typography fontWeight={700}>Atașează servicii</Typography>

          <Box sx={{ width: 34 }} />
        </Stack>

        <Box sx={styles.drawerContent}>{body}</Box>

        <Divider />
        <Box sx={{ p: 2 }}>{bottomBar}</Box>
      </Drawer>
    );
  }

  return (
    <Modal
      title="Atașează servicii"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      customFooter={bottomBar}
    >
      {body}
    </Modal>
  );
};

export default UploadVideoProductsPicker;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  drawerPaper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  drawerContent: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto" as const,
  },
};
