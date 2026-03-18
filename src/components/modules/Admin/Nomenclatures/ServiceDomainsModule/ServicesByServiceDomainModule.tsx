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
import { ServiceType } from "@/ts/models/nomenclatures/service/ServiceType";

type ServicesByServiceDomainModuleType = {
  services: ServiceType[];
};

const ServicesByServiceDomainModule = ({
  services,
}: ServicesByServiceDomainModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const columns = useMemo<MRT_ColumnDef<ServiceType>[]>(
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
          Servicii:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table<ServiceType>
          data={services}
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

export default memo(ServicesByServiceDomainModule);
