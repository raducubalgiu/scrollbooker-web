import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useCallback, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { Delete } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import {
  useAttachServiceDomainToBusinessType,
  useDetachServiceDomainFromBusinessType,
} from "@/controllers/nomenclature/business-type.controller";
import { toast } from "react-toastify";
import { useAllServiceDomainsWithoutPagination } from "@/controllers/nomenclature/service-domain.controller";

type BusinessTypeServiceDomainsModuleType = {
  businessTypeId: number;
  serviceDomains: ServiceDomain[];
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<ServiceDomain>;
  table: MRT_TableInstance<ServiceDomain>;
  closeMenu: () => void;
};

const BusinessTypeServiceDomains = ({
  businessTypeId,
  serviceDomains,
}: BusinessTypeServiceDomainsModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const memoizedData = useMemo(() => serviceDomains || [], [serviceDomains]);

  const { data: allServiceDomains } = useAllServiceDomainsWithoutPagination();
  const { mutate: attachServiceDomain, isPending: isPendingAttach } =
    useAttachServiceDomainToBusinessType();
  const { mutate: detachServiceDomain, isPending: isPendingDetach } =
    useDetachServiceDomainFromBusinessType();

  const attachedIds = useMemo(
    () => new Set(memoizedData.map((serviceDomain) => serviceDomain.id)),
    [memoizedData]
  );

  const availableServiceDomains = useMemo(
    () =>
      (allServiceDomains || []).filter(
        (sd) => sd.active && !attachedIds.has(sd.id)
      ),
    [allServiceDomains, attachedIds]
  );

  const handleAttach = useCallback(
    (serviceDomain: ServiceDomain | null) => {
      if (!serviceDomain) return;

      attachServiceDomain(
        {
          businessTypeId: String(businessTypeId),
          serviceDomainId: String(serviceDomain.id),
        },
        {
          onSuccess: () =>
            toast.success(`Serviciul "${serviceDomain.name}" a fost atașat.`),
        }
      );
    },
    [attachServiceDomain, businessTypeId]
  );

  const handleDetach = useCallback(
    (serviceDomain: ServiceDomain) => {
      detachServiceDomain(
        {
          businessTypeId: String(businessTypeId),
          serviceDomainId: String(serviceDomain.id),
        },
        {
          onSuccess: () =>
            toast.success(`Serviciul "${serviceDomain.name}" a fost detașat.`),
        }
      );
    },
    [detachServiceDomain, businessTypeId]
  );

  const columns = useMemo<MRT_ColumnDef<ServiceDomain>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Nume",
        size: 50,
        enableEditing: false,
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
        <Typography component="span" sx={{ fontWeight: "600" }}>
          Domeniu Servicii:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1.5}>
          <Autocomplete
            options={availableServiceDomains}
            getOptionLabel={(service) => service.name}
            value={null}
            loading={isPendingAttach}
            disabled={isPendingAttach}
            onChange={(_, service) => handleAttach(service)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={({ InputLabelProps: _InputLabelProps, ...params }) => (
              <TextField
                {...params}
                label="Atașează un domeniu de serviciu nou"
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

export default memo(BusinessTypeServiceDomains);
