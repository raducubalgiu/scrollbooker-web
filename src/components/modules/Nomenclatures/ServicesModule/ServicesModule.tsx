"use client";

import { ServiceType } from "../../../../models/nomenclatures/ServiceType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import Table, {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";

export default function ServicesModule() {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const {
		data,
		isLoading: isLoadingServices,
		isRefetching,
		refetch: refetchServices,
	} = useCustomQuery<PaginatedData<ServiceType>>({
		key: ["services", pagination.pageIndex, pagination.pageSize],
		url: `/api/nomenclatures/services`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const { mutateAsync: handleUpdate, isPending: isPendingUpdate } = useMutate({
		key: ["update-service"],
		url: "/api/nomenclatures/services",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleSave, isPending: isPendingCreate } = useMutate({
		key: ["create-service"],
		url: "/api/nomenclatures/services",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleDelete, isPending: isPendingDelete } = useMutate({
		key: ["delete-service"],
		url: "/api/nomenclatures/services",
		method: "DELETE",
		options: {
			onSuccess: () => toast.success("Serviciul a fost sters cu succes"),
		},
	});

	const onCreatingRowSave: TableCreateRow<ServiceType> = async ({
		values,
		table,
	}) => {
		await handleSave({
			name: values.name,
			keywords: [values.keywords],
		});
		table.setCreatingRow(null);
		refetchServices();
	};

	const onEditingRowSave: TableEditRow<ServiceType> = async ({
		values,
		table,
	}) => {
		await handleUpdate(values);
		table.setEditingRow(null);
	};

	const onDeletingRowSave = async ({ row }: TableRowAndTable<ServiceType>) => {
		await handleDelete({ serviceId: row.original.id });
		refetchServices();
	};

	const isLoading =
		isLoadingServices ||
		isRefetching ||
		isPendingCreate ||
		isPendingUpdate ||
		isPendingDelete;

	const servicesColumns: MRT_ColumnDef<ServiceType>[] = [
		{
			accessorKey: "id",
			header: "ID",
			enableEditing: false,
			size: 50,
		},
		{
			accessorKey: "name",
			header: "Name",
		},
		{
			accessorKey: "keywords",
			header: "Keywords",
		},
		{
			accessorKey: "created_at",
			enableEditing: false,
			header: "Created_at",
		},
	];

	return (
		<MainLayout title="Services" hideAction>
			<Table
				data={data?.results}
				rowCount={data?.count}
				columns={servicesColumns}
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
