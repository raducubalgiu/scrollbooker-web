"use client";

import { PaginatedData } from "@/components/core/Table/Table";
import MainLayout from "../../../../cutomized/MainLayout/MainLayout";
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
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { Service } from "@/ts/models/nomenclatures/service/Service";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Button, Checkbox } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import ServiceModal from "./ServiceModal";
import ServiceFilters from "./ServiceFilters";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Service>;
  table: MRT_TableInstance<Service>;
  closeMenu: () => void;
};

type ServiceModalState = {
  open: boolean;
  data: Service | null;
};

type ServicesModuleProps = {
  initialData: PaginatedData<Service>;
  businessDomains: BusinessDomain[];
  serviceDomains: ServiceDomain[];
  pageSize: number;
};

export default function ServicesModule({
  initialData,
  businessDomains,
  serviceDomains,
  pageSize,
}: ServicesModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [openModal, setOpenModal] = useState<ServiceModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, isError, refetch } = useCustomQuery<
    PaginatedData<Service>
  >({
    key: ["services", pagination.pageIndex, pagination.pageSize],
    url: `/api/nomenclatures/services?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
    options: {
      ...(pagination.pageIndex === 0 && pagination.pageSize === pageSize
        ? { initialData }
        : {}),
    },
  });

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-service"],
    url: "/api/nomenclatures/services",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const columns = useMemo<MRT_ColumnDef<Service>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "short_name",
        header: "Short Name",
      },
      {
        accessorKey: "business_domain_id",
        header: "Business Domain",
        Cell: ({ cell }) =>
          businessDomains?.find((bd) => bd.id === cell.getValue())?.name,
      },
      {
        accessorKey: "type",
        header: "Service Type",
      },
      {
        accessorKey: "active",
        header: "Active",
        Cell: ({ row }) => <Checkbox checked={row.original.active} disabled />,
      },
    ],
    [businessDomains, serviceDomains]
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
          handleDelete({ serviceId: row.original.id });

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
      isLoading: !tableData.length || isLoading || isPendingDelete,
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
    renderDetailPanel: ({ row }) => {
      return <ServiceFilters filters={row.original.filters} />;
    },
  });

  return (
    <MainLayout title="Servicii" hideAction>
      <ServiceModal
        open={openModal.open}
        data={openModal.data}
        businessDomains={businessDomains}
        onClose={() => setOpenModal({ open: false, data: null })}
        onSuccess={() => {
          refetch();
          setOpenModal({ open: false, data: null });
        }}
      />
      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
