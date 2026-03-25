import { CurrencyResponse } from "../../nomenclatures/currency/Currency";
import { AppointmentChannelEnum } from "./AppointmentChannelEnum";
import { AppointmentStatusEnum } from "./AppointmentStatusEnum";

interface AppointmentProducts {
  id?: number | null;
  name: string;
  price: number;
  price_with_discount: number;
  duration: number;
  currency: CurrencyResponse;
  converted_price_with_discount: number;
  exchange_rate?: number | null;
}

interface AppointmentUser {
  id?: number;
  fullname: string;
  username?: string | null;
  avatar?: string | null;
  profession?: string | null;
  ratings_average?: number | null;
  ratings_count?: number | null;
}

interface AppointmentBusiness {
  id?: number | null;
  address: string;
  formatted_address: string;
  coordinates: [number, number];
  map_url: string | null;
}

interface AppointmentWrittenReview {
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
  products: AppointmentProducts[];
  user: AppointmentUser;
  customer: AppointmentUser;
  business: AppointmentBusiness;
  total_price: number;
  total_price_with_discount: number;
  total_discount: number;
  total_duration: number;
  payment_currency: CurrencyResponse;
  has_written_review: boolean;
  has_video_review: boolean;
  written_review: AppointmentWrittenReview;
}
