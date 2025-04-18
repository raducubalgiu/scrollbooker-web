import { hasValidationErrors } from "@/components/core/Table/validation-helpers";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { ProductType } from "@/models/Product/ProductResponse";
import { MRT_ColumnDef } from "material-react-table";
import { MenuItem } from "@mui/material";
import { useMemo, useState } from "react";
import { FilterType } from "@/models/nomenclatures/FilterType";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";

type useProductColumnsProps = {
	services: ServiceType[];
	durations: { duration_minutes: number; label: string }[];
	available_filters: FilterType[];
};

type ErrorsState = {
	name?: string;
	description?: string;
	price?: string;
	service_id?: string;
	duration?: string;
	discount?: string;
};

export default function useProductColumns({
	services,
	durations,
	available_filters,
}: useProductColumnsProps) {
	const [errors, setErrors] = useState<ErrorsState>({
		name: "Name is required",
		description: "Description is required",
		price: "Price is required",
		service_id: "Service is required",
		duration: "Duration is required",
		discount: "Discount is required",
	});

	const baseColumns = useMemo<MRT_ColumnDef<ProductType>[]>(
		() => [
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
						maxLength={100}
					/>
				),
			},
			{
				accessorKey: "description",
				header: "Description",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.description}
						required
						minLength={3}
						maxLength={255}
					/>
				),
			},
			{
				accessorKey: "service_id",
				header: "Serviciu",
				editVariant: "select",
				editSelectOptions: services.map(service => service.name),
				muiEditTextFieldProps: ({ cell, row, column, table }) => ({
					error: !!errors?.service_id, //highlight mui text field red error color
					helperText: errors?.service_id,
					select: true,
					value: cell.getValue<number>() ?? "",
					onChange: event => {
						const value = Number(event.target.value);
						if (!value) {
							setErrors(prev => ({
								...prev,
								service_id: "Service is required",
							}));
						} else {
							delete errors?.service_id;
							setErrors({ ...errors });
						}
						table.options.meta?.updateData?.(row.index, column.id, value);
					},
					children: services.map(service => (
						<MenuItem key={service.id} value={service.id}>
							{service.name}
						</MenuItem>
					)),
				}),
				Cell: ({ cell }) =>
					services.find(service => service.id === cell.getValue())?.name,
			},
			{
				accessorKey: "duration",
				header: "Durata",
				muiEditTextFieldProps: ({ cell, row, column, table }) => ({
					error: !!errors?.duration,
					helperText: errors?.duration,
					select: true,
					value: cell.getValue<number>() ?? "",
					onChange: event => {
						const value = Number(event.target.value);
						if (!value) {
							setErrors(prev => ({
								...prev,
								duration: "Duration is required",
							}));
						} else {
							delete errors?.duration;
							setErrors({ ...errors });
						}
						table.options.meta?.updateData?.(row.index, column.id, value);
					},
					children: durations.map(d => (
						<MenuItem key={d.duration_minutes} value={d.duration_minutes}>
							{d.label}
						</MenuItem>
					)),
				}),
				Cell: ({ cell }) =>
					durations.find(d => d.duration_minutes === cell.getValue())?.label,
			},
			{
				accessorKey: "price",
				header: "Price",
				muiEditTextFieldProps: {
					error: !!errors?.price,
					helperText: errors?.price,
					required: true,
					type: "number",
					onChange: event => {
						const value = Number(event.target.value);
						if (!value) {
							setErrors(prev => ({ ...prev, price: "Price is required" }));
						} else {
							delete errors?.price;
							setErrors({ ...errors });
						}
					},
				},
			},
			{
				accessorKey: "discount",
				header: "Discount %",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.discount}
						type="number"
						required
						min={0}
						max={100}
					/>
				),
			},
		],
		[durations, errors, services]
	);

	const dynamicColumns = useMemo(() => {
		return available_filters.map<MRT_ColumnDef<ProductType>>(filter => ({
			header: filter.name,
			accessorKey: `filter_${filter.name}`,
			type: "select",
			Cell: ({ row }) => {
				const currentSub = row.original.sub_filters?.find(
					sf => sf.filter?.name === filter.name
				);
				return currentSub?.name || "-";
			},
			muiEditTextFieldProps: ({ cell, row, column, table }) => {
				return {
					select: true,
					value: cell.getValue<number>() ?? "",
					onChange: event => {
						const value = event.target.value;
						table.options.meta?.updateData?.(row.index, column.id, value);
					},
					children: filter.sub_filters?.map(sub => (
						<MenuItem key={sub.id} value={sub.id}>
							{sub.name}
						</MenuItem>
					)),
				};
			},
		}));
	}, [available_filters]);

	return {
		columns: [...baseColumns, ...dynamicColumns],
		hasErrors: hasValidationErrors(errors),
	};
}
