export interface PostCreate {
  description: string | null;
  provider: string;
  provider_uid: string;
  order_index: number;
  video_review_message: string | null;
  is_video_review: boolean;
  rating: number | null;
  business_or_employee_id: number | null;
}
