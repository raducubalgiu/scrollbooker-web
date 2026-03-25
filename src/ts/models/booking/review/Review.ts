export interface Review {
  id: number;
  rating: number;
  review: string;
  product_business_owner: ReviewProductBusinessOwner;
  customer: ReviewCustomer;
  service: ReviewService;
  product: ReviewProduct;
  like_count: number;
  is_liked: boolean;
  is_liked_by_product_owner: boolean;
  created_at: string;
}

export interface ReviewProductBusinessOwner {
  id: number;
  fullname: string;
  username: string;
  avatar?: string | null;
}

export type ReviewCustomer = {
  id: number;
  fullname: string;
  username: string;
  avatar?: string | null;
};

export type ReviewService = {
  id: number;
  name: string;
};

export type ReviewProduct = {
  id: number;
  name: string;
};
