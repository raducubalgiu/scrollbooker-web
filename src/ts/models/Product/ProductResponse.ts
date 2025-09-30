import { SubFilterType } from "../nomenclatures/SubFilterType";

export type ProductType = {
	id: number;
	name: string;
	description: string;
	duration: number;
	price: number;
	service_id: number;
	business_id: number;
	user_id: number;
	price_with_discount: number;
	currency_id: number;
	discount: number;
	created_at: string;
	updated_at: string;
	sub_filters?: SubFilterType[];
};
