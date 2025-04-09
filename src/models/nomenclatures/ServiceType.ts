import { FilterType } from "./FilterType";

export type ServiceType = {
	id: number;
	name: string;
	active: boolean;
	keywords: string[];
	filters?: FilterType[];
};

export type PaginatedServiceType = {
	count: number;
	results: ServiceType[];
};
