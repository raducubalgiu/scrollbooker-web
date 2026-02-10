import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useMemo, useState } from "react";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { ServiceDomainsResponse } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import Table from "@/components/core/Table/Table";

type ServiceDomainBusinessType = {
  id: number;
  name: string;
  is_selected: boolean;
};

type ServicesByServiceDomainModuleType = {
  row: MRT_Row<ServiceDomainsResponse>;
};

const ServiceDomainBusinessTypes = ({
  row,
}: ServicesByServiceDomainModuleType) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: services,
    isLoading,
    onCreatingRowSave,
    pagination,
    setPagination,
    onEditingRowSave,
    onDeletingRowSave,
  } = useTableHandlers<ServiceDomainBusinessType>({
    route: "nomenclatures/service-domains/business-types",
    extraParams: { id: row.original.id },
    enabled: isExpanded,
  });

  const serviceDomainsColumns = useMemo<
    MRT_ColumnDef<ServiceDomainBusinessType>[]
  >(
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
      },
      {
        accessorKey: "is_selected",
        header: "Selectat",
        Cell: ({ row }) => <Checkbox checked={row.original.is_selected} />,
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
          Tip Business:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Table<ServiceDomainBusinessType>
          data={services?.results}
          rowCount={services?.count}
          columns={serviceDomainsColumns}
          manualPagination={true}
          enableColumnFilters={false}
          enableSorting={false}
          topToolbarIconButton
          enableFilters={false}
          onPaginationChange={setPagination}
          onCreatingRowSave={onCreatingRowSave}
          onEditingRowSave={onEditingRowSave}
          onDeletingRowSave={onDeletingRowSave}
          state={{ pagination, isLoading }}
          muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ServiceDomainBusinessTypes;
