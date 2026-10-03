"use client";

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
import {
  ServiceDomain,
  ServiceDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { Delete, Edit } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import ServiceDomainsModal from "./ServiceDomainModal";
import {
  useAllServiceDomains,
  useCreateServiceDomain,
  useDeleteServiceDomain,
  useUpdateServiceDomain,
} from "@/controllers/nomenclature/service-domain.controller";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<ServiceDomain>;
  table: MRT_TableInstance<ServiceDomain>;
  closeMenu: () => void;
};

type ServiceDomainModalState = {
  open: boolean;
  data: ServiceDomain | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

export default function ServiceDomainsModule() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [openModal, setOpenModal] = useState<ServiceDomainModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading, isError } = useAllServiceDomains({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    all: true,
  });

  const { mutate: createServiceDomain, isPending: isPendingCreate } =
    useCreateServiceDomain();
  const { mutate: updateServiceDomain, isPending: isPendingUpdate } =
    useUpdateServiceDomain();
  const { mutate: deleteServiceDomain, isPending: isPendingDelete } =
    useDeleteServiceDomain();

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveServiceDomain = (formData: ServiceDomainCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateServiceDomain(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Domeniul de serviciu a fost modificat cu succes!");
            handleCloseModal();
          },
          onError: () =>
            toast.error("Eroare la modificarea domeniului de serviciu."),
        }
      );
    } else {
      createServiceDomain(formData, {
        onSuccess: () => {
          toast.success("Domeniul de serviciu a fost adăugat cu succes!");
          handleCloseModal();
        },
        onError: () =>
          toast.error("Eroare la adăugarea domeniului de serviciu."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteServiceDomain(String(deleteModal.id), {
      onSuccess: () => {
        toast.success("Domeniul de serviciu a fost șters cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => {
        toast.error("A apărut o eroare la ștergere.");
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<ServiceDomain>[]>(
    () => [
      { accessorKey: "id", header: "ID", size: 50, enableEditing: false },
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
      { accessorKey: "name", header: "Name" },
      { accessorKey: "description", header: "Descriere" },
      { accessorKey: "created_at", header: "Created_at", enableEditing: false },
      {
        accessorKey: "active",
        header: "Activ",
        size: 50,
        Cell: ({ row }) => <Checkbox checked={row.original.active} disabled />,
      },
    ],
    []
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={1}
        label="Editeaza"
        icon={<Edit />}
        onClick={() => {
          setOpenModal({ open: true, data: row.original });
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={2}
        label="Șterge"
        icon={<Delete />}
        onClick={() => {
          setDeleteModal({
            open: true,
            id: String(row.original.id),
            name: row.original.name,
          });
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
        onClick={() => setOpenModal({ open: true, data: null })}
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
    localization: MRT_Localization_RO,
    state: {
      pagination,
      isLoading: !tableData.length || isLoading,
      showLoadingOverlay: isPendingDelete,
      showAlertBanner: isError,
    },
    onPaginationChange: setPagination,
    muiTablePaperProps: {
      elevation: 0,
      sx: { borderRadius: 2.5, border: "1px solid", borderColor: "divider" },
    },
    renderDetailPanel: ({ row }) => (
      <ServicesByServiceDomainModule services={row.original.services} />
    ),
  });

  return (
    <MainLayout title="Service Domains" hideAction>
      <ServiceDomainsModal
        open={openModal.open}
        data={openModal.data}
        onClose={handleCloseModal}
        onSave={handleSaveServiceDomain}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi domeniul de serviciu "${deleteModal.name}"? Această acțiune este ireversibilă.`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
