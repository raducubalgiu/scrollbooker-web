export interface Post {
  id: number;
  description: string | null;
  user: PostUser;
  business_owner: PostBusinessOwner;
  business_location: PostBusinessLocation | null;
  employee: PostEmployee | null;
  counters: PostCounters;
  user_actions: PostUserActions;
  media_files: PostMediaFile[];
  hashtags: PostHashtag[] | null;
  is_video_review: boolean;
  is_own_post: boolean;
  business_id: number | null;
  review: PostReview | null;
  service_domain: PostServiceDomain | null;
  created_at: string;
}

export interface PostBusinessLocationCoordinates {
  lat: number;
  lng: number;
}

export interface PostBusinessLocation {
  address: string;
  formatted_address: string;
  coordinates: PostBusinessLocationCoordinates;
  map_url: string | null;
  place_id: string;
}

export interface PostMediaFile {
  id: number;
  url: string;
  type: string;
  thumbnail_url: string;
  custom_cover_url: string | null;
  duration: number | null;
  post_id: number;
  order_index: number;
  status: string;
  ready_to_stream: boolean;
}

export interface PostHashtag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
}

export interface PostReview {
  id: number;
  review: string | null;
  rating: number;
  created_at: string;
}

export interface PostServiceDomain {
  id: number;
  name: string;
}

export interface PostUserActions {
  is_liked: boolean;
  is_bookmarked: boolean;
  is_reposted: boolean;
}

export interface PostCounters {
  comment_count: number;
  like_count: number;
  bookmark_count: number;
  repost_count: number;
  share_count: number;
  bookings_count: number;
  views_count: number;
}

export interface PostEmployee {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratings_average: number;
  ratings_count: number;
}

export interface PostBusinessOwner {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratings_average: number;
  ratings_count: number;
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
