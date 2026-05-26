"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";
import * as React from "react";
import { Session } from "next-auth/core/types";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import AddProductModal from "./AddProductModal/AddProductModal";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { useCustomQuery } from "@/hooks/useHttp";
import MyProductsDisplayTable from "./tabs/MyProductsDisplayTable";
import MyProductsDisplayTabs from "./tabs/MyProductsDisplayTabs";
import { useCallback, useMemo, useState } from "react";
import MyProductsTabs from "./tabs/MyProductsTabs";
import { Button, Stack } from "@mui/material";

type MyProductsModuleProps = {
  session: Session | null;
  employees: BusinessEmployee[];
};

export default function MyProductsModule({
  session,
  employees,
}: MyProductsModuleProps) {
  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const isEmployee = session?.is_employee;
  const authUserId = session?.user_id;

  const [employeeId, setEmployeeId] = useState<number | null>(
    session?.is_employee ? session.user_id : null
  );
  const [productType, setProductType] = useState<ProductTypeEnum | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);

  const extraParams = React.useMemo(() => {
    let resolvedEmployeeId: number | undefined = undefined;

    if (isEmployee) {
      resolvedEmployeeId = authUserId ?? undefined;
    } else if (employeeId != null) {
      resolvedEmployeeId = employeeId;
    }

    return {
      only_services_with_products: "false",
      employeeId: resolvedEmployeeId,
      product_type: productType ?? undefined,
      service_id: serviceId ?? undefined,
    };
  }, [isEmployee, authUserId, employeeId, productType, serviceId]);

  const { data, isLoading } = useCustomQuery<BusinessProductsResponse[]>({
    key: [
      "business-products",
      session?.business_id ?? undefined,
      productType ?? undefined,
      serviceId ?? undefined,
      employeeId ?? undefined,
    ],
    url: `/api/businesses/${session?.business_id}/products`,
    params: extraParams,
  });

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  const allProducts = memoizedData?.flatMap((item) => item.products);

  const handleTabChange = useCallback(
    (_event: React.MouseEvent<HTMLElement>, newTab: number) => {
      setCurrentTab(newTab);
    },
    []
  );

  const renderTab = () => {
    switch (currentTab) {
      case 0:
        return (
          <MyProductsDisplayTable
            allProducts={allProducts}
            productType={productType}
            setProductType={setProductType}
            isEmployee={session?.is_employee}
            employeeId={employeeId}
            setEmployeeId={setEmployeeId}
            employees={employees}
            serviceId={serviceId}
            setServiceId={setServiceId}
            isLoading={isLoading}
          />
        );
      case 1:
        return <MyProductsDisplayTabs />;
      default:
        return null;
    }
  };

  return (
    <MainLayout title="Serviciile mele" hideAction>
      <ConfirmationModal
        open={openDeleteConfirm}
        title="Confirmare ștergere"
        message="Ești sigur că vrei să ștergi acest serviciu? Această acțiune nu poate fi anulată."
        onClose={() => setOpenDeleteConfirm(false)}
        onConfirm={() => {}}
      />
      <AddProductModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        hasEmployees={session?.has_employees ?? false}
        employees={employees}
      />

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2.5}
      >
        <MyProductsTabs currentTab={currentTab} onTabChange={handleTabChange} />

        <Button
          variant="contained"
          size="large"
          disableElevation
          onClick={() => setOpenAddModal(true)}
        >
          Adauga un serviciu nou
        </Button>
      </Stack>

      {renderTab()}
    </MainLayout>
  );
}
