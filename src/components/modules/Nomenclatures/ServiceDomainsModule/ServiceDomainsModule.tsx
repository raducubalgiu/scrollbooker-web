"use client";

import Table from "@/components/core/Table/Table";
import { ServiceDomainsResponse } from "../../../../ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import ServicesByServiceDomainModule from "./ServicesByServiceDomainModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";

type ServiceDomainsModuleProps = { businessDomains: BusinessDomainType[] };

export default function ServiceDomainsModule({
  businessDomains,
}: ServiceDomainsModuleProps) {
  const {
    data,
    isLoading,
    onCreatingRowSave,
    pagination,
    setPagination,
    onEditingRowSave,
    onDeletingRowSave,
  } = useTableHandlers<ServiceDomainsResponse>({
    route: "nomenclatures/service-domains",
  });

  const serviceDomainsColumns = useMemo<
    MRT_ColumnDef<ServiceDomainsResponse>[]
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
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.original.name}
            required
            minLength={3}
            maxLength={100}
          />
        ),
      },
      {
        accessorKey: "order_index",
        header: "Order Index",
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.original.order_index}
            required
            minLength={3}
            maxLength={100}
          />
        ),
      },
    ],
    [businessDomains]
  );

  return (
    <MainLayout title="Service Domains" hideAction>
      <Table<ServiceDomainsResponse>
        data={data?.results}
        rowCount={data?.count}
        columns={serviceDomainsColumns}
        manualPagination
        onCreatingRowSave={onCreatingRowSave}
        onEditingRowSave={onEditingRowSave}
        onDeletingRowSave={onDeletingRowSave}
        state={{ pagination, isLoading }}
        onPaginationChange={setPagination}
        renderDetailPanel={({ row }) => (
          <ServicesByServiceDomainModule row={row} />
        )}
      />
    </MainLayout>
  );
}
