import ExploreModule from "@/components/modules/Marketplace/ExploreModule/ExploreModule";
import { authOptions } from "@/lib/auth/authOptions";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Typography variant="h6">Please log in to continue</Typography>
      </div>
    );
  }

  return <ExploreModule />;
}
