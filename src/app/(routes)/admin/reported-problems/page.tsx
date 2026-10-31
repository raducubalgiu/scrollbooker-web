import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ReportedProblemsModule from "@/components/modules/Admin/ReportedProblemsModule/ReportedProblemsModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { JSX } from "react";

async function ReportedProblems(): Promise<JSX.Element> {
  return <ReportedProblemsModule />;
}

export default ProtectedPage(ReportedProblems, PermissionEnum.PROBLEMS_VIEW);
