import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UploadVideoModule from "@/components/modules/Marketplace/UploadVideoModule/UploadVideoModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import React from "react";

async function UploadVideoPage() {
  return <UploadVideoModule />;
}

export default ProtectedPage(UploadVideoPage, PermissionEnum.CREATE_POST);
