import React from "react";
import { SearchUser } from "@/ts/models/search/SearchUser";
import { SearchUserItem } from "./SearchUserItem";
import { SearchUserItemSkeleton } from "./SearchUserItemSkeleton";

const SKELETON_COUNT = 6;

type SearchUsersResultsListProps = {
  users: SearchUser[];
  loading: boolean;
  onNavigate?: () => void;
};

const SearchUsersResultsList = ({
  users,
  loading,
  onNavigate = () => {},
}: SearchUsersResultsListProps) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SearchUserItemSkeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {users.map((user) => (
        <SearchUserItem key={user.id} user={user} onNavigate={onNavigate} />
      ))}
    </>
  );
};

export default SearchUsersResultsList;
