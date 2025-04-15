import { MRT_ColumnDef } from "material-react-table";
import { BusinessType } from "@/models/nomenclatures/BusinessType";
import { ServiceType } from "@/models/nomenclatures/ServiceType";

export const businessTypeColumns: MRT_ColumnDef<BusinessType>[] = [
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
		accessorKey: "business_domain_id",
		header: "Business Domain Id",
		enableEditing: false,
	},
	{
		accessorKey: "created_at",
		header: "Created At",
		enableEditing: false,
	},
];

export const businessTypeServicesColumns: MRT_ColumnDef<ServiceType>[] = [
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
