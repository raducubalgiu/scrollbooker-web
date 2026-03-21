import { ServiceType } from "../../nomenclatures/service/ServiceType";
import { ScheduleType } from "../schedule/ScheduleType";

export type BusinessCoordinatesType = {
  lat: number;
  lng: number;
};

export type BusinessResponse = {
  id: number;
  business_type_id: number;
  owner_id: number;
  description: string;
  timezone: string;
  address: string;
  formatted_address: string;
  coordinates: BusinessCoordinatesType;
  city: string;
  country_code: string;
  map_url: string;
  services: ServiceType[];
  schedules: ScheduleType[];
  has_employees: boolean;
};
