import React, { useMemo, useState } from "react";
import Table from "@/components/core/Table/Table";
import { SubFilterType } from "@/ts/models/nomenclatures/SubFilterType";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SubFiltersModule({ row }: { row: MRT_Row<FilterType> }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const {
		data: subFilters,
		isLoading: isLoadingSubFilters,
		pagination: subFiltersPagination,
		setPagination: setSubFiltersPagination,
		onCreatingRowSave: onSubFilterCreatingRowSave,
		onDeletingRowSave: onSubFilterDeletingRowSave,
		onEditingRowSave: onSubFilterEditingRowSave,
	} = useTableHandlers<SubFilterType>({
		route: "nomenclatures/sub-filters",
		extraParams: { id: row.original.id },
		enabled: isExpanded
	});

	const subFiltersColumns = useMemo<MRT_ColumnDef<SubFilterType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
				enableEditing: false,
			},
			{
				accessorKey: "name",
				header: "Name",
				size: 300,
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
		<Accordion
			expanded={isExpanded}
			onChange={() => setIsExpanded(expanded => !expanded)}
            sx={{mb: 1.5}}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span" sx={{ fontWeight: "600" }}>
					Subfiltre:
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
                <Table<SubFilterType>
					data={subFilters?.results}
					rowCount={subFilters?.count}
					columns={subFiltersColumns}
					manualPagination={true}
					enableColumnFilters={false}
					enableSorting={false}
					topToolbarIconButton
					enableFilters={false}
					onPaginationChange={setSubFiltersPagination}
					onCreatingRowSave={onSubFilterCreatingRowSave}
					onEditingRowSave={onSubFilterEditingRowSave}
					onDeletingRowSave={onSubFilterDeletingRowSave}
					state={{
						pagination: subFiltersPagination,
						isLoading: isLoadingSubFilters,
					}}
					muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
				/>
            </AccordionDetails>
		</Accordion>
	);
}
