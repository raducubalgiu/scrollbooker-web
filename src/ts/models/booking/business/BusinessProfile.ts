import { Plan } from "../../nomenclatures/plan/Plan";
import { Post } from "../../social/Post";
import { OpeningHours } from "../../user/UserProfile";
import { Product } from "../product/Product";
import { Schedule } from "../schedule/Schedule";
import { BusinessCoordinates } from "./Business";
import { BusinessMediaFile } from "./BusinessMediaFile";

export interface BusinessProfile {
  id: number;
  owner: BusinessOwnerProfile;
  opening_hours: OpeningHours;
  media_files: BusinessMediaFile[];
  business_plan: Plan;
  location: BusinessLocation;
  distance_km: number | null;
  description: string | null;
  products: Product[];
  employees: BusinessProfileEmployee[];
  schedules: Schedule[];
  reviews: BusinessProfileReviews;
  posts: Post[];
}

export interface BusinessProfileReviews {
  total: number;
  data: BusinessProfileReview[];
}

export interface BusinessProfileReview {
  id: number;
  review: string;
  rating: number;
  reviewer: BusineeProfileReviewer;
  created_at: string;
}

export interface BusineeProfileReviewer {
  id: number;
  fullname: string;
  username: string;
  avatar: string | null;
}

export interface BusinessProfileEmployee {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratings_average: number;
}

export interface BusinessLocation {
  address: string;
  formatted_address: string;
  coordinates: BusinessCoordinates;
  map_url: string | null;
}

export interface BusinessOwnerProfile {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  counters: BusinessProfileCounters;
  is_follow: boolean;
}

export interface BusinessProfileCounters {
  followers_count: number;
  followings_count: number;
  ratings_average: number;
  ratings_count: number;
}
