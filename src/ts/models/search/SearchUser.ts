export interface SearchUser {
  id: number;
  fullname: string;
  username: string;
  profession: string;
  avatar: string | null;
  ratings_average: number;
  is_business_or_employee: boolean;
}
