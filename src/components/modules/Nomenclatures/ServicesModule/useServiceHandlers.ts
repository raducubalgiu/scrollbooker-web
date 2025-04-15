import {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { useState } from "react";
import { toast } from "react-toastify";

const route = "services";

export default function useServiceHandlers() {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const { pageIndex, pageSize } = pagination;

	const {
		data,
		isLoading: isLoadingServices,
		refetch: refetchServices,
	} = useCustomQuery<PaginatedData<ServiceType>>({
		key: [route, pageIndex, pageSize],
		url: `/api/nomenclatures/${route}`,
		params: { page: pageIndex + 1, limit: pageSize },
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

	const onCreatingRowSave: TableCreateRow<ServiceType> = async ({
		values,
		table,
	}) => {
		table.setCreatingRow(null);
		await handleCreate({
			name: values.name,
			keywords: [values.keywords],
		});
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
		isLoadingServices || isPendingCreate || isPendingUpdate || isPendingDelete;
	return {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onEditingRowSave,
		onDeletingRowSave,
	};
}
