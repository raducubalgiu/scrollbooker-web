import { ServiceType } from "../../nomenclatures/service/Service";
import { Schedule } from "../schedule/Schedule";

export interface BusinessCoordinates {
  lat: number;
  lng: number;
}

export interface BusinessResponse {
  id: number;
  business_type_id: number;
  owner_id: number;
  description: string;
  timezone: string;
  address: string;
  formatted_address: string;
  coordinates: BusinessCoordinates;
  city: string;
  country_code: string;
  map_url: string;
  services: ServiceType[];
  schedules: Schedule[];
  has_employees: boolean;
}
