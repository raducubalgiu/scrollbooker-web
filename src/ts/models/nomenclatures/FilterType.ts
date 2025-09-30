import { SubFilterType } from "./SubFilterType";

export type FilterType = {
	id: number;
	name: string;
	active: boolean;
	created_at: string;
	updated_at: string;
	sub_filters?: SubFilterType[];
};

export type PaginatedFilterType = {
	count: number;
	results: FilterType[];
};
