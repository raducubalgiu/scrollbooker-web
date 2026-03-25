export interface BusinessOwner {
  id: number;
  fullname: string;
  username: string;
  avatar?: string | null;
  profession: string;
  ratings_average: number;
  ratings_count: number;
}
