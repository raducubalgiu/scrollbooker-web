import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import React, { memo, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BusinessDomainServiceDomainType } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { MRT_Localization_RO } from "material-react-table/locales/ro";

type BusinessDomainsServiceDomainsModuleType = {
  data: BusinessDomainServiceDomainType[];
};

const BusinessDomainsServiceDomains = ({
  data,
}: BusinessDomainsServiceDomainsModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  const columns = useMemo<MRT_ColumnDef<BusinessDomainServiceDomainType>[]>(
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

  const table = useMaterialReactTable({
    columns,
    data: memoizedData,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableRowActions: false,
    enableTopToolbar: false,
    enableEditing: false,
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
        <MaterialReactTable table={table} />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(BusinessDomainsServiceDomains);
