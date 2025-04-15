import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { MRT_ColumnDef } from "material-react-table";

export const servicesColumns: MRT_ColumnDef<ServiceType>[] = [
	{
		accessorKey: "id",
		header: "ID",
		enableEditing: false,
		size: 50,
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "keywords",
		header: "Keywords",
	},
	{
		accessorKey: "created_at",
		enableEditing: false,
		header: "Created_at",
	},
];
