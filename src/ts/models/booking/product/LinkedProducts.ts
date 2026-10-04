import { Product } from "./Product";

export interface LinkedProductsBusinessSummary {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratings_average: number;
  ratings_count: number;
  distance_km: number | null;
  address: string | null;
}

export interface LinkedProducts {
  business: LinkedProductsBusinessSummary;
  products: Product[];
}
