"use client";

import MainLayout from "../../../../cutomized/MainLayout/MainLayout";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { Button, Switch } from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Delete, Edit } from "@mui/icons-material";
import BusinessDomainModal from "./BusinessDomainModal";
import BusinessDomainsServiceDomains from "./BusinessDomainsServiceDomains";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<BusinessDomain>;
  table: MRT_TableInstance<BusinessDomain>;
  closeMenu: () => void;
};

type BusinessDomainModalState = {
  open: boolean;
  data: BusinessDomain | null;
};

type BusinessDomainsModuleProps = {
  initialData: BusinessDomain[];
};

export default function BusinessDomainsModule({
  initialData,
}: BusinessDomainsModuleProps) {
  const [openModal, setOpenModal] = useState<BusinessDomainModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, refetch } = useCustomQuery<BusinessDomain[]>({
    key: ["businessDomains"],
    url: `/api/nomenclatures/business-domains?all=true`,
    options: {
      initialData: initialData ?? [],
    },
  });

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-business-domain"],
    url: "/api/nomenclatures/business-domains",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

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
          handleDelete({ businessDomainId: row.original.id });

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

  const columns = useMemo<MRT_ColumnDef<BusinessDomain>[]>(
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
        size: 300,
      },
      {
        accessorKey: "short_name",
        header: "Short name",
        size: 300,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 300,
        Cell: ({ row }) => (
          <Switch checked={row.original.active} disabled={true} />
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created_at",
        enableEditing: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: memoizedData,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
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
      showLoadingOverlay: isPendingDelete,
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
      return (
        <BusinessDomainsServiceDomains data={row.original.service_domains} />
      );
    },
  });

  return (
    <MainLayout title="Domeniu Business" hideAction>
      <BusinessDomainModal
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
