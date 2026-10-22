"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { UnfinishedRegistration } from "@/ts/models/auth/auth";
import { type MRT_ColumnDef } from "material-react-table";
import { useMemo, useState } from "react";
import {
  useDeleteUnfinishedRegistration,
  useUnfinishedRegistrations,
} from "@/controllers/auth/auth.controller";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import CustomTable from "@/components/core/Table/CustomTable";

type DeleteModalState = {
  open: boolean;
  id: number | null;
  email: string;
};

export default function UnfinishedRegistrationsModule() {
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    email: "",
  });

  const { data, isLoading } = useUnfinishedRegistrations({
    page: 1,
    limit: 100,
  });

  const { mutate: deleteUnfinishedRegistration, isPending: isPendingDelete } =
    useDeleteUnfinishedRegistration();

  const tableData = useMemo(() => data?.results || [], [data]);

  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, email: "" });

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteUnfinishedRegistration(deleteModal.id, {
      onSuccess: () => {
        toast.success("Userul a fost șters cu succes!");
        handleCloseDeleteModal();
      },
      onError: (error) => {
        toast.error(error.message || "Ștergerea a eșuat.");
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<UnfinishedRegistration>[]>(
    () => [
      { accessorKey: "id", header: "ID", size: 50 },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "username", header: "Username" },
      { accessorKey: "fullname", header: "Fullname" },
      { accessorKey: "role_name", header: "Rol" },
      { accessorKey: "registration_step", header: "Blocat la pasul" },
      { accessorKey: "created_at", header: "Creat la" },
    ],
    []
  );

  return (
    <MainLayout
      title="Înregistrări nefinalizate"
      hideAction
      sx={{ bgcolor: "background.paper", height: "100%" }}
    >
      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi userul "${deleteModal.email}"? Această acțiune este ireversibilă.`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <CustomTable<UnfinishedRegistration>
        columns={columns}
        data={tableData}
        state={{
          isLoading,
          showLoadingOverlay: isPendingDelete,
        }}
        onDelete={(row) =>
          setDeleteModal({
            open: true,
            id: row.original.id,
            email: row.original.email,
          })
        }
      />
    </MainLayout>
  );
}
