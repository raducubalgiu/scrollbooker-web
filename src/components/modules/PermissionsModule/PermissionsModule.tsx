"use client";

import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useMutate } from "@/hooks/useHttp";
import { Checkbox } from "@mui/material";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import React, { useMemo, useState } from "react";
import RolesModule from "../RolesModule/RolesModule";

type PermissionWithRolesType = {
	id: number;
	name: string;
	code: string;
	roles: { id: number; name: string; assigned: boolean }[];
};

export default function PermissionsModule() {
	const [openRoleModal, setOpenRoleModal] = useState(false);
	const {
		data,
		refetch: refetchPermissions,
		isLoading,
		pagination,
		onCreatingRowSave,
		onEditingRowSave,
		onDeletingRowSave,
	} = useTableHandlers<PermissionWithRolesType>({
		route: "nomenclatures/permissions",
	});

	const { mutate: attachPermission, isPending: isPendingAttach } = useMutate({
		key: ["attach-permission-role"],
		url: "/api/nomenclatures/permissions/attach-permission-role",
		options: {
			onSuccess: () => refetchPermissions(),
		},
	});

	const { mutate: detachPermission, isPending: isPendingDetach } = useMutate({
		key: ["detach-permission-role"],
		url: "/api/nomenclatures/permissions/attach-permission-role",
		method: "DELETE",
		options: {
			onSuccess: () => refetchPermissions(),
		},
	});

	const allRolesNames = useMemo(() => {
		if (data?.results?.length === 0 || data?.results == undefined) return [];
		return data?.results[0].roles.map(role => role.name);
	}, [data]);

	const columns = useMemo<MRT_ColumnDef<PermissionWithRolesType>[]>(() => {
		const baseColumns: MRT_ColumnDef<PermissionWithRolesType>[] = [
			{
				accessorKey: "name",
				header: "Name",
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
			{
				accessorKey: "code",
				header: "Code",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.code}
						minLength={3}
						maxLength={50}
						required
					/>
				),
			},
		];

		const roleColumns = allRolesNames?.map(roleName => {
			return {
				id: roleName,
				header: roleName.toUpperCase(),
				accesorFn: (row: PermissionWithRolesType) => {
					return row.roles.find(r => r.name === roleName);
				},
				Cell: ({ row }: { row: MRT_Row<PermissionWithRolesType> }) => {
					const permission = row.original;
					const permissionId = row.original.id;
					const roleIndex = permission?.roles.findIndex(
						r => r.name === roleName
					);
					const roleId = permission?.roles[roleIndex]?.id;
					const assigned = permission?.roles[roleIndex]?.assigned ?? false;

					const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
						if (e.target.checked) {
							attachPermission({ permissionId, roleId });
						} else {
							detachPermission({ permissionId, roleId });
						}
					};

					return <Checkbox checked={assigned} onChange={onHandleChange} />;
				},
				Edit: () => <></>,
			};
		});

		return [...baseColumns, ...(roleColumns ?? [])];
	}, [allRolesNames, attachPermission, detachPermission]);

	return (
		<MainLayout
			title="Roluri și Permisiuni"
			actionTitle="Roluri"
			onOpenModal={() => setOpenRoleModal(true)}
		>
			<RolesModule
				open={openRoleModal}
				handleClose={() => {
					setOpenRoleModal(false);
					refetchPermissions();
				}}
			/>
			<Table<PermissionWithRolesType>
				data={data?.results}
				rowCount={data?.count}
				columns={columns}
				manualPagination={true}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{
					pagination,
					isLoading,
					showProgressBars: isPendingAttach || isPendingDetach,
				}}
			/>
		</MainLayout>
	);
}
