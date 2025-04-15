import { MRT_PaginationState } from "material-react-table";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";

const route = "business-domains";

export default function useBusinessDomainsHandlers() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { pageIndex, pageSize } = pagination;

	const { data, isLoading, refetch } = useCustomQuery<
		PaginatedData<BusinessDomainType>
	>({
		key: [route, pageIndex, pageSize],
		url: `/api/nomenclatures/${route}`,
		params: { page: pageIndex + 1, limit: pageSize },
	});

	const { mutateAsync: handleCreate, isPending: isPendingCreate } =
		useMutate<BusinessDomainType>({
			key: [`create-${route}`],
			url: `/api/nomenclatures/${route}`,
			options: {
				onSuccess: () => toast.success("Datele au fost salvate cu succes"),
			},
		});

	const { mutateAsync: handleUpdate, isPending: isPendingUpdate } =
		useMutate<BusinessDomainType>({
			key: [`update-${route}`],
			url: `/api/nomenclatures/${route}`,
			method: "PUT",
			options: {
				onSuccess: () => toast.success("Datele au fost salvate cu succes"),
			},
		});

	const { mutateAsync: handleDelete, isPending: isPendingDelete } = useMutate({
		key: [`delete-${route}`],
		url: `/api/nomenclatures/${route}`,
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

	const loading =
		isLoading || isPendingCreate || isPendingUpdate || isPendingDelete;

	return {
		data,
		pagination,
		setPagination,
		onCreatingRowSave,
		onEditingRowSave,
		onDeletingRowSave,
		isLoading: loading,
	};
}
