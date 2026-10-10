"use client";

import * as React from "react";
import { useState } from "react";
import { Session } from "next-auth";
import {
  useDeleteProduct,
  useGetProductsByBusinessAndEmployee,
} from "@/controllers/booking/product.controller";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import { MyProductsTabs } from "./MyProductsTabs";
import { useScrollSync } from "@/components/modules/Marketplace/BookingModule/useScrollSync";
import ProductsStepSkeleton from "@/components/modules/Marketplace/BookingModule/steps/Products/ProductsStepSkeleton";
import ErrorMessage from "@/components/cutomized/NotFound/ErrorMessage";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import AddProductModal from "./AddProductModal/AddProductModal";
import EditProductModal from "./EditProductModal/EditProductModal";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { Product } from "@/ts/models/booking/product/Product";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

const HEADER_HEIGHT = 88;
const TABS_HEIGHT = 72;
const SCROLL_GAP = 16;

type MyProductsModuleProps = {
  session: Session | null;
};

type DeleteConfirmState = {
  open: boolean;
  productId: number | null;
};

export default function MyProductsModule({ session }: MyProductsModuleProps) {
  const theme = useTheme();

  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>({
    open: false,
    productId: null,
  });
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const isEmployee = session?.business_owner_id !== session?.user_id;

  const { data, isLoading, isError } = useGetProductsByBusinessAndEmployee({
    businessId: session?.business_id ?? 0,
    employeeId: isEmployee ? (session?.user_id ?? null) : null,
    onlyServicesWithProducts: false,
  });

  const { mutate: deleteProduct, isPending: isLoadingDelete } =
    useDeleteProduct();

  const isDesktopHeader = useMediaQuery(theme.breakpoints.up("lg"));
  const headerOffset = isDesktopHeader ? HEADER_HEIGHT : 0;
  const scrollOffset = headerOffset + TABS_HEIGHT + SCROLL_GAP;

  const sync = useScrollSync(
    data ?? { total_count: 0, data: [] },
    scrollOffset
  );

  const pageBgcolor =
    theme.palette.mode === "light" ? "background.paper" : "background.default";

  const handleCloseDeleteConfirm = () =>
    setDeleteConfirm({ open: false, productId: null });

  const handleConfirmDelete = () => {
    if (!deleteConfirm.productId) return;

    deleteProduct(deleteConfirm.productId, {
      onSuccess: () => {
        toast.success("Serviciul a fost șters cu succes!");
        handleCloseDeleteConfirm();
      },
      onError: () => {
        toast.error("A apărut o eroare la ștergerea serviciului.");
      },
    });
  };

  if (!session?.business_id) return null;

  return (
    <Box sx={styles.container}>
      <HeaderMobile
        title="Serviciile mele"
        customAction={
          <Protected permission={PermissionEnum.PRODUCT_EDIT}>
            <IconButton onClick={() => setIsAddProductOpen(true)}>
              <AddIcon />
            </IconButton>
          </Protected>
        }
      />

      <Box sx={[styles.scrollArea, { bgcolor: pageBgcolor }]}>
        <ConfirmationModal
          open={deleteConfirm.open}
          primaryActionTitle="Șterge"
          title="Confirmare ștergere"
          isLoading={isLoadingDelete}
          message="Ești sigur că vrei să ștergi acest serviciu? Această acțiune nu poate fi anulată."
          onClose={handleCloseDeleteConfirm}
          onConfirm={handleConfirmDelete}
        />

        <AddProductModal
          session={session}
          open={isAddProductOpen}
          handleClose={() => setIsAddProductOpen(false)}
        />

        {editingProduct && (
          <EditProductModal
            session={session}
            open
            product={editingProduct}
            handleClose={() => setEditingProduct(null)}
          />
        )}

        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={[
            styles.header,
            { display: { xs: "none", lg: "flex" }, bgcolor: pageBgcolor },
          ]}
        >
          <Typography variant="h4" fontWeight={700}>
            Serviciile mele
          </Typography>

          <Protected permission={PermissionEnum.PRODUCT_EDIT}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => setIsAddProductOpen(true)}
            >
              Adaugă serviciu
            </Button>
          </Protected>
        </Stack>

        <Box sx={{ px: 2.5, pb: 2.5 }}>
          {isLoading && <ProductsStepSkeleton />}

          {!isLoading && isError && <ErrorMessage resource="servicii" />}

          {!isLoading && !isError && data?.total_count === 0 && (
            <NotFound
              icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 50 }} />}
              title="Servicii"
              description="Nu ai adăugat încă niciun serviciu sau produs."
            />
          )}

          {!isLoading && !isError && !!data && data.total_count > 0 && (
            <Box sx={{ minWidth: 0 }}>
              <MyProductsTabs top={headerOffset} sync={sync} products={data} />

              <Box>
                {data.data.map((group, index) => (
                  <Box
                    key={group.service.id}
                    data-index={index}
                    ref={(el: HTMLDivElement | null) => {
                      if (sync.sectionRefs.current)
                        sync.sectionRefs.current[index] = el;
                    }}
                    sx={{ mb: 5, scrollMarginTop: scrollOffset }}
                  >
                    <Typography variant="h5" fontWeight={700} mb={3}>
                      {group.service.short_name}
                    </Typography>

                    {group.products.length === 0 ? (
                      <Typography color="text.secondary">
                        Nu au fost găsite servicii
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                          },
                          gap: 2,
                        }}
                      >
                        {group.products.map((prod) => (
                          <ProductCard
                            key={prod.id}
                            product={prod}
                            isSelected={false}
                            showIcon={false}
                            displayEditableActions
                            isLoadingDelete={
                              isLoadingDelete &&
                              deleteConfirm.productId === prod.id
                            }
                            onOpenDetail={() => {}}
                            onAdd={() => {}}
                            onNavigateToBooking={() => {}}
                            onEditProduct={() => setEditingProduct(prod)}
                            onDeleteProduct={(productId) =>
                              setDeleteConfirm({ open: true, productId })
                            }
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  scrollArea: {
    flexGrow: 1,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    overscrollBehaviorY: "contain",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 11,
    height: HEADER_HEIGHT,
    px: 2.5,
  },
};
