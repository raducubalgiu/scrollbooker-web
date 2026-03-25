import { ProfessionType } from "../../nomenclatures/profession/ProfessionType";
import { UserMiniType } from "../../user/UserMini";

export type EmploymentRequestType = {
  id: number;
  status: string;
  employee: UserMiniType;
  employer: UserMiniType;
  profession: ProfessionType;
  created_at: string;
};
