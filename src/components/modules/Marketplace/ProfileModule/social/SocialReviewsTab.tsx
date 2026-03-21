import React, { memo } from "react";

type SocialReviewsTabProps = {
  userId: number | undefined;
  rootRef?: React.RefObject<HTMLDivElement | null>;
  disableInitialIgnore?: boolean;
};

const SocialReviewsTab = ({ userId }: SocialReviewsTabProps) => {
  return (
    <div>
      <h3>Reviews</h3>
    </div>
  );
};

export default memo(SocialReviewsTab);
