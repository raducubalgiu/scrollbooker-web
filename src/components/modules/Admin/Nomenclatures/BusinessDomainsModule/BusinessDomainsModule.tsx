"use client";

import MainLayout from "../../../../cutomized/MainLayout/MainLayout";
import {
  BusinessDomain,
  BusinessDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
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
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Delete, Edit } from "@mui/icons-material";
import BusinessDomainModal from "./BusinessDomainModal";
import BusinessDomainsServiceDomains from "./BusinessDomainsServiceDomains";
import {
  useCreateBusinessDomain,
  useDeleteBusinessDomain,
  useGetAllBusinessDomains,
  useUpdateBusinessDomain,
} from "@/controllers/nomenclature/business-domain.controller";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<BusinessDomain>;
  table: MRT_TableInstance<BusinessDomain>;
  closeMenu: () => void;
};

type BusinessDomainModalState = {
  open: boolean;
  data: BusinessDomain | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

export default function BusinessDomainsModule() {
  const [openModal, setOpenModal] = useState<BusinessDomainModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading } = useGetAllBusinessDomains({ all: true });

  const { mutate: createDomain, isPending: isPendingCreate } =
    useCreateBusinessDomain();
  const { mutate: updateDomain, isPending: isPendingUpdate } =
    useUpdateBusinessDomain();
  const { mutate: deleteDomain, isPending: isPendingDelete } =
    useDeleteBusinessDomain();

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });

  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteDomain(deleteModal.id, {
      onSuccess: () => {
        toast.success("Domeniul a fost șters cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => {
        toast.error("A apărut o eroare la ștergere.");
      },
    });
  };

  const handleSaveDomain = (formData: BusinessDomainCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateDomain(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Domeniul a fost modificat cu succes!");
            handleCloseModal();
          },
          onError: () => toast.error("Eroare la modificarea domeniului."),
        }
      );
    } else {
      createDomain(formData, {
        onSuccess: () => {
          toast.success("Domeniul a fost adăugat cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea domeniului."),
      });
    }
  };

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Editeaza"
        icon={<Edit />}
        onClick={() => {
          setOpenModal({ open: true, data: row.original });
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={1}
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

  const columns = useMemo<MRT_ColumnDef<BusinessDomain>[]>(
    () => [
      { accessorKey: "id", header: "ID", size: 50, enableEditing: false },
      { accessorKey: "name", header: "Name", size: 300 },
      { accessorKey: "short_name", header: "Short name", size: 300 },
      {
        accessorKey: "active",
        header: "Active",
        size: 300,
        Cell: ({ row }) => <Switch checked={row.original.active} disabled />,
      },
      { accessorKey: "created_at", header: "Created_at", enableEditing: false },
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
    localization: MRT_Localization_RO,
    state: {
      isLoading,
      showLoadingOverlay: isPendingDelete,
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: { borderRadius: 2.5, border: "1px solid", borderColor: "divider" },
    },
    renderDetailPanel: ({ row }) => (
      <BusinessDomainsServiceDomains data={row.original.service_domains} />
    ),
  });

  return (
    <MainLayout title="Domeniu Business" hideAction>
      <BusinessDomainModal
        open={openModal.open}
        data={openModal.data}
        onClose={handleCloseModal}
        onSave={handleSaveDomain}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi domeniul de business "${deleteModal.name}"? Această acțiune este ireversibilă.`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
