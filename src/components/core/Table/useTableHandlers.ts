import {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { MRT_PaginationState } from "material-react-table";
import { useState } from "react";
import { toast } from "react-toastify";
import { omit } from "lodash";

type UseTableHandlersProps = { route: string };
const errorMessage = "Ceva nu a mers cum trebuie. Încearcă mai târziu";

export default function useTableHandlers<T extends Record<string, unknown>>({
	route,
}: UseTableHandlersProps) {
	const [isMutateAction, setIsMutateAction] = useState(false);

	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const { pageIndex: page, pageSize: limit } = pagination;

	const { data, isLoading, refetch, isRefetching } = useCustomQuery<
		PaginatedData<T>
	>({
		key: [route, page, limit],
		url: `/api/${route}`,
		params: { page: page + 1, limit },
	});

	const { mutateAsync: handleCreate, isPending: isPendingCreate } = useMutate({
		key: [`create-${route}`],
		url: `/api/${route}`,
		options: {
			onError: () => {
				setIsMutateAction(false);
				toast.error(errorMessage);
			},
		},
	});

	const { mutateAsync: handleUpdate, isPending: isPendingUpdate } = useMutate({
		key: [`update-${route}`],
		url: `/api/${route}`,
		method: "PUT",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleDelete, isPending: isPendingDelete } = useMutate({
		key: [`delete-${route}`],
		url: `/api/${route}`,
		method: "DELETE",
		options: {
			onError: () => {
				setIsMutateAction(false);
				toast.error("Ceva nu a mers cum trebuie. Încearcă mai târziu");
			},
		},
	});

	const onCreatingRowSave: TableCreateRow<T> = async ({ values, table }) => {
		const data = omit(values, ["id", "created_at", "updated_td"]);

		setIsMutateAction(true);
		await handleCreate(data);
		await refetch().then(() => {
			setIsMutateAction(false);
			table.setCreatingRow(null);
			toast.success("Datele au fost salvate cu succes");
		});
	};

	const onEditingRowSave: TableEditRow<T> = async ({ values, table }) => {
		await handleUpdate(values);
		table.setEditingRow(null);
	};

	const onDeletingRowSave = async ({ row }: TableRowAndTable<T>) => {
		setIsMutateAction(true);
		await handleDelete({ id: row.original.id });
		await refetch().then(() => {
			setIsMutateAction(false);
			toast.success("Datele au fost șterse cu succes");
		});
	};

	const loading =
		isLoading ||
		isPendingCreate ||
		isPendingUpdate ||
		isPendingDelete ||
		(isMutateAction && isRefetching);

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
