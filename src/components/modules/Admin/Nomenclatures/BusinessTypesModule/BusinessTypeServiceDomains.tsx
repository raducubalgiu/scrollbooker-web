import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";

type BusinessTypeServiceDomainsModuleType = {
  data: ServiceDomain[];
};

const BusinessTypeServiceDomains = ({
  data,
}: BusinessTypeServiceDomainsModuleType) => {
  const [isExpanded, setIsExpanded] = useState(true);
  console.log(data);

  // const columns = useMemo<MRT_ColumnDef<ServiceDomain>[]>(
  //   () => [
  //     {
  //       accessorKey: "id",
  //       header: "ID",
  //       size: 50,
  //       enableEditing: false,
  //     },
  //     {
  //       accessorKey: "name",
  //       header: "Nume",
  //       size: 50,
  //       enableEditing: false,
  //     },
  //   ],
  //   []
  // );

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
        {/* <Table<ServiceDomain>
          data={data ?? []}
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
        /> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(BusinessTypeServiceDomains);
