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
import ServicesByServiceDomainModule from "./ServicesByServiceDomainModule";
import { Avatar, Button, Checkbox } from "@mui/material";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Delete, Edit } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import ServiceDomainsModal from "./ServiceDomainModal";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type ServiceDomainsModuleProps = {
  initialData: PaginatedData<ServiceDomain>;
  businessDomains: BusinessDomain[];
  pageSize: number;
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<ServiceDomain>;
  table: MRT_TableInstance<ServiceDomain>;
  closeMenu: () => void;
};

type ServiceDomainModalState = {
  open: boolean;
  data: ServiceDomain | null;
};

type ServiceDomainUploadModalState = {
  open: boolean;
  url: string | null | undefined;
};

export default function ServiceDomainsModule({
  initialData,
  businessDomains,
  pageSize,
}: ServiceDomainsModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [openModal, setOpenModal] = useState<ServiceDomainModalState>({
    open: false,
    data: null,
  });

  const [openUploadModal, setOpenUploadModal] =
    useState<ServiceDomainUploadModalState>({
      open: false,
      url: null,
    });

  console.log(openUploadModal);

  const { data, isLoading, isError, refetch } = useCustomQuery<
    PaginatedData<ServiceDomain>
  >({
    key: ["filters", pagination.pageIndex, pagination.pageSize],
    url: `/api/nomenclatures/service-domains?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
    options: {
      ...(pagination.pageIndex === 0 && pagination.pageSize === pageSize
        ? { initialData }
        : {}),
    },
  });

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-service-domain"],
    url: "/api/nomenclatures/service-domains",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const columns = useMemo<MRT_ColumnDef<ServiceDomain>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "url",
        header: "Imagine",
        size: 50,
        Cell: ({ row }) => (
          <Avatar
            variant="rounded"
            src={row.original.url ?? ""}
            sx={{ width: 50, height: 50 }}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Descriere",
      },
      {
        accessorKey: "created_at",
        header: "Created_at",
        enableEditing: false,
      },
      {
        accessorKey: "active",
        header: "Activ",
        size: 50,
        Cell: ({ row }) => <Checkbox checked={row.original.active} disabled />,
      },
    ],
    [businessDomains]
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Editeaza imaginea"
        icon={<ImageOutlinedIcon />}
        onClick={() => {
          setOpenUploadModal({
            open: true,
            url: row.original.url,
          });
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={1}
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
        key={2}
        label="Șterge"
        icon={<Delete />}
        onClick={() => {
          handleDelete({ serviceDomainId: row.original.id });

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
      return <ServicesByServiceDomainModule services={row.original.services} />;
    },
  });

  return (
    <MainLayout title="Service Domains" hideAction>
      <ServiceDomainsModal
        open={openModal.open}
        data={openModal.data}
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
