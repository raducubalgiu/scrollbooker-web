"use client";

import Table, { TableRowAndTable } from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import {
  getProductTypeLabel,
  ProductTypeEnum,
} from "@/ts/enums/ProductTypeEnum";
import { Button, Checkbox, Stack } from "@mui/material";
import dayjs from "dayjs";
import { MRT_ActionMenuItem, MRT_ColumnDef } from "material-react-table";
import * as React from "react";
import EmployeeButton from "../../AppointmentsModule/EmployeeButton";
import { Session } from "next-auth/core/types";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ProductTypeButton from "./ProductTypeButton";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import AddProductModal from "./AddProductModal";
import ServiceDomainButton from "./ServiceDomainButton";
import ServiceButton from "./ServiceButton";
import { Product } from "@/ts/models/booking/product/Product";

type MyProductsModuleProps = {
  session: Session | null;
};

export default function MyProductsModule({ session }: MyProductsModuleProps) {
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);

  const [productType, setProductType] = React.useState<ProductTypeEnum | null>(
    null
  );
  const [employeeId, setEmployeeId] = React.useState<number | null>(null);
  const [serviceDomainId, setServiceDomainId] = React.useState<number | null>(
    null
  );
  const [serviceId, setServiceId] = React.useState<number | null>(null);

  const extraParams = React.useMemo(
    () => ({
      employee_id: employeeId ?? undefined,
      product_type: productType ?? undefined,
      service_domain_id: serviceDomainId ?? undefined,
      service_id: serviceId ?? undefined,
    }),
    [employeeId, productType, serviceDomainId, serviceId]
  );

  const { data, isLoading, pagination, setPagination } =
    useTableHandlers<Product>({
      route: "/my-business/products",
      extraParams,
      queryOptions: {
        keepPreviousData: true,
        staleTime: 30000,
        refetchOnWindowFocus: false,
      },
    });

  const columns = React.useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableEditing: false,
        Cell: ({ row }) => <span>#{row.original.id}</span>,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
        Cell: ({ row }) => (
          <span>
            {row.original.description
              ? row.original.description.length > 50
                ? row.original.description.substring(0, 50) + "..."
                : row.original.description
              : "-"}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Tip serviciu",
        size: 100,
        Cell: ({ row }) => (
          <span>{getProductTypeLabel(row.original.type)}</span>
        ),
      },
      {
        accessorKey: "sessions_count",
        header: "Sedințe",
        size: 100,
        Cell: ({ row }) => <span>{row.original.sessions_count ?? 1}</span>,
      },
      {
        accessorKey: "validity_days",
        header: "Valabilitate (Nr zile)",
        size: 200,
        Cell: ({ row }) => (
          <span>{row.original.validity_days ?? "Nelimitat"}</span>
        ),
      },
      {
        accessorKey: "can_be_booked",
        header: "Poate fi rezervat?",
        size: 50,
        Cell: ({ row }) => (
          <Checkbox checked={row.original.can_be_booked} disabled={true} />
        ),
      },
      {
        accessorKey: "created_at",
        header: "Dată creare",
        enableEditing: false,
        Cell: ({ row }) => {
          const date = new Date(row.original.created_at);
          return (
            <span>
              {dayjs(date).locale("ro").format("DD MMM YYYY, HH:mm:ss")}
            </span>
          );
        },
      },
    ],
    []
  );

  const getToolbarCustomActions = React.useCallback(() => {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="contained"
          disableElevation
          size="large"
          onClick={() => setOpenAddModal(true)}
        >
          Adaugă un serviciu
        </Button>
        {!session?.is_employee && (
          <EmployeeButton
            employee={employeeId}
            onSetEmployee={(id) => setEmployeeId(id)}
          />
        )}
        <ProductTypeButton type={productType} onSetType={setProductType} />
        <ServiceDomainButton
          serviceDomainId={serviceDomainId}
          onSetServiceDomain={setServiceDomainId}
        />
        <ServiceButton serviceId={serviceId} onSetService={setServiceId} />
      </Stack>
    );
  }, [session, productType, employeeId, serviceDomainId, serviceId]);

  const renderRowActionMenuItems = React.useCallback(
    ({ row, table }: TableRowAndTable<Product>) => {
      return [
        <MRT_ActionMenuItem
          key="edit"
          label="Editează serviciul"
          icon={<ModeEditOutlineOutlinedIcon />}
          onClick={() => {}}
          table={table}
        />,
        <MRT_ActionMenuItem
          key="delete"
          label="Șterge serviciul"
          icon={<DeleteOutlineOutlinedIcon />}
          onClick={() => setOpenDeleteConfirm(true)}
          table={table}
        />,
      ];
    },
    []
  );

  return (
    <MainLayout title="Serviciile mele" hideAction>
      <ConfirmationModal
        open={openDeleteConfirm}
        title="Confirmare ștergere"
        message="Ești sigur că vrei să ștergi acest serviciu? Această acțiune nu poate fi anulată."
        handleClose={() => setOpenDeleteConfirm(false)}
        handleSubmit={() => {}}
      />
      <AddProductModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
      />
      <Table<Product>
        data={data?.results}
        rowCount={data?.count}
        columns={columns}
        manualPagination={true}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
        enableRowActions={true}
        enableEditing={false}
        enableFilters={false}
        enableColumnFilters={false}
        enableSorting={false}
        renderTopToolbarCustomActions={getToolbarCustomActions}
        renderRowActionMenuItems={renderRowActionMenuItems}
      />
    </MainLayout>
  );
}
