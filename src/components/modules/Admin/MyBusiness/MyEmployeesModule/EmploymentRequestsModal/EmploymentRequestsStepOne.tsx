"use client";

import UserListItemSkeletons from "@/components/cutomized/Skeletons/UserListItemSkeletons";
import { useCustomQuery } from "@/hooks/useHttp";
import { UserMini } from "@/ts/models/user/UserMini";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect } from "react";
import SelectedEmployeeItem from "./SelectedEmployeeItem";

type EmploymentRequestsStepOneProps = {
  selectedUserId: number | null;
  onSelectUserId: (id: number | null) => void;
  search: string;
  setSearch: (val: string) => void;
  debouncedSearch: string;
  setDebouncedSearch: (val: string) => void;
};

export default function EmploymentRequestsStepOne({
  selectedUserId,
  onSelectUserId,
  search,
  setSearch,
  debouncedSearch,
  setDebouncedSearch,
}: EmploymentRequestsStepOneProps) {
  const [hasTypedAfterSelection, setHasTypedAfterSelection] =
    React.useState(false);

  const { data: users, isLoading } = useCustomQuery<UserMini[]>({
    key: ["search-users", debouncedSearch],
    url: `/api/search/users?query=${search}&role_client=true`,
    options: {
      enabled: !!debouncedSearch,
      staleTime: 1000 * 60,
      retry: false,
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, setDebouncedSearch]);

  const styles = {
    input: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 3.5,
      },
      py: 2.5,
      px: 7.5,
      borderRadius: 10,
    },
  };

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);

      if (selectedUserId !== null && !hasTypedAfterSelection) {
        onSelectUserId(null);
        setHasTypedAfterSelection(true);
      }
    },
    [hasTypedAfterSelection, selectedUserId, onSelectUserId, setSearch]
  );

  const handleUserSelect = (userId: number) => {
    onSelectUserId(userId);
    setHasTypedAfterSelection(false);
  };

  return (
    <Box sx={{ my: 2.5, px: 2.5 }}>
      <Stack justifyContent="center">
        <TextField
          placeholder="Caută angajatul.."
          value={search}
          onChange={handleSearch}
          sx={styles.input}
        />
      </Stack>
      <Box
        sx={{
          height: 300,
          overflow: "auto",
          bgcolor: "secondary.main",
          borderRadius: 5,
        }}
      >
        {!isLoading &&
          users?.map((user) => (
            <SelectedEmployeeItem
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onClick={() => handleUserSelect(user.id)}
            />
          ))}
        {isLoading && <UserListItemSkeletons />}
        {isEmpty(users) && !isLoading && (
          <Typography sx={{ textAlign: "center", p: 2.5 }}>
            Nu au fost găsiți utilizatori
          </Typography>
        )}
      </Box>
    </Box>
  );
}
