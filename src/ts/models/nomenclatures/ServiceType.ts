import { FilterType } from "./FilterType";

export type ServiceType = {
	id?: number;
	name: string;
	active?: boolean;
	keywords?: string[];
	business_domain_id: number;
	service_domain_id: number;
	filters?: FilterType[];
	isSelected?: boolean; // this is injected by FE, doesn't exist in BE
};
