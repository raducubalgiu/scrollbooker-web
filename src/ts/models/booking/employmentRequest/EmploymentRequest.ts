import { ProfessionType } from "../../nomenclatures/profession/ProfessionType";
import { UserMini } from "../../user/UserMini";

export interface EmploymentRequest {
  [x: string]: unknown;
  id: number;
  status: string;
  employee: UserMini;
  employer: UserMini;
  profession: ProfessionType;
  created_at: string;
}
