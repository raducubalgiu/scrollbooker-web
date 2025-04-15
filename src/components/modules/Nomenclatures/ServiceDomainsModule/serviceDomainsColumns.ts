import { MRT_ColumnDef } from "material-react-table";
import { ServiceDomainsType } from "@/models/nomenclatures/ServiceDomainType";
import { ServiceType } from "@/models/nomenclatures/ServiceType";

export const serviceDomainsColumns: MRT_ColumnDef<ServiceDomainsType>[] = [
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
	{
		accessorKey: "created_at",
		header: "Created_at",
		enableEditing: false,
	},
	{
		accessorKey: "updated_at",
		header: "updated_at",
		enableEditing: false,
	},
];

export const serviceColumns: MRT_ColumnDef<ServiceType>[] = [
	{
		accessorKey: "id",
		header: "ID",
		size: 50,
	},
	{
		accessorKey: "name",
		header: "Name",
		size: 300,
	},
];
