"use client";

import { useState } from "react";
import { type MRT_PaginationState } from "material-react-table";
import { useCustomQuery } from "@/hooks/useHttp";
import Table, {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import useServiceDomainsColumns from "./useServiceDomainsColumns";
import { ServiceDomainsType } from "../../../../models/nomenclatures/ServiceDomainType";
import MaterialExpandableComponent from "../../../core/Table/MaterialExpandableComponent";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";

export default function ServiceDomainsModule() {
	const { serviceDomainsColumns, serviceColumns } = useServiceDomainsColumns();
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { pageIndex: page, pageSize: limit } = pagination;

	const { data, isLoading, refetch } = useCustomQuery<
		PaginatedData<ServiceDomainsType>
	>({
		key: ["service-domains", page, limit],
		url: `/api/nomenclatures/service-domains`,
		params: { page: page + 1, limit },
	});

	const { mutateAsync: handleCreate, isPending: isPendingCreate } = useMutate({
		key: ["create-service-domain"],
		url: "/api/nomenclatures/service-domains",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleUpdate, isPending: isPendingUpdate } = useMutate({
		key: ["update-service-domains"],
		url: "/api/nomenclatures/service-domains",
		method: "PUT",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleDelete, isPending: isPendingDelete } = useMutate({
		key: ["delete-service-domains"],
		url: "/api/nomenclatures/service-domains",
		method: "DELETE",
		options: {
			onSuccess: () => toast.success("Serviciul a fost sters cu succes"),
		},
	});

	const onCreatingRowSave: TableCreateRow<ServiceDomainsType> = async ({
		values,
		table,
	}) => {
		await handleCreate({ name: values.name });
		await refetch();
		table.setCreatingRow(null);
	};

	const onEditingRowSave: TableEditRow<ServiceDomainsType> = async ({
		values,
		table,
	}) => {
		await handleUpdate(values);
		table.setEditingRow(null);
	};

	const onDeletingRowSave = async ({
		row,
	}: TableRowAndTable<ServiceDomainsType>) => {
		await handleDelete({ serviceDomainsId: row.original.id });
		await refetch();
	};

	const isSaving = isPendingCreate || isPendingUpdate || isPendingDelete;

	return (
		<MainLayout title="Service Domains">
			<Table<ServiceDomainsType>
				data={data?.results}
				rowCount={data?.count}
				columns={serviceDomainsColumns}
				manualPagination
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading, isSaving }}
				onPaginationChange={setPagination}
				renderDetailPanel={({ row }) => (
					<MaterialExpandableComponent
						data={row.original.services}
						columns={serviceColumns}
					/>
				)}
			/>
		</MainLayout>
	);
}
