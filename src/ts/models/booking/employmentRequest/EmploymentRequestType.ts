import { ProfessionType } from "../../Profession/ProfessionType";
import { UserMiniType } from "../../User/UserMiniType";

export type EmploymentRequestType = {
  id: number;
  status: string;
  employee: UserMiniType;
  employer: UserMiniType;
  profession: ProfessionType;
  created_at: string;
};
