import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import ServiceBusinessTypeCheckbox from "./ServiceBusinessTypeCheckbox";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ServiceBusinessTypesProps = {
	serviceId: number | undefined;
	serviceName: string;
	businessDomainId: number;
};

export default function ServiceBusinessTypes({
	serviceId,
	serviceName,
	businessDomainId,
}: ServiceBusinessTypesProps) {
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
					<ServiceBusinessTypeCheckbox
						row={row}
						serviceId={serviceId}
						serviceName={serviceName}
						isExpanded={isExpanded}
					/>
				),
			},
		],
		[serviceId, serviceName, isExpanded]
	);

	return (
		<Accordion
			expanded={isExpanded}
			onChange={() => setIsExpanded(expanded => !expanded)}
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
