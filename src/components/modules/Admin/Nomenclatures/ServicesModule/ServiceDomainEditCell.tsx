import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";
import { ServiceDomainsResponse } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { ServiceType } from "@/ts/models/nomenclatures/ServiceType";
import { MRT_Cell, MRT_Column, MRT_Row } from "material-react-table";
import { useMemo } from "react";

type ServiceDomainEditCell = {
  cell: MRT_Cell<ServiceType, unknown>;
  column: MRT_Column<ServiceType, unknown>;
  row: MRT_Row<ServiceType>;
  serviceDomains: ServiceDomainsResponse[];
};

export default function ServiceDomainEditCell({
  cell,
  column,
  row,
  serviceDomains,
}: ServiceDomainEditCell) {
  const businessDomainId = row.getValue<number>("business_domain_id");

  const filtered = useMemo(
    () =>
      serviceDomains.filter((sd) => sd.business_domain_id === businessDomainId),
    [serviceDomains, businessDomainId]
  );

  return (
    <MR_Select
      row={row}
      column={column}
      value={Number(cell.getValue()) ?? ""}
      options={filtered.map((sd) => ({ value: sd.id, name: sd.name }))}
    />
  );
}
