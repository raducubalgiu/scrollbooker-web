"use client";

import * as React from "react";
import { Session } from "next-auth";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import MyProductsDisplayTable from "./tabs/MyProductsDisplayTable/MyProductsDisplayTable";
import { useTheme } from "@mui/material";

type MyProductsModuleProps = {
  session: Session | null;
};

export default function MyProductsModule({ session }: MyProductsModuleProps) {
  const theme = useTheme();

  if (!session?.business_id) return;

  const isEmployee = session?.business_owner_id !== session?.user_id;

  const { data, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId: session?.business_id,
    employeeId: isEmployee ? session?.user_id : null,
    onlyServicesWithProducts: false,
  });

  return (
    <MainLayout
      title="Serviciile mele"
      hideAction
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
      />

      <MyProductsHeader
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenAddModal={() => setOpenAddModal(true)}
      /> */}

      <MyProductsDisplayTable
        userProducts={data}
        isLoading={isLoading}
        onDelete={() => []}
      />
    </MainLayout>
  );
}
