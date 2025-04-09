import { ServiceType } from "./ServiceType";

export type ServiceDomainsType = {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	services?: ServiceType[];
};

export type PaginatedServiceDomainsType = {
	count: number;
	results: ServiceDomainsType[];
};
