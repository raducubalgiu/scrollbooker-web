import dayjs from "dayjs";
import "dayjs/locale/ro";
dayjs.locale("ro");

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import {
	maxField,
	minField,
	required,
	min,
	max,
} from "@/utils/validation-rules";
import { shortPrettyDate, shortTimeFormat } from "@/utils/date-utils-dayjs";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { ChangeEvent, useState } from "react";
import EditChangeIconButton from "../../IconButtons/EditChangeIconButton";
import { useUserClientSession } from "@/lib/auth/get-user-client";
import { find, get } from "lodash";
import { toast } from "react-toastify";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { CalendarEventsSlotType } from "@/ts/models/Calendar/CalendarEventsType";
import { ServiceType } from "@/ts/models/nomenclatures/ServiceType";
import { ProductType } from "@/ts/models/Product/ProductResponse";
import { CurrencyType } from "@/ts/models/nomenclatures/CurrencyType";

type CreateEventModalProps = {
	openCreate: boolean;
	handleClose: () => void;
	slot: CalendarEventsSlotType;
};

type AppointmentCreateResponseType = {
	id: number;
	start_date: string;
	end_date: string;
	status: string;
	instant_booking: boolean;
	channel: "scroll_booker" | "own_client";
	exchange_rate: number;
	is_blocked: boolean;
	user_id: number;
	business_id: number;
	product_id: number;
	service_id: number;
	currency_id: number;
	customer_id: number | undefined;
	message: string | undefined;
	customer_fullname: string;
	service_name: string;
	product_name: string;
	product_full_price: number;
	product_price_with_discount: number;
	product_discount: number;
	created_at: string;
	updated_at: string;
};

type AppointmentDefaultValues = {
	service_id: number | undefined;
	product_id: number | undefined;
	customer_fullname: string;
	product_name: string;
	product_full_price: number | undefined;
	product_price_with_discount: number | undefined;
	product_discount: number | undefined;
	currency_id: number | undefined;
};

const defaultValues = {
	service_id: undefined,
	product_id: undefined,
	customer_fullname: "",
	product_name: "",
	product_full_price: undefined,
	product_price_with_discount: undefined,
	product_discount: undefined,
	currency_id: undefined,
};

export default function CalendarEventsCreateModal({
	openCreate,
	handleClose,
	slot,
}: CreateEventModalProps) {
	const { updateSlot } = useCalendarEventsContext();
	const { businessId, userId } = useUserClientSession();
	const [editProduct, setEditProduct] = useState(false);
	const isRequired = required();

	const methods = useForm<AppointmentDefaultValues>({
		defaultValues,
	});
	const { handleSubmit, reset, watch, setValue } = methods;

	const productFullPrice = watch("product_price_with_discount") ?? 0;
	const productDiscount = watch("product_discount") ?? 0;
	const getPriceWithDiscount = (discount: undefined | number) =>
		!!discount
			? productFullPrice - (discount / 100) * productFullPrice
			: productFullPrice;
	const serviceId = watch("service_id");

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

	const options = (model: ServiceType[] | ProductType[] | CurrencyType[]) =>
		model.map(option => {
			return {
				value: String(option.id),
				name: option.name,
			};
		});

	const findFieldProduct = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: string
	) => {
		const product = find(products, ["id", Number(e.target.value)]);
		return get(product, `${field}`);
	};

	const handleChangeProduct = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValue("product_id", Number(event.target.value));
		setValue("product_full_price", findFieldProduct(event, "price"));
		setValue(
			"product_price_with_discount",
			findFieldProduct(event, "price_with_discount")
		);
		setValue("product_discount", findFieldProduct(event, "discount"));
		setValue("currency_id", findFieldProduct(event, "currency_id"));
	};

	const { mutate: handleCreateAppointment, isPending } = useMutate({
		key: ["create-appointment"],
		url: "/api/calendar/create-appointment",
		options: {
			onSuccess: (response: AppointmentCreateResponseType) => {
				updateSlot({
					...slot,
					is_booked: true,
					info: {
						...slot.info,
						product: {
							product_name: response.product_name,
							product_full_price: response.product_full_price,
							product_price_with_discount: response.product_price_with_discount,
							product_discount: response.product_discount,
						},
						channel: response.channel,
						service_name: response.service_name,
						currency: {
							id: response.currency_id,
							name: find(currencies, ["id", response.currency_id])?.name ?? "",
						},
						customer: {
							id: undefined,
							fullname: response.customer_fullname,
							username: undefined,
							avatar: undefined,
						},
						message: "",
					},
				});
				handleClose();
				toast.success("Datele au fost salvate cu succes");
			},
		},
	});

	const handleAppointment = (data: AppointmentDefaultValues) => {
		const product_name = !data.product_name
			? find(products, ["id", data.product_id])?.name
			: data.product_name;

		const service_name = find(services, ["id", Number(data.service_id)])?.name;

		handleCreateAppointment({
			...data,
			product_full_price: productFullPrice,
			product_price_with_discount: getPriceWithDiscount(productDiscount),
			start_date: slot.start_date_utc,
			end_date: slot.end_date_utc,
			user_id: userId,
			business_id: businessId,
			product_name,
			service_name,
		});
	};

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
				loading: isPending,
			},
		},
	];

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
					name="customer_fullname"
					placeholder="Numele clientului"
					rules={{ ...isRequired, ...minField(3), ...maxField(50) }}
					sx={{ mb: 2.5 }}
				/>
				<InputSelect
					required
					rules={{ ...isRequired, valueAsNumber: true }}
					name="service_id"
					options={options(services ?? [])}
					label="Alege un Serviciu"
					sx={{ mb: 2.5 }}
				/>
				<CustomStack mb={2.5}>
					{!editProduct ? (
						<InputSelect
							rules={{ ...isRequired, valueAsNumber: true }}
							name="product_id"
							options={options(products ?? [])}
							label="Alege un produs existent"
							onChange={handleChangeProduct}
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
							setValue("product_id", undefined);
							setValue("product_full_price", undefined);
							setValue("product_price_with_discount", undefined);
							setValue("product_discount", undefined);
							setValue("currency_id", undefined);
						}}
					/>
				</CustomStack>
				<Paper sx={{ p: 2.5 }}>
					<Input
						name="product_price_with_discount"
						label="Preț"
						placeholder="Preț"
						sx={{ mb: 2.5 }}
						rules={{ ...isRequired, ...min(10) }}
						disabled={!editProduct}
						type="number"
					/>
					<Input
						name="product_discount"
						label="Discount %"
						placeholder="Discount"
						sx={{ mb: 2.5 }}
						rules={{
							...min(0),
							...max(90),
						}}
						disabled={!editProduct}
						type="number"
					/>
					<TextField
						fullWidth
						value={getPriceWithDiscount(productDiscount) ?? 0}
						label="Preț final"
						placeholder="Preț final"
						disabled={true}
						sx={{ mb: 2.5 }}
					/>
					<InputSelect
						rules={isRequired}
						name="currency_id"
						options={options(currencies ?? [])}
						label="Alege Moneda"
						sx={{ mb: 2.5 }}
						disabled={!editProduct}
					/>
				</Paper>
			</Modal>
		</FormProvider>
	);
}
