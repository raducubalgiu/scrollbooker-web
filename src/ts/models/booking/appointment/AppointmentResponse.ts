import { CurrencyResponse } from "../../nomenclatures/currency/CurrencyResponse";
import { AppointmentChannelEnum } from "./AppointmentChannelEnum";
import { AppointmentStatusEnum } from "./AppointmentStatusEnum";

type AppointmentProductsResponse = {
  id?: number;
  name: string;
  price: number;
  price_with_discount: number;
  duration: number;
  currency: CurrencyResponse;
  converted_price_with_discount: number;
  exchange_rate?: number;
};

type AppointmentUser = {
  id?: number;
  fullname: string;
  username?: string;
  avatar?: string;
  profession?: string;
  ratings_average?: number;
  ratings_count?: number;
};

type AppointmentBusiness = {
  id?: number;
  address: string;
  formatted_address: string;
  coordinates: [number, number];
  map_url: string;
};

type AppointmentWrittenReview = {
  id: number;
  review: string;
  rating: number;
};

export type AppointmentResponse = {
  id: number;
  start_date: string;
  end_date: string;
  channel: AppointmentChannelEnum;
  status: AppointmentStatusEnum;
  message?: string;
  is_customer: boolean;
  products: AppointmentProductsResponse[];
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
};
