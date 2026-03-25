export interface UserProfile {
  id: number;
  username: string;
  fullname: string;
  avatar: string | null;
  gender: string;
  bio: string | null;
  public_email: string | null;
  website: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;

  business_id: number | null;
  business_type_id: number | null;
  counters: UserCounter;
  profession: string;
  opening_hours: OpeningHours;
  is_follow: boolean;
  business_owner: BusinessOwner | null;
  is_own_profile: boolean;
  is_business_or_employee: boolean;
}

export interface UserCounter {
  user_id: number;
  followings_count: number;
  followers_count: number;
  products_count: number;
  posts_count: number;
  ratings_count: number;
  ratings_average: number;
}

export interface OpeningHours {
  open_now: boolean;
  closing_time: string | null;
  next_open_day: string | null;
  next_open_time: string | null;
}

export interface BusinessOwner {
  id: number;
  fullname: string;
  username: string;
  avatar: string | null;
  is_follow: boolean;
}
