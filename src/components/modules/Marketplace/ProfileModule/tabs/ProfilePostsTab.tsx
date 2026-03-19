import NotAuthenticatedOverlay from "@/components/cutomized/NotAuthenticatedOverlay/NotAuthenticatedOverlay";
import React, { memo } from "react";
import PostGrid from "../../PostGrid/PostGrid";

const ProfilePostsTab = () => {
  return (
    <NotAuthenticatedOverlay
      title="Conectează-te pentru a vedea postările"
      description="Trebuie să fii autentificat pentru a vedea și interacționa cu postările (urmări, comenta sau aprecia)."
    >
      <PostGrid count={6} />
    </NotAuthenticatedOverlay>
  );
};

export default memo(ProfilePostsTab);
