'use client';

import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { UnapprovedResponse } from "@/ts/models/Business/UnapprovedBusinessResponse";
import { MRT_ColumnDef } from "material-react-table";
import { UnapprovedBusinessDetails } from "./UnapprovedBusinessDetails";

export default function UnapprovedBusinessModule() {
    const {
        data,
        refetch,
        isLoading,
        pagination,
        setPagination,
        onDeletingRowSave,
        onCreatingRowSave,
        onEditingRowSave,
    } = useTableHandlers<UnapprovedResponse>({
        route: "businesses/approve"
    });

    const columns: MRT_ColumnDef<UnapprovedResponse>[] = [
		{
			accessorKey: "id",
			header: "ID",
			size: 50,
			enableEditing: false,
		},
        {
			accessorKey: "fullname",
			header: "Nume",
		},
		{
			accessorKey: "username",
			header: "Username",
		},
	];

    return (
        <MainLayout title="Afaceri in aprobare" hideAction>
            <Table<UnapprovedResponse>
                data={data?.results}
                rowCount={data?.count}
                columns={columns}
                onCreatingRowSave={onCreatingRowSave}
                onEditingRowSave={onEditingRowSave}
                onDeletingRowSave={onDeletingRowSave}
                manualPagination={true}
                onPaginationChange={setPagination}
                state={{ pagination, isLoading }}
                enableEditing={false}
                enableRowActions={false}
                renderTopToolbarCustomActions={undefined}
                renderDetailPanel={({ row }) =>
                    row.original.id && (
                        <UnapprovedBusinessDetails 
                            key={row.original.id} 
                            unapproved={row.original}
                            onRefetch={() => refetch()}
                        />
                    )
                }
            />
        </MainLayout>
    )
}