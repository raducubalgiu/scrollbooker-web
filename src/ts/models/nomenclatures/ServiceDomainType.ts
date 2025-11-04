import { ServiceType } from "./ServiceType";

export type ServiceDomainsResponse = {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	business_domain_id: number;
	services?: ServiceType[];
};
