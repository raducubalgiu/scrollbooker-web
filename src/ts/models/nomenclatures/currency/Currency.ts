export interface Currency {
  id: number;
  name: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CurrencyCreateOrUpdate {
  name: string;
  active: boolean;
}
