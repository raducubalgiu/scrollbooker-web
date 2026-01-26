import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import { ServiceType } from "@/ts/models/nomenclatures/ServiceType";
import { FormControl } from "@mui/material";
import { FieldValues, useFormContext } from "react-hook-form";
import { some, filter } from "lodash";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";

type MyBusinessodalServicesProps = {
	open: boolean;
	handleClose: () => void;
	allServices: ServiceType[];
	savedServices: ServiceType[];
	businessId: number;
};

export default function MyBusinessModalServices({
	open,
	handleClose,
	allServices,
	savedServices,
	businessId,
}: MyBusinessodalServicesProps) {
	const { handleSubmit, reset } = useFormContext();

	const { mutate: saveServices, isPending } = useMutate({
		key: ["save-services"],
		url: "/api/my-business/services",
		method: "POST",
		options: {
			onSuccess: () => {
				handleClose();
				toast.success("Serviciile au fost salvate cu succes");
			},
		},
	});

	const handleSave = (data: FieldValues) => {
		const selectedServices = filter(data.services, { isSelected: true });
		const servicesIds = selectedServices.map(service => service.id);
		saveServices({ businessId, servicesIds });
	};

	const actions: ActionButtonType[] = [
		{
			title: "Salveaza",
			props: {
				onClick: handleSubmit(handleSave),
				loading: isPending,
			},
		},
	];

	return (
		<Modal
			title="Adaugă Servicii"
			open={open}
			handleClose={() => {
				reset();
				handleClose();
			}}
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
