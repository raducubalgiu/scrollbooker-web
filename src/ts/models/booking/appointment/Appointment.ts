import { Currency } from "../../nomenclatures/currency/Currency";
import { BusinessCoordinates } from "../business/Business";
import { AppointmentChannelEnum } from "./AppointmentChannelEnum";
import { AppointmentStatusEnum } from "./AppointmentStatusEnum";

export interface AppointmentProduct {
  id: number | null;
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
  id: number | null;
  fullname: string;
  username: string | null;
  avatar: string | null;
  profession: string | null;
  ratings_average: number | null;
  ratings_count: number | null;
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
  blocked_message: string | null;
  canceled_reason: string | null;
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
  written_review: AppointmentWrittenReview | null;
}

export interface AppointmentCancel {
  canceled_reason: string;
  canceled_by_user_id: number;
}

export const AppointmentUtils = {
  getDurationText(minutes: number): string {
    if (minutes === 0) return "0min";

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursPart = hours > 0 ? `${hours}h` : "";
    const minutesPart = remainingMinutes > 0 ? `${remainingMinutes}min` : "";

    return [hoursPart, minutesPart].filter(Boolean).join(" ");
  },

  getStatusLabel(status: AppointmentStatusEnum): string {
    switch (status) {
      case AppointmentStatusEnum.IN_PROGRESS:
        return "Confirmat";
      case AppointmentStatusEnum.CANCELED:
        return "Anulat";
      case AppointmentStatusEnum.FINISHED:
        return "Finalizat";
      default:
        return String(status);
    }
  },

  getStatusColor(
    status: AppointmentStatusEnum
  ): "success" | "error" | "warning" | "default" {
    switch (status) {
      case AppointmentStatusEnum.FINISHED:
        return "default";
      case AppointmentStatusEnum.CANCELED:
        return "error";
      case AppointmentStatusEnum.IN_PROGRESS:
        return "success";
      default:
        return "default";
    }
  },
};
