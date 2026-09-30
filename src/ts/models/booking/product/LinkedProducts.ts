import { Product } from "./Product";

export interface LinkedProductsBusinessSummary {
  id: number;
  fullName: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratingsAverage: number;
  ratingsCount: number;
  distanceKm: number | null;
  address: string | null;
}

export interface LinkedProducts {
  business: LinkedProductsBusinessSummary;
  products: Product[];
}
