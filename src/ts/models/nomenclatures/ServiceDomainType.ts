import { ServiceType } from "./ServiceType";

type ServiceDomainBusinessDomainResponse = {
	id: number,
	name: string
}

export type ServiceDomainsResponse = {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	business_domain: ServiceDomainBusinessDomainResponse;
	services?: ServiceType[];
};
