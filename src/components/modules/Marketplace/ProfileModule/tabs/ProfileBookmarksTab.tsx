import NotAuthenticatedOverlay from "@/components/cutomized/NotAuthenticatedOverlay/NotAuthenticatedOverlay";
import { Box } from "@mui/material";
import React, { memo } from "react";
import PostGrid from "../../PostGrid/PostGrid";

type ProfileBookmarksTabProps = {
  isAuthenticated: boolean;
};

const ProfileBookmarksTab = ({ isAuthenticated }: ProfileBookmarksTabProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      {!isAuthenticated ? (
        <NotAuthenticatedOverlay
          title="Conectează-te pentru a vedea postările"
          description="Trebuie să fii autentificat pentru a vedea și interacționa cu postările (urmări, comenta sau aprecia)."
        >
          <PostGrid count={6} />
        </NotAuthenticatedOverlay>
      ) : (
        <PostGrid count={6} />
      )}
    </Box>
  );
};

export default memo(ProfileBookmarksTab);
