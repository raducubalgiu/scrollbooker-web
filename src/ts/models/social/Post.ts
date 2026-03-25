import { Plan } from "../nomenclatures/plan/Plan";

export interface Post {
  id: number;
  description: string | null;
  user: PostUser;
  business_owner: PostBusinessOwner;
  employee: PostEmployee | null;
  counters: PostCounters;
  user_actions: PostUserActions;
  plan: Plan;
  media_files: PostMediaFile[];
  is_video_review: boolean;
  is_own_post: boolean;
  rating: number | null;
  bookable: number;
  business_id: number | null;
  last_minute: PostLastMinute | null;
  created_at: string;
}

export interface PostMediaFile {
  id: number;
  url: string;
  type: string;
  thumbnail_url: string;
  duration: number | null;
  post_id: number;
  order_index: number;
}

export interface FixedSlot {
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface PostLastMinute {
  is_last_minute: boolean;
  last_minute_date: string | null;
  has_fixed_slots: boolean;
  fixed_slots: FixedSlot[] | null;
}

export interface PostUserActions {
  is_liked: boolean;
  is_bookmarked: boolean;
  is_reposted: boolean;
}

export interface PostCounters {
  comments_count: number;
  like_count: number;
  bookmark_count: number;
  repost_count: number;
  bookings_count: number;
  views_count: number;
}

export interface PostEmployee {
  id: number;
  fullname: string;
  avatar: string | null;
}

export interface PostBusinessOwner {
  id: number;
  fullname: string;
  avatar: string | null;
  ratings_average: number;
}

export interface PostUser {
  id: number;
  fullname: string;
  username: string;
  avatar: string | null;
  is_follow: boolean;
  profession: string;
  ratings_average: number;
  ratings_count: number;
}
