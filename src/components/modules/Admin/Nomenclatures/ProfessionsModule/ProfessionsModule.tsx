"use client";

import { useState, useMemo } from "react";
import { Switch } from "@mui/material";
import { type MRT_ColumnDef, type MRT_PaginationState } from "material-react-table";
import { toast } from "react-toastify";
import {
  Profession,
  ProfessionCreateOrUpdate,
  ProfessionWithBusinessTypes,
} from "@/ts/models/nomenclatures/profession/ProfessionType";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  useAllProfessionsWithBusinessTypes,
  useCreateProfession,
  useDeleteProfession,
  useUpdateProfession,
} from "@/controllers/nomenclature/profession.controller";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import ProfessionModal from "./ProfessionModal";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import ProfessionBusinessTypes from "./ProfessionBusinessTypes";
import CustomTable from "@/components/core/Table/CustomTable";

type ProfessionModalState = {
  open: boolean;
  data: Profession | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

type ProfessionModuleProps = {
  businessDomains: BusinessDomain[];
};

export default function ProfessionsModule({
  businessDomains,
}: ProfessionModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [openModal, setOpenModal] = useState<ProfessionModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading, isError } = useAllProfessionsWithBusinessTypes({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const { mutate: createProfession, isPending: isPendingCreate } =
    useCreateProfession();
  const { mutate: updateProfession, isPending: isPendingUpdate } =
    useUpdateProfession();
  const { mutate: deleteProfession, isPending: isPendingDelete } =
    useDeleteProfession();

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveProfession = (formData: ProfessionCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateProfession(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Profesia a fost modificată cu succes!");
            handleCloseModal();
          },
          onError: () => toast.error("Eroare la modificarea profesiei."),
        }
      );
    } else {
      createProfession(formData, {
        onSuccess: () => {
          toast.success("Profesia a fost adăugată cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea profesiei."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteProfession(deleteModal.id, {
      onSuccess: () => {
        toast.success("Profesia a fost ștearsă cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => toast.error("A apărut o eroare la ștergerea profesiei."),
    });
  };

  const columns = useMemo<MRT_ColumnDef<ProfessionWithBusinessTypes>[]>(
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
      },
      {
        accessorKey: "active",
        header: "Active",
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

  return (
    <MainLayout title="Profesii" hideAction>
      <ProfessionModal
        open={openModal.open}
        data={openModal.data}
        businessDomains={businessDomains}
        onClose={handleCloseModal}
        onSave={handleSaveProfession}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi profesia "${deleteModal.name}"?`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <CustomTable<ProfessionWithBusinessTypes>
        columns={columns}
        data={tableData}
        rowCount={totalCount}
        enablePagination
        manualPagination
        state={{
          pagination,
          isLoading: !tableData.length || isLoading,
          showLoadingOverlay: isPendingDelete,
          showAlertBanner: isError,
        }}
        onPaginationChange={setPagination}
        onAdd={() => setOpenModal({ open: true, data: null })}
        onEdit={(row) => setOpenModal({ open: true, data: row.original })}
        onDelete={(row) =>
          setDeleteModal({
            open: true,
            id: String(row.original.id),
            name: row.original.name,
          })
        }
        renderDetailPanel={({ row }) => (
          <ProfessionBusinessTypes
            professionId={row.original.id}
            attachedBusinessTypes={row.original.business_types}
          />
        )}
      />
    </MainLayout>
  );
}
