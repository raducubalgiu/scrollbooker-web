export interface UserMini {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar?: string | null;
  is_follow: boolean;
  is_business_or_employee: boolean;
  ratings_average: number;
}
