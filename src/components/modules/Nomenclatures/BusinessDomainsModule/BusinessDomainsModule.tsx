"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import Table, { PaginatedData } from "@/components/core/Table/Table";
import { useState } from "react";
import { MRT_PaginationState } from "material-react-table";
import {
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import { toast } from "react-toastify";
import { businessDomainsColumns } from "./business-domains-columns";

export default function BusinessDomainsModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading, refetch } = useCustomQuery<
		PaginatedData<BusinessDomainType>
	>({
		key: ["business-domains", pagination.pageIndex, pagination.pageSize],
		url: `/api/nomenclatures/business-domains`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const { mutateAsync: handleCreate, isPending: isPendingCreate } =
		useMutate<BusinessDomainType>({
			key: ["create-business-domain"],
			url: "/api/nomenclatures/business-domains",
			options: {
				onSuccess: () => toast.success("Datele au fost salvate cu succes"),
			},
		});

	const { mutateAsync: handleUpdate, isPending: isPendingUpdate } =
		useMutate<BusinessDomainType>({
			key: ["update-business-domain"],
			url: "/api/nomenclatures/business-domains",
			method: "PUT",
			options: {
				onSuccess: () => toast.success("Datele au fost salvate cu succes"),
			},
		});

	const { mutateAsync: handleDelete, isPending: isPendingDelete } = useMutate({
		key: ["delete-business-domain"],
		url: "/api/nomenclatures/business-domains",
		method: "DELETE",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const onCreatingRowSave: TableCreateRow<BusinessDomainType> = async ({
		values,
		table,
	}) => {
		await handleCreate({ name: values.name });
		refetch();
		table.setCreatingRow(null);
	};

	const onEditingRowSave: TableEditRow<BusinessDomainType> = async ({
		values,
		table,
	}) => {
		await handleUpdate(values);
		table.setEditingRow(null);
	};

	const onDeletingRowSave = async ({
		row,
	}: TableRowAndTable<BusinessDomainType>) => {
		await handleDelete({ businessDomainId: row.original.id });
		refetch();
	};

	const isSaving = isPendingCreate || isPendingUpdate || isPendingDelete;

	return (
		<MainLayout title="Business Domains" hideAction>
			<Table<BusinessDomainType>
				data={data?.results}
				rowCount={data?.count}
				columns={businessDomainsColumns}
				onDeletingRowSave={onDeletingRowSave}
				onPaginationChange={setPagination}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				state={{ pagination, isLoading, isSaving }}
			/>
		</MainLayout>
	);
}
