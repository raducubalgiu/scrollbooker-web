import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { MRT_TableInstance, MRT_Row } from "material-react-table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";

type BusinessDomainsProps = {
	open: boolean;
	table: MRT_TableInstance<BusinessDomainType> | null;
	row?: MRT_Row<BusinessDomainType>;
	action: "CREATE" | "EDIT" | string;
};

export default function BusinessDomainsModal({
	open,
	table,
	row,
	action,
}: BusinessDomainsProps) {
	const methods = useForm({
		defaultValues: row?.original,
	});

	console.log("TABLE INSIDE MODAL!!!", table);

	const actions: ActionButtonType[] = [
		{
			title: "Cancel",
			props: {
				color: "inherit",
				onClick: () =>
					action === "CREATE"
						? table?.setCreatingRow(null)
						: table?.setEditingRow(null),
			},
		},
		{
			title: "Save",
		},
	];

	return (
		<FormProvider {...methods}>
			<Modal
				open={open}
				handleClose={() => table?.setEditingRow(null)}
				title="Add New Business Domain"
				actions={actions}
			>
				<Input name="name" label="Name" />
			</Modal>
		</FormProvider>
	);
}
