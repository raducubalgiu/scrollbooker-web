"use client";

import { useState, useMemo, useCallback } from "react";
import { Button, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableInstance,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { toast } from "react-toastify";
import {
  Consent,
  ConsentCreateOrUpdate,
} from "@/ts/models/nomenclatures/consent/Consent";
import {
  useAllConsents,
  useCreateConsent,
  useDeleteConsent,
  useUpdateConsent,
} from "@/controllers/nomenclature/consent.controller";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import ConsentModal from "./ConsentModal";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Consent>;
  table: MRT_TableInstance<Consent>;
  closeMenu: () => void;
};

type ConsentModalState = {
  open: boolean;
  data: Consent | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

const ConsentsModule = () => {
  const [openModal, setOpenModal] = useState<ConsentModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading } = useAllConsents();

  const { mutate: createConsent, isPending: isPendingCreate } =
    useCreateConsent();
  const { mutate: updateConsent, isPending: isPendingUpdate } =
    useUpdateConsent();
  const { mutate: deleteConsent, isPending: isPendingDelete } =
    useDeleteConsent();

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveConsent = (formData: ConsentCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateConsent(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Consimțământul a fost modificat cu succes!");
            handleCloseModal();
          },
          onError: () => toast.error("Eroare la modificarea consimțământului."),
        }
      );
    } else {
      createConsent(formData, {
        onSuccess: () => {
          toast.success("Consimțământul a fost adăugat cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea consimțământului."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteConsent(deleteModal.id, {
      onSuccess: () => {
        toast.success("Consimțământul a fost șters cu succes!");
        handleCloseDeleteModal();
      },
      onError: () =>
        toast.error("A apărut o eroare la ștergerea consimțământului."),
    });
  };

  const columns = useMemo<MRT_ColumnDef<Consent>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "text",
        header: "Text",
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              fontSize: "0.85rem",
              lineHeight: "1.4",
            }}
            title={cell.getValue<string>()}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
      },
    ],
    []
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
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
  });

  return (
    <MainLayout title="Formulare de consimtamant" hideAction>
      <ConsentModal
        open={openModal.open}
        data={openModal.data}
        onClose={handleCloseModal}
        onSave={handleSaveConsent}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi consimțământul "${deleteModal.name}"?`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
};

export default ConsentsModule;
