"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";

export default function BusinessDomainsModule() {
  const {
    data,
    isLoading,
    pagination,
    setPagination,
    onCreatingRowSave,
    onDeletingRowSave,
    onEditingRowSave,
  } = useTableHandlers<BusinessDomainType>({
    route: "nomenclatures/business-domains",
  });

  const columns = useMemo<MRT_ColumnDef<BusinessDomainType>[]>(
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
            minLength={5}
            maxLength={255}
          />
        ),
      },
      {
        accessorKey: "short_name",
        header: "Short name",
        size: 300,
        Edit: ({ row, column }) => (
          <MR_Input
            row={row}
            column={column}
            value={row.original.short_name}
            required
            minLength={5}
            maxLength={255}
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
          />
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created_at",
        enableEditing: false,
      },
      {
        accessorKey: "updated_at",
        header: "updated_at",
        enableEditing: false,
      },
    ],
    []
  );

  return (
    <MainLayout title="Domeniu Business" hideAction>
      <Table<BusinessDomainType>
        data={data?.results}
        rowCount={data?.count}
        columns={columns}
        onCreatingRowSave={onCreatingRowSave}
        onEditingRowSave={onEditingRowSave}
        onDeletingRowSave={onDeletingRowSave}
        manualPagination={true}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
      />
    </MainLayout>
  );
}
