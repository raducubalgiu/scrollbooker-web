import React, { memo, useCallback, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete, Edit } from "@mui/icons-material";
import { SubFilter } from "@/ts/models/nomenclatures/subFilter/SubFilter";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { toast } from "react-toastify";
import {
  useAllSubFilters,
  useCreateSubFilter,
  useDeleteSubFilter,
  useUpdateSubFilter,
} from "@/controllers/nomenclature/sub-filter.controller";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import SubFilterModal, { SubFilterFormData } from "./SubFilterModal";

type SubFiltersModuleType = {
  filterId: number;
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<SubFilter>;
  table: MRT_TableInstance<SubFilter>;
  closeMenu: () => void;
};

type SubFilterModalState = {
  open: boolean;
  data: SubFilter | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

const SubFiltersModule = ({ filterId }: SubFiltersModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [openModal, setOpenModal] = useState<SubFilterModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading } = useAllSubFilters({
    page: 1,
    limit: 50,
    filterId: String(filterId),
  });

  const { mutate: createSubFilter, isPending: isPendingCreate } =
    useCreateSubFilter();
  const { mutate: updateSubFilter, isPending: isPendingUpdate } =
    useUpdateSubFilter();
  const { mutate: deleteSubFilter, isPending: isPendingDelete } =
    useDeleteSubFilter();

  const memoizedData = useMemo(() => data?.results || [], [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSave = (formData: SubFilterFormData) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateSubFilter(
        {
          id: String(openModal.data.id),
          data: { name: formData.name, active: formData.active },
        },
        {
          onSuccess: () => {
            toast.success("Subfiltrul a fost modificat cu succes!");
            handleCloseModal();
          },
        }
      );
    } else {
      createSubFilter(
        {
          name: formData.name,
          filter_id: filterId,
          description: formData.description || null,
        },
        {
          onSuccess: () => {
            toast.success("Subfiltrul a fost adăugat cu succes!");
            handleCloseModal();
          },
        }
      );
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteSubFilter(deleteModal.id, {
      onSuccess: () => {
        toast.success("Subfiltrul a fost șters cu succes!");
        handleCloseDeleteModal();
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<SubFilter>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nume",
        size: 300,
      },
      {
        accessorKey: "active",
        header: "Activ",
        Cell: ({ row }) => (
          <Checkbox checked={row.original.active} disabled />
        ),
      },
    ],
    []
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Editează"
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

  const table = useMaterialReactTable({
    columns,
    data: memoizedData,

    enablePagination: true,
    manualPagination: true,

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: true,
    renderTopToolbarCustomActions,
    positionActionsColumn: "last",
    renderRowActionMenuItems,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    localization: MRT_Localization_RO,
    state: {
      isLoading: isLoading,
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
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded((expanded) => !expanded)}
      sx={{ mb: 1.5 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span" sx={{ fontWeight: "600" }}>
          Subfiltre:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SubFilterModal
          open={openModal.open}
          data={openModal.data}
          onClose={handleCloseModal}
          onSave={handleSave}
          isSubmitting={isPendingCreate || isPendingUpdate}
        />

        <ConfirmationModal
          title="Confirmă ștergerea"
          primaryActionTitle="Șterge"
          message={`Sigur dorești să ștergi subfiltrul "${deleteModal.name}"? Această acțiune este ireversibilă.`}
          open={deleteModal.open}
          isLoading={isPendingDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />

        <MaterialReactTable table={table} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(SubFiltersModule);
