export interface SubFilter {
  id: number;
  name: string;
  description?: string | null;
  filter_id?: number;
  active?: boolean;
}

export interface SubFilterCreate {
  name: string;
  filter_id: number;
  description?: string | null;
}

export interface SubFilterUpdate {
  name?: string;
  active?: boolean;
}
