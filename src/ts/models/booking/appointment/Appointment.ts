import { Currency } from "../../nomenclatures/currency/Currency";
import { BusinessCoordinates } from "../business/Business";
import { AppointmentChannelEnum } from "./AppointmentChannelEnum";
import { AppointmentStatusEnum } from "./AppointmentStatusEnum";

export interface AppointmentProduct {
  id?: number | null;
  name: string;
  price: number;
  price_with_discount: number;
  discount: number;
  duration: number;
  currency: Currency;
  converted_price_with_discount: number;
  exchange_rate?: number | null;
}

export interface AppointmentUser {
  id?: number;
  fullname: string;
  username?: string | null;
  avatar?: string | null;
  profession?: string | null;
  ratings_average?: number | null;
  ratings_count?: number | null;
}

export interface AppointmentBusiness {
  id?: number | null;
  address: string;
  formatted_address: string;
  coordinates: BusinessCoordinates;
  map_url: string | null;
}

export interface AppointmentWrittenReview {
  id: number;
  review: string;
  rating: number;
}

export interface Appointment {
  [key: string]: unknown;
  id: number;
  start_date: string;
  end_date: string;
  channel: AppointmentChannelEnum;
  status: AppointmentStatusEnum;
  message?: string | null;
  is_customer: boolean;
  products: AppointmentProduct[];
  user: AppointmentUser;
  customer: AppointmentUser;
  business: AppointmentBusiness;
  total_price: number;
  total_price_with_discount: number;
  total_discount: number;
  total_duration: number;
  payment_currency: Currency;
  has_written_review: boolean;
  has_video_review: boolean;
  written_review: AppointmentWrittenReview;
}
