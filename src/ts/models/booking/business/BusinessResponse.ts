import { ServiceType } from "../../nomenclatures/service/ServiceType";
import { ScheduleResponseType } from "../schedule/ScheduleType";

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
  schedules: ScheduleResponseType[];
  has_employees: boolean;
};
