import { PaginatedData } from "@/components/core/Table/Table";

export type ReviewType = {
  id: number;
  rating: number;
  review: string;
  product_business_owner: ReviewProductBusinessOwnerType;
  customer: ReviewCustomerType;
  service: ReviewServiceType;
  product: ReviewProductType;
  like_count: number;
  is_liked: boolean;
  is_liked_by_product_owner: boolean;
  created_at: string;
};

export type ReviewProductBusinessOwnerType = {
  id: number;
  fullname: string;
  username: string;
  avatar: string | undefined;
};

export type ReviewCustomerType = {
  id: number;
  fullname: string;
  username: string;
  avatar: string | undefined;
};

export type ReviewServiceType = {
  id: number;
  name: string;
};

export type ReviewProductType = {
  id: number;
  name: string;
};

export type ReviewsResponse = PaginatedData<ReviewType>;
