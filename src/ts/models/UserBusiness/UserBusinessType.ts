import { ServiceType } from "../nomenclatures/service/ServiceType";

export type UserBusinessType = {
  description: string;
  address: string;
  coordinates: [number, number];
  owner_id: number;
  business_type_id: number;
  id: number;
  services?: ServiceType[];
};
