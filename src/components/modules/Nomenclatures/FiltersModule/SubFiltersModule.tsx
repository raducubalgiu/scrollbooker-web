import React, { memo, useMemo, useState } from "react";
import Table from "@/components/core/Table/Table";
import { SubFilterType } from "@/ts/models/nomenclatures/SubFilterType";
import { MRT_ColumnDef } from "material-react-table";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type SubFiltersModuleType = { subFilters: SubFilterType[] | undefined };

const SubFiltersModule = ({ subFilters }: SubFiltersModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const columns = useMemo<MRT_ColumnDef<SubFilterType>[]>(
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
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.original.name}
            required
            minLength={3}
            maxLength={50}
          />
        ),
      },
    ],
    []
  );

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
        <Table
          data={subFilters}
          columns={columns}
          manualPagination={false}
          enablePagination={false}
          enableColumnFilters={false}
          enableSorting={false}
          topToolbarIconButton
          enableFilters={false}
          enableColumnActions={false}
          enableEditing={false}
          enableTopToolbar={false}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(SubFiltersModule);
