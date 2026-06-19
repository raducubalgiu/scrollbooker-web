import { UserProducts } from "../product/Product";

export interface BookingFlow {
  business: BookingFlowBusiness;
  products: UserProducts;
  employees: BookingFlowUser[];
}

export interface BookingFlowUser {
  id: number;
  username: string;
  fullname: string;
  profession: string;
  avatar: string | null;
  ratings_count: number;
  ratings_average: number;
}

export interface BookingFlowBusiness {
  owner: BookingFlowUser;
  has_employees: boolean;
  formatted_address: string;
}
