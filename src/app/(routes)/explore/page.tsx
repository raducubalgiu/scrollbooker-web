import ExploreModule from "@/components/modules/Marketplace/ExploreModule/ExploreModule";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { Typography } from "@mui/material";
import React from "react";

async function Explore() {
  const { userId } = await getUserServerSession();

  if (!userId) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h6">Please log in to continue</Typography>
      </div>
    );
  }

  return <ExploreModule />;
}

export default Explore;
