import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { ServiceType } from "@/ts/models/nomenclatures/ServiceType";
import { MRT_ColumnDef } from "material-react-table";
import React, { useState } from "react";
import Table from "@/components/core/Table/Table";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type BusinessTypeServicesModuleProps = { businessTypeId: number | undefined };

export default function BusinessTypeServicesModule({
	businessTypeId,
}: BusinessTypeServicesModuleProps) {
	const [isExpanded, setIsExpanded] = useState(false)
	
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onDeletingRowSave,
		onCreatingRowSave,
		onEditingRowSave,
	} = useTableHandlers<ServiceType>({
		route: "nomenclatures/business-types/services",
		extraParams: { businessTypeId },
		enabled: isExpanded
	});

	const columns: MRT_ColumnDef<ServiceType>[] = [
		{
			accessorKey: "id",
			header: "ID",
			size: 50,
			enableEditing: false,
		},
		{
			accessorKey: "name",
			header: "Name",
		},
	];

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
					Servicii:
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Table<ServiceType>
					data={data}
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
