export type BusinessDomainType = {
  id?: number;
  name: string;
  short_name: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
  service_domains: BusinessDomainServiceDomainType[];
};

export type BusinessDomainServiceDomainType = {
  id: number;
  name: string;
  url: string;
  thumbnail_url: string;
};

export type BusinessDomainsResponse = BusinessDomainType[];
