import React, { memo } from "react";

const SocialFollowersTab = () => {
  return (
    <div>
      <h3>Followers</h3>
      <ul>
        <li>Follower 1</li>
        <li>Follower 2</li>
        <li>Follower 3</li>
      </ul>
    </div>
  );
};

export default memo(SocialFollowersTab);
