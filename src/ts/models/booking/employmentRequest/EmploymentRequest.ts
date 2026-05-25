import { EmploymentRequestStatusEnum } from "@/ts/enums/EmploymentRequestStatusEnum";
import { Profession } from "../../nomenclatures/profession/ProfessionType";
import { UserMini } from "../../user/UserMini";

export interface EmploymentRequest {
  [x: string]: unknown;
  id: number;
  status: EmploymentRequestStatusEnum;
  employee: UserMini;
  employer: UserMini;
  profession: Profession;
  created_at: string;
}

export interface EmploymentRequestRespond {
  status: EmploymentRequestStatusEnum;
}
