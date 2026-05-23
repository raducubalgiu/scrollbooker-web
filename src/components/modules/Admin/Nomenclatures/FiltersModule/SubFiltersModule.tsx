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
import { SubFilter } from "@/ts/models/nomenclatures/subFilter/SubFilter";
import { MRT_Localization_RO } from "material-react-table/locales/ro";

type SubFiltersModuleType = { subFilters: SubFilter[] | undefined };

const SubFiltersModule = ({ subFilters }: SubFiltersModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const memoizedData = useMemo(() => {
    return subFilters || [];
  }, [subFilters]);

  const columns = useMemo<MRT_ColumnDef<SubFilter>[]>(
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
        <MaterialReactTable table={table} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(SubFiltersModule);
