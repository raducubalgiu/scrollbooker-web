import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UnapprovedBusinessModule from "@/components/modules/Admin/Nomenclatures/UnapprovedBusinessModule/UnapprovedBusinessModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { JSX } from "react";

async function UnapprovedBusinesses(): Promise<JSX.Element> {
  return <UnapprovedBusinessModule />;
}

export default ProtectedPage(
  UnapprovedBusinesses,
  PermissionEnum.NOMENCLATURES_VIEW
);
