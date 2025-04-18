"use client";

import { ProductType } from "@/models/Product/ProductResponse";
import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import useProductColumns from "./useProductColumns";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { FilterType } from "@/models/nomenclatures/FilterType";

type ProductsModuleProps = {
	services: ServiceType[];
	available_filters: FilterType[];
	business_id: number;
};

export default function ProductsModule({
	services,
	available_filters,
	business_id,
}: ProductsModuleProps) {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<ProductType>({
		route: "products",
		extraParams: { business_id },
	});

	const durations = [
		{ duration_minutes: 5, label: "5 minute" },
		{ duration_minutes: 10, label: "10 minute" },
		{ duration_minutes: 15, label: "15 minute" },
		{ duration_minutes: 20, label: "20 de minute" },
		{ duration_minutes: 25, label: "25 de minute" },
		{ duration_minutes: 30, label: "30 de minute" },
		{ duration_minutes: 35, label: "35 de minute" },
		{ duration_minutes: 40, label: "40 de minute" },
		{ duration_minutes: 45, label: "45 de minute" },
		{ duration_minutes: 50, label: "50 de minute" },
		{ duration_minutes: 55, label: "55 de minute" },
		{ duration_minutes: 60, label: "1 oră" },
		{ duration_minutes: 65, label: "1 oră și 5 minute" },
		{ duration_minutes: 70, label: "1 oră și 10 minute" },
		{ duration_minutes: 75, label: "1 oră și 15 minute" },
		{ duration_minutes: 80, label: "1 oră și 20 de minute" },
		{ duration_minutes: 85, label: "1 oră și 25 minute" },
		{ duration_minutes: 90, label: "1 oră și 30 de minute" },
		{ duration_minutes: 95, label: "1 oră și 35 de minute" },
		{ duration_minutes: 100, label: "1 oră și 40 de minute" },
		{ duration_minutes: 105, label: "1 oră și 45 de minute" },
		{ duration_minutes: 110, label: "1 oră și 50 de minute" },
		{ duration_minutes: 115, label: "1 oră și 55 de minute" },
		{ duration_minutes: 120, label: "2 ore" },
		{ duration_minutes: 125, label: "2 ore și cinci minute" },
		{ duration_minutes: 130, label: "2 ore și 10 minute" },
		{ duration_minutes: 135, label: "2 ore și 15 minute" },
		{ duration_minutes: 140, label: "2 ore și 20 de minute" },
		{ duration_minutes: 145, label: "2 ore și 25 de minute" },
		{ duration_minutes: 150, label: "2 ore și 30 de minute" },
	];

	const { columns, hasErrors } = useProductColumns({
		services,
		durations,
		available_filters,
	});

	return (
		<Table<ProductType>
			data={data?.results}
			rowCount={data?.count}
			columns={columns}
			manualPagination={true}
			onDeletingRowSave={onDeletingRowSave}
			onEditingRowSave={!hasErrors ? onEditingRowSave : undefined}
			onCreatingRowSave={!hasErrors ? onCreatingRowSave : undefined}
			onPaginationChange={setPagination}
			state={{ pagination, isLoading }}
		/>
	);
}
