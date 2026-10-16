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
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete } from "@mui/icons-material";
import { Service } from "@/ts/models/nomenclatures/service/Service";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { toast } from "react-toastify";
import { useAllServices } from "@/controllers/nomenclature/service.controller";
import {
  useAttachServiceToServiceDomain,
  useDetachServiceFromServiceDomain,
} from "@/controllers/nomenclature/service-domain.controller";

type ServicesByServiceDomainModuleType = {
  serviceDomainId: number;
  services: Service[];
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Service>;
  table: MRT_TableInstance<Service>;
  closeMenu: () => void;
};

const ServicesByServiceDomainModule = ({
  serviceDomainId,
  services,
}: ServicesByServiceDomainModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const { data: allServices } = useAllServices();

  const { mutate: attachService, isPending: isPendingAttach } =
    useAttachServiceToServiceDomain();
  const { mutate: detachService, isPending: isPendingDetach } =
    useDetachServiceFromServiceDomain();

  const memoizedData = useMemo(() => services || [], [services]);

  const attachedIds = useMemo(
    () => new Set(memoizedData.map((service) => service.id)),
    [memoizedData]
  );

  const availableServices = useMemo(
    () =>
      (allServices || []).filter(
        (service) => service.active && !attachedIds.has(service.id)
      ),
    [allServices, attachedIds]
  );

  const handleAttach = useCallback(
    (service: Service | null) => {
      if (!service) return;

      attachService(
        {
          serviceDomainId: String(serviceDomainId),
          serviceId: String(service.id),
        },
        {
          onSuccess: () =>
            toast.success(`Serviciul "${service.name}" a fost atașat.`),
        }
      );
    },
    [attachService, serviceDomainId]
  );

  const handleDetach = useCallback(
    (service: Service) => {
      detachService(
        {
          serviceDomainId: String(serviceDomainId),
          serviceId: String(service.id),
        },
        {
          onSuccess: () =>
            toast.success(`Serviciul "${service.name}" a fost detașat.`),
        }
      );
    },
    [detachService, serviceDomainId]
  );

  const columns = useMemo<MRT_ColumnDef<Service>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 300,
      },
    ],
    []
  );

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Detașează"
        icon={<Delete />}
        onClick={() => {
          handleDetach(row.original);
          closeMenu();
        }}
        table={table}
      />,
    ],
    [handleDetach]
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
    enableTopToolbar: false,
    positionActionsColumn: "last",
    renderRowActionMenuItems,
    localization: MRT_Localization_RO,
    state: {
      showLoadingOverlay: isPendingDetach,
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
        <Typography fontWeight={600}>Servicii:</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.5}>
          <Autocomplete
            options={availableServices}
            getOptionLabel={(service) => service.name}
            value={null}
            loading={isPendingAttach}
            disabled={isPendingAttach}
            onChange={(_, service) => handleAttach(service)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={({ InputLabelProps: _InputLabelProps, ...params }) => (
              <TextField
                {...params}
                label="Atașează un serviciu nou"
                size="small"
              />
            )}
          />

          <MaterialReactTable table={table} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(ServicesByServiceDomainModule);
