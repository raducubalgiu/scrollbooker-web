import {
  getProductTypeLabel,
  ProductTypeEnum,
} from "@/ts/enums/ProductTypeEnum";
import { Product } from "@/ts/models/booking/product/Product";
import { Delete, Edit } from "@mui/icons-material";
import { Checkbox, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import React, { memo, useCallback } from "react";
import EmployeeButton from "../../../AppointmentsModule/EmployeeButton";
import ProductTypeButton from "../ProductTypeButton";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import ServiceButton from "../ServiceButton";
import MyProductVariants from "./MyProductVariants";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Product>;
  table: MRT_TableInstance<Product>;
  closeMenu: () => void;
};

type MyProductsDisplayTableProps = {
  allProducts: Product[] | undefined;
  productType: ProductTypeEnum | null;
  setProductType: (type: ProductTypeEnum | null) => void;
  isEmployee: boolean | null | undefined;
  employeeId: number | null;
  setEmployeeId: (e: number | null) => void;
  employees: BusinessEmployee[];
  serviceId: number | null;
  setServiceId: (s: number | null) => void;
  isLoading: boolean;
};

const MyProductsDisplayTable = ({
  allProducts,
  productType,
  setProductType,
  isEmployee,
  employeeId,
  setEmployeeId,
  employees,
  serviceId,
  setServiceId,
  isLoading,
}: MyProductsDisplayTableProps) => {
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
        Cell: ({ row }) => <span>{row.original.sessions_count ?? "N/A"}</span>,
      },
      {
        accessorKey: "validity_days",
        header: "Valabilitate (Nr zile)",
        size: 200,
        Cell: ({ row }) => <span>{row.original.validity_days ?? "N/A"}</span>,
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
        accessorKey: "starting_price",
        header: "Preț",
        size: 150,
        Cell: ({ row }) => {
          const hasDifferentPrice = row.original.has_different_prices;
          const startingOffering = row.original.starting_offering;

          return (
            <Typography>
              {hasDifferentPrice && "de la"}{" "}
              <span style={{ fontWeight: 600 }}>
                {startingOffering.price_with_discount} lei
              </span>
            </Typography>
          );
        },
      },
    ],
    []
  );

  const renderTopToolbarCustomActions = React.useCallback(
    ({ table }: { table: MRT_TableInstance<Product> }) => {
      console.log("TABLE!!!", table);
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          {!isEmployee && (
            <EmployeeButton
              employees={employees}
              employee={employeeId}
              onSetEmployee={(id) => setEmployeeId(id)}
            />
          )}
          <ProductTypeButton type={productType} onSetType={setProductType} />
          <ServiceButton serviceId={serviceId} onSetService={setServiceId} />
        </Stack>
      );
    },
    [isEmployee, employees, employeeId, productType]
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Editeaza"
        icon={<Edit />}
        onClick={() => {
          console.log("ROW ID", row.original.id);
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={1}
        label="Șterge"
        icon={<Delete />}
        onClick={() => {
          closeMenu();
        }}
        table={table}
      />,
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: allProducts ?? [],

    enablePagination: true,
    manualPagination: true,

    enableFilters: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: true,
    renderRowActionMenuItems,
    renderTopToolbarCustomActions,
    positionActionsColumn: "last",
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    localization: MRT_Localization_RO,
    state: {
      isLoading,
    },

    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
    renderDetailPanel: ({ row }) => {
      return <MyProductVariants variants={row.original.variants} />;
    },
  });

  return <MaterialReactTable table={table} />;
};

export default memo(MyProductsDisplayTable);
