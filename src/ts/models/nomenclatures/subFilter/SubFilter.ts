export interface SubFilter {
  id: number;
  name: string;
  description?: string | null;
}

export interface SubFilterCreateOrUpdate {
  name: string;
  description?: string | null;
}
