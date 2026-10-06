"use client";

import * as React from "react";
import { Session } from "next-auth";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";

type MyProductsModuleProps = {
  session: Session | null;
};

export default function MyProductsModule({ session }: MyProductsModuleProps) {
  const theme = useTheme();

  if (!session?.business_id) return;

  const isEmployee = session?.business_owner_id !== session?.user_id;

  const { data } = useGetProductsByBusinessAndEmployee({
    businessId: session?.business_id,
    employeeId: isEmployee ? session?.user_id : null,
    onlyServicesWithProducts: false,
  });

  return (
    <MainLayout
      title="Serviciile mele"
      actionTitle="Adaugă serviciu"
      sx={{
        bgcolor:
          theme.palette.mode === "light"
            ? "background.paper"
            : "background.default",
        height: "100%",
      }}
    >
      {/* <ConfirmationModal
        open={deleteConfirmModal.open}
        primaryActionTitle="Șterge"
        title="Confirmare ștergere"
        isLoading={isLoadingDelete}
        message="Ești sigur că vrei să ștergi acest serviciu? Această acțiune nu poate fi anulată."
        onClose={() => setDeleteConfirmModal({ open: false, productId: null })}
        onConfirm={() => {
          handleDeleteProduct({ productId: deleteConfirmModal.productId });
        }}
      /> */}

      {/* <AddProductModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        hasEmployees={session?.has_employees ?? false}
        employees={employees}
        serviceDomainServices={serviceDomainServices || []}
        isSavingProduct={isSavingProduct}
        onCreateProduct={(prodCreate) => handleCreateProduct(prodCreate)}
      /> */}

      {data?.data.map((group, index) => (
        <Box
          key={group.service.id}
          data-index={index}
          // ref={(el: HTMLDivElement | null) => {
          //   if (sync.sectionRefs.current)
          //     sync.sectionRefs.current[index] = el;
          // }}
          // sx={{ mb: 8, scrollMarginTop: scrollOffset }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            {group.service.short_name}
          </Typography>
          <Stack spacing={2}>
            {group.products.map((prod) => {
              // const isSelected = selectedItems.some(
              //   (item) => item.productId === prod.id
              // );

              return (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isSelected={false}
                  showIcon={true}
                  onOpenDetail={() => {}}
                  onAdd={() => {}}
                  onNavigateToBooking={() => {}}
                />
              );
            })}
          </Stack>
        </Box>
      ))}
    </MainLayout>
  );
}
