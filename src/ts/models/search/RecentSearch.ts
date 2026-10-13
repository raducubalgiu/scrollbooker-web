export interface RecentSearchSubFilter {
  id: number;
  name: string;
}

export interface RecentSearchFilter {
  id: number;
  name: string;
  sub_filters: RecentSearchSubFilter[];
}

export interface RecentSearchService {
  id: number;
  name: string;
  filters: RecentSearchFilter[];
}

export interface RecentSearchServiceDomain {
  id: number;
  name: string;
}

export interface RecentSearch {
  id: number;
  business_domain_id: number | null;
  service_domain: RecentSearchServiceDomain;
  services: RecentSearchService[];
}
