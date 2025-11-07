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

type UseTableHandlersProps = {
	route: string;
	extraParams?: Record<string, string | number | boolean | undefined>;
	manualPagination?: boolean;
	enabled?: boolean;
};
const errorMessage = "Ceva nu a mers cum trebuie. Încearcă mai târziu";

export default function useTableHandlers<T extends Record<string, unknown>>({
	route,
	extraParams = {},
	manualPagination = true,
	enabled = true
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
		key: [route, page, limit, JSON.stringify(extraParams)],
		url: `/api/${route}`,
		params: { page: page + 1, limit, ...extraParams },
		options: { enabled }
	});

	const { mutateAsync: handleCreate, isPending: isPendingCreate } = useMutate({
		key: [`create-${route}`],
		url: `/api/${route}`,
		method: "POST",
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

	const onCreatingRowSave: TableCreateRow<T> = async ({
		exitCreatingMode,
		row,
		values,
		table,
	}) => {
		const data = omit(values, ["id", "created_at", "updated_td"]);

		setIsMutateAction(true);
		await handleCreate({ ...data, ...extraParams });
		await refetch().then(() => {
			setIsMutateAction(false);
			Object.entries(values).forEach(([key, value]) => {
				table.options.meta?.updateData?.(row.index, key, value);
			});
			exitCreatingMode();
			toast.success("Datele au fost salvate cu succes");
		});
	};

	const onEditingRowSave: TableEditRow<T> = async ({
		exitEditingMode,
		row,
		values,
		table,
	}) => {
		if (extraParams) delete extraParams.id;

		for (const key in extraParams) {
			if (key in values) {
				throw new Error(`Key ${key} from extraParams already exists in value`);
			}
		}

		await handleUpdate({ id: row.original.id, ...values, ...extraParams });

		Object.entries(values).forEach(([key, value]) => {
			table.options.meta?.updateData?.(row.index, key, value);
		});
		exitEditingMode();
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
		refetch,
		isLoading: loading,
		pagination: manualPagination ? pagination : undefined,
		setPagination: manualPagination ? setPagination : undefined,
		onEditingRowSave,
		onCreatingRowSave,
		onDeletingRowSave,
	};
}
