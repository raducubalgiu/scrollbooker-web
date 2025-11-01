import Modal from "@/components/core/Modal/Modal";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { RoleType } from "@/ts/models/Role/RoleType";
import { Paper, useTheme } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";

type RolesModuleProps = { open: boolean; handleClose: () => void };

export default function RolesModule({ open, handleClose }: RolesModuleProps) {
	const {
		data,
		pagination,
		setPagination,
		isLoading,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<RoleType>({ route: "nomenclatures/roles" });
	const theme = useTheme()

	const columns = useMemo<MRT_ColumnDef<RoleType>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Nume",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.name}
						required
						minLength={3}
						maxLength={50}
					/>
				),
			},
		],
		[]
	);

	return (
		<Modal title="Roluri" open={open} handleClose={handleClose} actions={[]}>
			<Paper sx={{ minWidth: 1000 }}>
				<Table
					data={data?.results}
					rowCount={data?.count}
					columns={columns}
					manualPagination={true}
					onPaginationChange={setPagination}
					onCreatingRowSave={onCreatingRowSave}
					onEditingRowSave={onEditingRowSave}
					onDeletingRowSave={onDeletingRowSave}
					state={{
						pagination,
						isLoading,
					}}
					bgColor={theme.palette.background.default}
				/>
			</Paper>
		</Modal>
	);
}
