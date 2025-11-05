import Table from "@/components/core/Table/Table";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import ServiceFilterCheckbox from "./ServiceFilterCheckbox";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type ServiceFiltersProps = {
    serviceId: number | undefined;
    serviceName: string;
    filters: FilterType[];
};

export default function ServiceFilters({
    serviceId,
    serviceName,
    filters
}: ServiceFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const columns = useMemo<MRT_ColumnDef<FilterType>[]>(
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
                    <ServiceFilterCheckbox
                        row={row}
                        serviceId={serviceId}
                        serviceName={serviceName}
                        isExpanded={isExpanded}
                    />
                ),
            },
        ],
        [serviceId, serviceName]
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
					Filtre:
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
                <Table<FilterType>
                data={filters}
                rowCount={0}
                columns={columns}
                manualPagination
                enableFilters={false}
                enableEditing={false}
                enableTopToolbar={false}
                muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
            />
            </AccordionDetails>
		</Accordion>
    );
}