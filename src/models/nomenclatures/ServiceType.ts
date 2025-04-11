import { FilterType } from "./FilterType";

export type ServiceType = {
	id: number;
	name: string;
	active?: boolean;
	keywords?: string[];
	filters?: FilterType[];
	isSelected?: boolean; // this is injected by FE, doesn't exist in BE
};

export type PaginatedServiceType = {
	count: number;
	results: ServiceType[];
};
