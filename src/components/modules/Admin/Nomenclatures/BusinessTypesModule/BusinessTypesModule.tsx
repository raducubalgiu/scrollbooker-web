"use client";

import MainLayout from "../../../../cutomized/MainLayout/MainLayout";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";
import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";
import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import BusinessTypeModal from "./BusinessTypeModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<BusinessType>;
  table: MRT_TableInstance<BusinessType>;
  closeMenu: () => void;
};

type BusinessTypeModalState = {
  open: boolean;
  data: BusinessType | null;
};

type BusinessTypeModuleProps = {
  initialData: PaginatedData<BusinessType>;
  businessDomains: BusinessDomain[];
  pageSize: number;
};

export default function BusinessTypesModule({
  initialData,
  businessDomains,
  pageSize,
}: BusinessTypeModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [openModal, setOpenModal] = useState<BusinessTypeModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, isError } = useCustomQuery<
    PaginatedData<BusinessType>
  >({
    key: ["business-types", pagination.pageIndex, pagination.pageSize],
    url: `/api/nomenclatures/business-types?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
    options: {
      ...(pagination.pageIndex === 0 && pagination.pageSize === 5
        ? { initialData }
        : {}),
    },
  });

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.getValue(column.id)}
            required
            minLength={3}
            maxLength={100}
          />
        ),
      },
      {
        accessorKey: "plural",
        header: "Plural",
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.getValue(column.id)}
            required
            minLength={3}
            maxLength={50}
          />
        ),
      },
      {
        accessorKey: "business_domain_id",
        header: "Business Domain Id",
        Edit: ({ row, column, cell }) => (
          <MR_Select
            row={row}
            column={column}
            value={Number(cell.getValue()) ?? ""}
            options={businessDomains.map((bd) => {
              return {
                value: bd.id,
                name: bd.name,
              };
            })}
          />
        ),
        Cell: ({ cell }) =>
          businessDomains?.find((bd) => bd.id === cell.getValue())?.name,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
      },
    ],
    [businessDomains]
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Editeaza"
        icon={<Edit />}
        onClick={() => {
          setOpenModal({
            open: true,
            data: row.original,
          });

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

  const renderTopToolbarCustomActions = useCallback(
    () => (
      <Button
        onClick={() => {
          setOpenModal({
            open: true,
            data: null,
          });
        }}
        variant="contained"
        disableElevation
      >
        Adaugă
      </Button>
    ),
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    rowCount: totalCount,

    enablePagination: true,
    manualPagination: true,

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
      pagination,
      isLoading: !tableData.length && isLoading,
      showAlertBanner: isError,
    },

    onPaginationChange: setPagination,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
  });

  return (
    <MainLayout title="Tip Business" hideAction>
      <BusinessTypeModal
        open={openModal.open}
        data={openModal.data}
        onClose={() => {}}
      />
      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
