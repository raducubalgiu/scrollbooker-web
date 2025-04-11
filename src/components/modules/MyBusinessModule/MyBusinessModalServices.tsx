import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { FormControl } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { some } from "lodash";

type MyBusinessodalServicesProps = {
	open: boolean;
	handleClose: () => void;
	allServices: ServiceType[];
	savedServices: ServiceType[];
};

export default function MyBusinessModalServices({
	open,
	handleClose,
	allServices,
	savedServices,
}: MyBusinessodalServicesProps) {
	const { handleSubmit } = useFormContext();

	const handleSave = (data: FieldValues) => console.log("DATA!!!!", data);

	const actions: ActionButtonType[] = [
		{
			title: "Salveaza",
			props: {
				onClick: handleSubmit(handleSave),
			},
		},
	];

	return (
		<Modal
			title="Adaugă Servicii"
			open={open}
			handleClose={handleClose}
			actions={actions}
		>
			<FormControl>
				{allServices.map((service, i) => (
					<InputCheckbox
						key={service.id}
						name={`services.${i}.isSelected`}
						label={service.name}
						disabled={some(savedServices, { id: service.id })}
					/>
				))}
			</FormControl>
		</Modal>
	);
}
