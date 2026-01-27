"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";
import ServiceBusinessTypes from "./ServiceBusinessTypes";
import { ServiceDomainsResponse } from "@/ts/models/nomenclatures/ServiceDomainType";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import ServiceFilters from "./ServiceFilters";
import { ServiceType } from "@/ts/models/nomenclatures/service/ServiceType";
import ServiceActiveCheckbox from "./ServiceActiveCheckbox";

type ServicesModuleProps = {
  businessDomains: BusinessDomainType[];
  serviceDomains: ServiceDomainsResponse[];
  filters: FilterType[];
};

export default function ServicesModule({
  businessDomains,
  serviceDomains,
  filters,
}: ServicesModuleProps) {
  const {
    data,
    isLoading,
    pagination,
    setPagination,
    onCreatingRowSave,
    onDeletingRowSave,
    onEditingRowSave,
  } = useTableHandlers<ServiceType>({ route: "nomenclatures/services" });

  const servicesColumns = useMemo<MRT_ColumnDef<ServiceType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
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
      {
        accessorKey: "display_name",
        header: "Display Name",
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.original.display_name}
            required
            minLength={3}
            maxLength={50}
          />
        ),
      },
      {
        accessorKey: "business_domain_id",
        header: "Business Domain",
        Edit: ({ row, column, cell }) => (
          <MR_Select
            row={row}
            column={column}
            value={Number(cell.getValue()) ?? ""}
            options={businessDomains?.map((bd) => {
              return {
                value: bd.id,
                name: bd.name,
              };
            })}
          />
        ),
        Cell: ({ cell }) =>
          businessDomains?.find((bd) => bd.id === cell.getValue())?.name,
      },
      {
        accessorKey: "service_domain_id",
        header: "Service Domain",
        Edit: ({ row, column, cell }) => (
          <MR_Select
            row={row}
            column={column}
            value={Number(cell.getValue()) ?? ""}
            options={serviceDomains?.map((bd) => {
              return {
                value: bd.id,
                name: bd.name,
              };
            })}
          />
        ),
        Cell: ({ cell }) =>
          serviceDomains?.find((sd) => sd.id === cell.getValue())?.name,
      },
      {
        accessorKey: "type",
        header: "Service Type",
      },
      {
        accessorKey: "active",
        header: "Active",
        Cell: ({ row }) => (
          <ServiceActiveCheckbox
            serviceId={row.original.id}
            active={row.original.active}
          />
        ),
      },
      {
        accessorKey: "order_index",
        header: "Order Index",
        size: 50,
      },
    ],
    [businessDomains, serviceDomains]
  );

  return (
    <MainLayout title="Servicii" hideAction>
      <Table<ServiceType>
        data={data?.results}
        rowCount={data?.count}
        columns={servicesColumns}
        onCreatingRowSave={onCreatingRowSave}
        onEditingRowSave={onEditingRowSave}
        onDeletingRowSave={onDeletingRowSave}
        manualPagination={true}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
        renderDetailPanel={({ row }) =>
          !!row.original.id && (
            <>
              <ServiceFilters
                serviceId={row.original.id}
                serviceName={row.original.name}
                filters={filters}
              />
              <ServiceBusinessTypes
                serviceId={row.original.id}
                serviceName={row.original.name}
                businessDomainId={row.original.business_domain_id}
              />
            </>
          )
        }
      />
    </MainLayout>
  );
}
