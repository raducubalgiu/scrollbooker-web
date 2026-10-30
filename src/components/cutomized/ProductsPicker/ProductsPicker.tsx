"use client";

import React from "react";
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
import Modal from "@/components/core/Modal/Modal";
import { UserProducts } from "@/ts/models/booking/product/Product";
import ProductsPickerContent, {
  ProductsPickerContentProps,
} from "./ProductsPickerContent";

type ProductsPickerProps = Omit<ProductsPickerContentProps, "products"> & {
  open: boolean;
  title: string;
  products: UserProducts | undefined;
  isLoading: boolean;
  footer: React.ReactNode;
  onClose: () => void;
};

const ProductsPicker = ({
  open,
  title,
  products,
  isLoading,
  footer,
  onClose,
  ...contentProps
}: ProductsPickerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const body =
    isLoading || !products ? (
      <Box sx={styles.loading}>
        <CircularProgress />
      </Box>
    ) : products.data.length === 0 ? (
      <Typography color="text.secondary" sx={styles.empty}>
        Nu există servicii disponibile.
      </Typography>
    ) : (
      <ProductsPickerContent products={products} {...contentProps} />
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

          <Typography fontWeight={700}>{title}</Typography>

          <Box sx={{ width: 34 }} />
        </Stack>

        <Box sx={styles.drawerContent}>{body}</Box>

        <Divider />
        <Box sx={{ p: 2 }}>{footer}</Box>
      </Drawer>
    );
  }

  return (
    <Modal
      title={title}
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      customFooter={footer}
    >
      <Box sx={styles.modalBody}>{body}</Box>
    </Modal>
  );
};

export default ProductsPicker;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  drawerPaper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: "90vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  drawerContent: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column" as const,
  },
  modalBody: {
    height: "min(70vh, 680px)",
    display: "flex",
    flexDirection: "column" as const,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    py: 8,
  },
  empty: {
    textAlign: "center" as const,
    py: 6,
  },
};
