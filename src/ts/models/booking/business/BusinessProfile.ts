import { Plan } from "../../nomenclatures/plan/Plan";
import { PostMediaFile } from "../../social/Post";
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
  posts: BusinessProfilePost[];
  nearby_businesses: NearbyBusiness[];
}

export interface NearbyBusinessOwner {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  counters: BusinessProfileCounters;
}

export interface NearbyBusiness {
  id: number;
  owner: NearbyBusinessOwner;
  media_files: PostMediaFile[];
  location: BusinessLocation;
  distance_km: number | null;
}

export interface BusinessProfilePost {
  id: number;
  business_id: number;
  views_count: number;
  media_files: PostMediaFile[];
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
