"use client";

import { useState, useMemo, useCallback } from "react";
import { Button, Switch } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_PaginationState,
  MRT_ActionMenuItem,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { toast } from "react-toastify";
import {
  BusinessType,
  BusinessTypeCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessType/BusinessType";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  useAllBusinessTypes,
  useCreateBusinessType,
  useDeleteBusinessType,
  useUpdateBusinessType,
} from "@/controllers/nomenclature/business-type.controller";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import BusinessTypeModal from "./BusinessTypeModal";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<BusinessType>;
  table: MRT_TableInstance<BusinessType>;
  closeMenu: () => void;
};

type BusinessTypeModalState = {
  open: boolean;
  data: BusinessType | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

type BusinessTypeModuleProps = {
  businessDomains: BusinessDomain[];
};

export default function BusinessTypesModule({
  businessDomains,
}: BusinessTypeModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [openModal, setOpenModal] = useState<BusinessTypeModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading, isError } = useAllBusinessTypes({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    all: true,
  });

  const { mutate: createType, isPending: isPendingCreate } =
    useCreateBusinessType();
  const { mutate: updateType, isPending: isPendingUpdate } =
    useUpdateBusinessType();
  const { mutate: deleteType, isPending: isPendingDelete } =
    useDeleteBusinessType();

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveBusinessType = (formData: BusinessTypeCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateType(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Tipul de business a fost modificat cu succes!");
            handleCloseModal();
          },
          onError: () =>
            toast.error("Eroare la modificarea tipului de business."),
        }
      );
    } else {
      createType(formData, {
        onSuccess: () => {
          toast.success("Tipul de business a fost adăugat cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea tipului de business."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteType(deleteModal.id, {
      onSuccess: () => {
        toast.success("Tipul de business a fost șters cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => toast.error("A apărut o eroare la ștergere."),
    });
  };

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
      },
      {
        accessorKey: "plural",
        header: "Plural",
      },
      {
        accessorKey: "business_domain_id",
        header: "Business Domain Id",
        Cell: ({ cell }) =>
          businessDomains?.find((bd) => bd.id === cell.getValue())?.name,
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
        businessDomains={businessDomains}
        onClose={handleCloseModal}
        onSave={handleSaveBusinessType}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi tipul de business "${deleteModal.name}"? Această acțiune este ireversibilă.`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
