import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UnfinishedRegistrationsModule from "@/components/modules/Admin/MyBusinessModule/UnfinishedRegistrationsModule/UnfinishedRegistrationsModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { JSX } from "react";

async function UnfinishedRegistrations(): Promise<JSX.Element> {
  return <UnfinishedRegistrationsModule />;
}

export default ProtectedPage(
  UnfinishedRegistrations,
  PermissionEnum.UNFINISHED_REGISTRATIONS_VIEW
);
