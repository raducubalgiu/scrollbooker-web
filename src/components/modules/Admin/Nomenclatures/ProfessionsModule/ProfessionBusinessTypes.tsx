import React, { useMemo, useState } from "react";
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
import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";
import { BusinessTypeLoadOnly } from "@/ts/models/nomenclatures/profession/ProfessionType";
import { useGetAllBusinessTypes } from "@/controllers/nomenclature/business-type.controller";
import ProfessionBusinessTypeCheckbox from "./ProfessionBusinessTypeCheckbox";

type ProfessionBusinessTypesProps = {
  professionId: number;
  attachedBusinessTypes: BusinessTypeLoadOnly[];
};

export default function ProfessionBusinessTypes({
  professionId,
  attachedBusinessTypes,
}: ProfessionBusinessTypesProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const { data: businessTypes, isLoading } = useGetAllBusinessTypes();

  const attachedIds = useMemo(
    () => new Set(attachedBusinessTypes.map((businessType) => businessType.id)),
    [attachedBusinessTypes]
  );

  const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
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
        accessorKey: "relation",
        header: "Atașat",
        Cell: ({ row }) => (
          <ProfessionBusinessTypeCheckbox
            professionId={professionId}
            businessTypeId={row.original.id}
            businessTypeName={row.original.name}
            isSelected={attachedIds.has(row.original.id)}
          />
        ),
      },
    ],
    [professionId, attachedIds]
  );

  const table = useMaterialReactTable({
    columns,
    data: businessTypes ?? [],

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
    state: {
      isLoading,
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
      sx={{ mb: 1.5, bgcolor: "background.default", boxShadow: 0 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span" sx={{ fontWeight: "600" }}>
          Tipuri de Business:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <MaterialReactTable table={table} />
      </AccordionDetails>
    </Accordion>
  );
}
