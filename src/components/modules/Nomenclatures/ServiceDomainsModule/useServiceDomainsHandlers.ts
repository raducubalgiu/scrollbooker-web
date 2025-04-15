import {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { ServiceDomainsType } from "@/models/nomenclatures/ServiceDomainType";
import { MRT_PaginationState } from "material-react-table";
import { useState } from "react";
import { toast } from "react-toastify";

const route = "service-domains";

export default function useServiceDomainsHandlers() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { pageIndex: page, pageSize: limit } = pagination;

	const { data, isLoading, refetch } = useCustomQuery<
		PaginatedData<ServiceDomainsType>
	>({
		key: [route, page, limit],
		url: `/api/nomenclatures/${route}`,
		params: { page: page + 1, limit },
	});

	const { mutateAsync: handleCreate, isPending: isPendingCreate } = useMutate({
		key: [`create-${route}`],
		url: `/api/nomenclatures/${route}`,
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleUpdate, isPending: isPendingUpdate } = useMutate({
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

	const loading =
		isLoading || isPendingCreate || isPendingUpdate || isPendingDelete;

	return {
		data,
		isLoading: loading,
		pagination,
		setPagination,
		onEditingRowSave,
		onCreatingRowSave,
		onDeletingRowSave,
	};
}
