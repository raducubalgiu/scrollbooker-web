import React, { useMemo, useState } from "react";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { MRT_ColumnDef } from "material-react-table";
import Table from "@/components/core/Table/Table";
import ProfessionBusinessTypesCheckbox from "./ProfessionBusinessTypeCheckbox";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ProfessionBusinessTypesProps = {
	businessDomainId: number;
	professionId: number;
	professionName: string;
};

export default function ProfessionBusinessTypes({
	businessDomainId,
	professionId,
	professionName,
}: ProfessionBusinessTypesProps) {
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
		route: "nomenclatures/business-domains/business-types",
		extraParams: { id: businessDomainId },
		enabled: isExpanded
	});

	const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				enableEditing: false,
				size: 50,
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
					<ProfessionBusinessTypesCheckbox
						row={row}
						professionId={professionId}
						professionName={professionName}
					/>
				),
			},
		],
		[professionId, professionName]
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
					onCreatingRowSave={onCreatingRowSave}
					onEditingRowSave={onEditingRowSave}
					onDeletingRowSave={onDeletingRowSave}
					manualPagination={true}
					onPaginationChange={setPagination}
					enableTopToolbar={false}
					enableEditing={false}
					state={{ pagination, isLoading }}
					muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
				/>
            </AccordionDetails>
		</Accordion>
	);
}
