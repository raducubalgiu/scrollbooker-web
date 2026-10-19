import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import React, { memo, useCallback, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete } from "@mui/icons-material";
import { BusinessDomainServiceDomainType } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { toast } from "react-toastify";
import { useAllServiceDomains } from "@/controllers/nomenclature/service-domain.controller";
import {
  useAttachServiceDomainToBusinessDomain,
  useDetachServiceDomainFromBusinessDomain,
} from "@/controllers/nomenclature/business-domain.controller";

type BusinessDomainsServiceDomainsModuleType = {
  businessDomainId: number;
  data: BusinessDomainServiceDomainType[];
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<BusinessDomainServiceDomainType>;
  table: MRT_TableInstance<BusinessDomainServiceDomainType>;
  closeMenu: () => void;
};

const BusinessDomainsServiceDomains = ({
  businessDomainId,
  data,
}: BusinessDomainsServiceDomainsModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const { data: allServiceDomains } = useAllServiceDomains({
    page: 1,
    limit: 100,
    all: true,
  });

  const { mutate: attachServiceDomain, isPending: isPendingAttach } =
    useAttachServiceDomainToBusinessDomain();
  const { mutate: detachServiceDomain, isPending: isPendingDetach } =
    useDetachServiceDomainFromBusinessDomain();

  const memoizedData = useMemo(() => data || [], [data]);

  const attachedIds = useMemo(
    () => new Set(memoizedData.map((serviceDomain) => serviceDomain.id)),
    [memoizedData]
  );

  const availableServiceDomains = useMemo(
    () =>
      (allServiceDomains?.results || []).filter(
        (serviceDomain) => !attachedIds.has(serviceDomain.id)
      ),
    [allServiceDomains, attachedIds]
  );

  const handleAttach = useCallback(
    (serviceDomain: ServiceDomain | null) => {
      if (!serviceDomain) return;

      attachServiceDomain(
        {
          businessDomainId: String(businessDomainId),
          serviceDomainId: String(serviceDomain.id),
        },
        {
          onSuccess: () =>
            toast.success(
              `Domeniul de servicii "${serviceDomain.name}" a fost atașat.`
            ),
        }
      );
    },
    [attachServiceDomain, businessDomainId]
  );

  const handleDetach = useCallback(
    (serviceDomain: BusinessDomainServiceDomainType) => {
      detachServiceDomain(
        {
          businessDomainId: String(businessDomainId),
          serviceDomainId: String(serviceDomain.id),
        },
        {
          onSuccess: () =>
            toast.success(
              `Domeniul de servicii "${serviceDomain.name}" a fost detașat.`
            ),
        }
      );
    },
    [detachServiceDomain, businessDomainId]
  );

  const columns = useMemo<MRT_ColumnDef<BusinessDomainServiceDomainType>[]>(
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

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: false,
    positionActionsColumn: "last",
    renderRowActionMenuItems,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
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
      sx={{
        mb: 1.5,
        bgcolor: "background.default",
        boxShadow: 0,
      }}
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
            getOptionLabel={(serviceDomain) => serviceDomain.name}
            value={null}
            loading={isPendingAttach}
            disabled={isPendingAttach}
            onChange={(_, serviceDomain) => handleAttach(serviceDomain)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={({ InputLabelProps: _InputLabelProps, ...params }) => (
              <TextField
                {...params}
                label="Atașează un domeniu de servicii nou"
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

export default memo(BusinessDomainsServiceDomains);
