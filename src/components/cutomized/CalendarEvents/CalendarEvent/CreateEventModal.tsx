import dayjs from "dayjs";
import "dayjs/locale/ro";
dayjs.locale("ro");

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Divider, Stack, Typography } from "@mui/material";
import { SlotType } from "../calendar-utils/calendar-types";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import { maxField, minField, required, min } from "@/utils/validation-rules";
import { shortPrettyDate, shortTimeFormat } from "@/utils/date-utils-dayjs";
import { useCustomQuery } from "@/hooks/useHttp";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { ProductType } from "@/models/Product/ProductResponse";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { ChangeEvent, useState } from "react";
import EditChangeIconButton from "../../IconButtons/EditChangeIconButton";

type CreateEventModalProps = {
	openCreate: boolean;
	handleClose: () => void;
	slot: SlotType;
};

export default function CreateEventModal({
	openCreate,
	handleClose,
	slot,
}: CreateEventModalProps) {
	const [editProduct, setEditProduct] = useState(false);
	const isRequired = required();
	const methods = useForm({
		defaultValues: {
			customer_username: "",
			service_id: "",
			product_id: "",
			product_name: "",
			currency: 1,
			price: "",
		},
	});

	const { handleSubmit, reset, watch, setValue } = methods;
	const serviceId = watch("service_id");

	const handleAppointment = () => {};

	const actions: ActionButtonType[] = [
		{
			title: "Renunță",
			props: {
				onClick: () => {
					reset();
					handleClose();
				},
				color: "inherit",
			},
		},
		{
			title: "Salvează",
			props: {
				onClick: handleSubmit(handleAppointment),
			},
		},
	];

	const startTime = shortTimeFormat(slot.start_date_locale);
	const endTime = shortTimeFormat(slot.end_date_locale);

	const { data: services, isLoading: isLoadingServices } = useCustomQuery<
		ServiceType[]
	>({
		key: ["user-services"],
		url: "/api/calendar/services",
		options: { enabled: openCreate },
	});

	const { data: products, isLoading: isLoadingProducts } = useCustomQuery<
		ProductType[]
	>({
		key: ["user-products-by-service", serviceId, openCreate],
		url: "/api/calendar/products",
		params: { serviceId },
		options: { enabled: openCreate && !!serviceId },
	});

	const { data: currencies } = useCustomQuery<ProductType[]>({
		key: ["user-currencies"],
		url: "/api/calendar/currencies",
		options: { enabled: openCreate },
	});

	const servicesOptions = (services ?? [])?.map(service => {
		return {
			value: String(service.id),
			name: service.name,
		};
	});

	const productsOptions = (products ?? [])?.map(service => {
		return {
			value: String(service.id),
			name: service.name,
		};
	});

	const currenciesOptions = (currencies ?? [])?.map(currency => {
		return {
			value: String(currency.id),
			name: currency.name,
		};
	});

	const findPrice = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const product = products?.find(prod => prod.id === Number(e.target.value));
		return String(product?.price);
	};

	return (
		<FormProvider {...methods}>
			<Modal
				open={openCreate}
				handleClose={() => {
					reset();
					handleClose();
				}}
				title="Creează o programare"
				actions={actions}
			>
				<Stack minWidth={500}>
					<Typography fontWeight={600} fontSize={18} mb={0.5}>
						Data: {shortPrettyDate(slot.start_date_locale)}
					</Typography>
					<Typography fontWeight={600} fontSize={18}>
						Slot: {startTime} - {endTime}
					</Typography>
				</Stack>
				<Divider sx={{ my: 2.5 }} />
				<Input
					label="Numele clientului"
					name="customer_username"
					placeholder="Numele clientului"
					rules={{ ...isRequired, ...minField(3), ...maxField(50) }}
					sx={{ mb: 2.5 }}
				/>
				<InputSelect
					rules={isRequired}
					name="service_id"
					options={servicesOptions}
					label="Alege un Serviciu"
					sx={{ mb: 2.5 }}
				/>
				<CustomStack mb={2.5}>
					{!editProduct ? (
						<InputSelect
							rules={isRequired}
							name="product_id"
							options={productsOptions}
							label="Alege un produs existent"
							onChange={event => {
								setValue("product_id", String(event.target.value));
								setValue("price", findPrice(event));
							}}
						/>
					) : (
						<Input
							name="product_name"
							label="Adaugă un nume produsului"
							placeholder="Adaugă un nume produsului"
						/>
					)}
					<EditChangeIconButton
						title="Comută la produsele existente"
						loading={isLoadingServices || isLoadingProducts}
						isEdit={editProduct}
						onClick={() => {
							setEditProduct(edit => !edit);
							setValue("product_id", "");
							setValue("price", "");
						}}
					/>
				</CustomStack>
				<Input
					name="price"
					label="Prețul produsului"
					placeholder="Prețul produsului"
					sx={{ mb: 2.5 }}
					rules={{ ...isRequired, ...min(10) }}
					disabled={!editProduct}
					type="number"
				/>
				<InputSelect
					rules={isRequired}
					name="currency_id"
					options={currenciesOptions}
					label="Alege Moneda"
					sx={{ mb: 2.5 }}
					//disabled={!editProduct}
				/>
			</Modal>
		</FormProvider>
	);
}
