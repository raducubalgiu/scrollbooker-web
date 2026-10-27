import FeedModule from "@/components/modules/Marketplace/FeedModule/FeedModule";
import React, { Suspense } from "react";

export default async function FeedPage() {
  return (
    <Suspense fallback={null}>
      <FeedModule />
    </Suspense>
  );
}
