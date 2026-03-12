"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import { ProfessionType } from "@/ts/models/Profession/ProfessionType";

export default function ProfessionsModule() {
  const {
    data,
    isLoading,
    onCreatingRowSave,
    pagination,
    setPagination,
    onEditingRowSave,
    onDeletingRowSave,
  } = useTableHandlers<ProfessionType>({
    route: "nomenclatures/professions",
  });

  const columns = useMemo<MRT_ColumnDef<ProfessionType>[]>(
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
        accessorKey: "created_at",
        header: "Created_at",
        enableEditing: false,
      },
    ],
    []
  );

  return (
    <MainLayout title="Profesii" hideAction>
      <Table<ProfessionType>
        data={data?.results}
        rowCount={data?.count}
        columns={columns}
        manualPagination
        onCreatingRowSave={onCreatingRowSave}
        onEditingRowSave={onEditingRowSave}
        onDeletingRowSave={onDeletingRowSave}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
      />
    </MainLayout>
  );
}
