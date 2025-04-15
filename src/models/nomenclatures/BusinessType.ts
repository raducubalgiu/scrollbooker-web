import { ServiceType } from "./ServiceType";
import { FilterType } from "./FilterType";

export type BusinessType = {
	id?: number;
	name: string;
	active?: boolean;
	created_at?: string;
	updated_at?: string;
	services?: ServiceType[];
	filters?: FilterType[];
};
