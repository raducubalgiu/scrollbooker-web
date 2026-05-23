export interface Profession {
  id: number;
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfessionCreateOrUpdate {
  name: string;
  active: boolean;
  business_domain_id: number;
}
