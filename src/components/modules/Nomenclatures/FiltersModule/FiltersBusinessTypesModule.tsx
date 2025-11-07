import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import React, { useMemo, useState } from "react";
import FilterBusinessTypeCheckbox from "./FilterBusinessTypeCheckbox";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type FiltersBusinessTypesModuleProps = {
	filterRow: MRT_Row<FilterType>;
};

export default function FiltersBusinessTypesModule({
	filterRow,
}: FiltersBusinessTypesModuleProps) {
	const [isExpanded, setIsExpanded] = useState(false)
		
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<BusinessType>({ 
		route: "nomenclatures/business-types",
		enabled: isExpanded 
	});

	const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
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
				enableEditing: false,
			},
			{
				accessorKey: "relation",
				header: "Atasat",
				Cell: ({ row }) => (
					<FilterBusinessTypeCheckbox
						filterRow={filterRow}
						businessTypeRow={row}
						isExpanded={isExpanded}
					/>
				),
			},
		],
		[isExpanded, filterRow]
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
					Tip Business:
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Table<BusinessType>
				data={data?.results}
				rowCount={data?.count}
				columns={columns}
				manualPagination
				enableEditing={false}
				renderTopToolbar={false}
				onPaginationChange={setPagination}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading }}
				muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
			/>
			</AccordionDetails>
		</Accordion>
	);
}
