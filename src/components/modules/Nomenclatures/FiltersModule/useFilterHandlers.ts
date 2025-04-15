import {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { FilterType } from "@/models/nomenclatures/FilterType";
import { MRT_PaginationState } from "material-react-table";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useFilterHandlers() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { pageIndex, pageSize } = pagination;

	const { data, isLoading, refetch } = useCustomQuery<
		PaginatedData<FilterType>
	>({
		key: ["filters", pageIndex, pageSize],
		url: `/api/nomenclatures/filters`,
		params: { page: pageIndex + 1, limit: pageSize },
	});

	const { mutateAsync: handleCreateFilter, isPending: isPendingCreateFilter } =
		useMutate({
			key: ["create-filter"],
			url: "/api/nomenclatures/filters",
			options: {
				onSuccess: () => toast.success("Datele au fost salvate cu succes"),
			},
		});

	const { mutateAsync: handleUpdateFilter, isPending: isPendingUpdateFilter } =
		useMutate({
			key: ["update-filter"],
			url: "/api/nomenclatures/services",
			options: {
				onSuccess: () => toast.success("Datele au fost salvate cu succes"),
			},
		});

	const { mutateAsync: handleDeleteFilter, isPending: isPendingDeleteFilter } =
		useMutate({
			key: ["delete-filter"],
			url: "/api/nomenclatures/filters",
			method: "DELETE",
			options: {
				onSuccess: () => toast.success("Filtrul a fost sters cu succes"),
			},
		});

	const onFilterCreatingRowSave: TableCreateRow<FilterType> = async ({
		values,
		table,
	}) => {
		await handleCreateFilter({ name: values.name });
		table.setCreatingRow(null);
		refetch();
	};

	const onFilterEditingRowSave: TableEditRow<FilterType> = async ({
		values,
		table,
	}) => {
		await handleUpdateFilter(values);
		table.setEditingRow(null);
	};

	const onFilterDeletingRowSave = async ({
		row,
	}: TableRowAndTable<FilterType>) => {
		await handleDeleteFilter({ filterId: row.original.id });
		refetch();
	};

	const loading =
		isLoading ||
		isPendingCreateFilter ||
		isPendingUpdateFilter ||
		isPendingDeleteFilter;

	return {
		pagination,
		setPagination,
		data,
		onFilterCreatingRowSave,
		onFilterEditingRowSave,
		onFilterDeletingRowSave,
		isLoading: loading,
	};
}
