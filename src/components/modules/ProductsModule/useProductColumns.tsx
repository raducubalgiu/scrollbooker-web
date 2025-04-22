import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { ProductType } from "@/models/Product/ProductResponse";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { FilterType } from "@/models/nomenclatures/FilterType";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";

type useProductColumnsProps = {
	services: ServiceType[];
	durations: { duration_minutes: number; label: string }[];
	available_filters: FilterType[];
};

export default function useProductColumns({
	services,
	durations,
	available_filters,
}: useProductColumnsProps) {
	const baseColumns = useMemo<MRT_ColumnDef<ProductType>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Name",
				Edit: ({ row, column }) => (
					<MR_Input
						placeholder="Numele produsului"
						row={row}
						column={column}
						value={row.original.name}
						required
						minLength={3}
						maxLength={100}
					/>
				),
			},
			{
				accessorKey: "description",
				header: "Description",
				Edit: ({ row, column }) => (
					<MR_Input
						placeholder="Descriere"
						row={row}
						column={column}
						value={row.original.description}
						required
						minLength={3}
						maxLength={255}
						multiline
					/>
				),
			},
			{
				accessorKey: "service_id",
				header: "Serviciu",
				Edit: ({ row, column, cell }) => (
					<MR_Select
						required
						row={row}
						column={column}
						value={cell.getValue<number>() ?? ""}
						options={services.map(serv => {
							return {
								value: serv.id,
								name: serv.name,
							};
						})}
					/>
				),
				Cell: ({ cell }) =>
					services.find(service => service.id === cell.getValue())?.name,
			},
			{
				accessorKey: "duration",
				header: "Durata",
				Edit: ({ row, column, cell }) => (
					<MR_Select
						required
						row={row}
						column={column}
						value={cell.getValue<number>() ?? ""}
						options={durations.map(durr => {
							return {
								value: durr.duration_minutes,
								name: durr.label,
							};
						})}
					/>
				),
				Cell: ({ cell }) =>
					durations.find(d => d.duration_minutes === cell.getValue())?.label,
			},
			{
				accessorKey: "price",
				header: "Price",
				Edit: ({ row, column }) => (
					<MR_Input
						required
						placeholder="Adaugă un pret"
						row={row}
						column={column}
						type="number"
						value={row.original.price}
					/>
				),
			},
			{
				accessorKey: "discount",
				header: "Discount %",
				Edit: ({ row, column }) => (
					<MR_Input
						placeholder="Discount"
						row={row}
						column={column}
						value={row.original.discount}
						type="number"
						min={0}
						max={100}
					/>
				),
			},
		],
		[durations, services]
	);

	const dynamicColumns = useMemo(() => {
		return available_filters.map<MRT_ColumnDef<ProductType>>(filter => ({
			header: filter.name,
			accessorKey: `filter_${filter.name}`,
			Cell: ({ row }) => {
				const currentSub = row.original.sub_filters?.find(
					sf => sf.filter?.name === filter.name
				);
				return currentSub?.name || "-";
			},
			Edit: ({ row, column, cell }) => {
				return (
					<MR_Select
						row={row}
						column={column}
						value={
							cell.getValue<number>() ??
							row.original.sub_filters?.find(sf => sf.filter?.id === filter.id)
								?.id
						}
						options={(filter.sub_filters ?? []).map(sub => {
							return {
								value: sub.id,
								name: sub.name,
							};
						})}
					/>
				);
			},
		}));
	}, [available_filters]);

	return {
		columns: [...baseColumns, ...dynamicColumns],
		hasErrors: false,
	};
}
