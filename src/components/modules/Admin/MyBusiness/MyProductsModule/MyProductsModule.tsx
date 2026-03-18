"use client";

import Table, { TableRowAndTable } from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import {
  getProductTypeLabel,
  ProductTypeEnum,
} from "@/ts/enums/ProductTypeEnum";
import { ProductResponse } from "@/ts/models/booking/product/ProductResponse";
import { Button, Checkbox, Stack } from "@mui/material";
import dayjs from "dayjs";
import { MRT_ActionMenuItem, MRT_ColumnDef } from "material-react-table";
import * as React from "react";
import EmployeeButton from "../../AppointmentsModule/EmployeeButton";
import { Session } from "next-auth/core/types";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ProductTypeButton from "./ProductTypeButton";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import AddProductModal from "./AddProductModal";
import ServiceDomainButton from "./ServiceDomainButton";
import ServiceButton from "./ServiceButton";

type MyProductsModuleProps = {
  session: Session | null;
};

export default function MyProductsModule({ session }: MyProductsModuleProps) {
  const theme = useTheme();
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

  const { data, isLoading, pagination, setPagination } =
    useTableHandlers<ProductResponse>({
      route: "/my-business/products",
      extraParams: {
        employee_id: employeeId ?? undefined,
        product_type: productType ?? undefined,
        service_domain_id: serviceDomainId ?? undefined,
        service_id: serviceId ?? undefined,
      },
    });

  const columns = React.useMemo<MRT_ColumnDef<ProductResponse>[]>(
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
        accessorKey: "service_domain_id",
        header: "Categoria",
        size: 150,
        Cell: ({ row }) => <span>Tuns si Barba</span>,
      },
      {
        accessorKey: "service_id",
        header: "Serviciu",
        size: 150,
        Cell: ({ row }) => <span>Tuns</span>,
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
        accessorKey: "price",
        header: "Preț",
        size: 100,
        Cell: ({ row }) => <span>{row.original.price} RON</span>,
      },
      {
        accessorKey: "discount",
        header: "Discount",
        size: 50,
        Cell: ({ row }) => <span>{row.original.discount}%</span>,
      },
      {
        accessorKey: "price_with_discount",
        header: "Preț final",
        size: 50,
        Cell: ({ row }) => (
          <span style={{ fontWeight: 600 }}>
            {row.original.price_with_discount} RON
          </span>
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
          Adaugă produs
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
    ({ row, table }: TableRowAndTable<ProductResponse>) => {
      return [
        <MRT_ActionMenuItem
          key="edit"
          label="Editează produsul"
          icon={<ModeEditOutlineOutlinedIcon />}
          onClick={() => {
            // TODO: implement view details action
          }}
          table={table}
        />,
        <MRT_ActionMenuItem
          key="delete"
          label="Șterge produsul"
          icon={<DeleteOutlineOutlinedIcon />}
          onClick={() => setOpenDeleteConfirm(true)}
          table={table}
        />,
      ];
    },
    []
  );

  return (
    <MainLayout title="Produse" hideAction>
      <ConfirmationModal
        open={openDeleteConfirm}
        title="Confirmare ștergere"
        message="Ești sigur că vrei să ștergi acest produs? Această acțiune nu poate fi anulată."
        handleClose={() => setOpenDeleteConfirm(false)}
        handleSubmit={() => {}}
      />
      <AddProductModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
      />
      <Table<ProductResponse>
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
