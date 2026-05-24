import React, { memo, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { ServiceFilter } from "@/ts/models/nomenclatures/service/Service";
import FilterSubFilters from "./FilterSubFilters";

type ServicesFiltersType = {
  filters: ServiceFilter[] | undefined;
};

const ServiceFilters = ({ filters }: ServicesFiltersType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const memoizedData = useMemo(() => {
    return filters || [];
  }, [filters]);

  const columns = useMemo<MRT_ColumnDef<ServiceFilter>[]>(
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
    positionActionsColumn: "last",
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    localization: MRT_Localization_RO,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
    renderDetailPanel: ({ row }) => {
      return <FilterSubFilters sub_filters={row.original.sub_filters} />;
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
          Filtre:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MaterialReactTable table={table} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(ServiceFilters);
