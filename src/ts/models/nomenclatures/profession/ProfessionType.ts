export interface Profession {
  id: number;
  name: string;
  business_domain_id: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BusinessTypeLoadOnly {
  id: number;
  name: string;
}

export interface ProfessionWithBusinessTypes extends Profession {
  business_types: BusinessTypeLoadOnly[];
}

export interface ProfessionCreateOrUpdate {
  name: string;
  active: boolean;
  business_domain_id: number;
}
