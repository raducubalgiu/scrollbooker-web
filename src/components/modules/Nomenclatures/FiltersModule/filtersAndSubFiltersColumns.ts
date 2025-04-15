import { FilterType } from "@/models/nomenclatures/FilterType";
import { SubFilterType } from "@/models/nomenclatures/SubFilterType";
import { MRT_ColumnDef } from "material-react-table";

export const filtersColumns: MRT_ColumnDef<FilterType>[] = [
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
	{
		accessorKey: "created_at",
		header: "Created_at",
		enableEditing: false,
	},
	{
		accessorKey: "updated_at",
		header: "Updated_at",
		enableEditing: false,
	},
];

export const subFiltersColumns: MRT_ColumnDef<SubFilterType>[] = [
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
	},
];
