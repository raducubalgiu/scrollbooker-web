import React, { memo, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import Table from "@/components/core/Table/Table";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ServiceFilterType } from "@/ts/models/nomenclatures/service/ServiceType";
import FilterSubFilters from "./FilterSubFilters";

type ServicesFiltersType = {
  filters: ServiceFilterType[] | undefined;
};

const ServiceFilters = ({ filters }: ServicesFiltersType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const columns = useMemo<MRT_ColumnDef<ServiceFilterType>[]>(
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
        <Table<ServiceFilterType>
          data={filters}
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
          renderDetailPanel={({ row }) => (
            <FilterSubFilters sub_filters={row.original.sub_filters} />
          )}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(ServiceFilters);
