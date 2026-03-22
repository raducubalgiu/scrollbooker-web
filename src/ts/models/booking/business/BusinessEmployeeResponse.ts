import { PaginatedData } from "@/components/core/Table/Table";

export type BusinessEmployeeType = {
  id: number;
  username: string;
  fullname: string;
  avatar: string;
  job: string;
  hire_date: string;
  followers_count: number;
  ratings_count: number;
  ratings_average: number;
  products_count: number;
};

export type BusinessEmployeeResponse = PaginatedData<BusinessEmployeeType>;
