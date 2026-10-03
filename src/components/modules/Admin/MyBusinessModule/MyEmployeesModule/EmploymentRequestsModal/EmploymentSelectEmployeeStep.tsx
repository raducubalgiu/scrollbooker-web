"use client";

import UserListItemSkeletons from "@/components/cutomized/Skeletons/UserListItemSkeletons";
import { useSearchUsers } from "@/controllers/search/search.controller";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import SelectedEmployeeItem from "./SelectedEmployeeItem";

type EmploymentSelectEmployeeStepProps = {
  selectedUserId: number | null;
  onSelectUserId: (id: number | null) => void;
};

export default function EmploymentSelectEmployeeStep({
  selectedUserId,
  onSelectUserId,
}: EmploymentSelectEmployeeStepProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [hasTypedAfterSelection, setHasTypedAfterSelection] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useSearchUsers({ query: debouncedSearch, roleClient: true });

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);

      if (selectedUserId !== null && !hasTypedAfterSelection) {
        onSelectUserId(null);
        setHasTypedAfterSelection(true);
      }
    },
    [hasTypedAfterSelection, selectedUserId, onSelectUserId]
  );

  const handleUserSelect = (userId: number) => {
    onSelectUserId(userId);
    setHasTypedAfterSelection(false);
  };

  const hasQuery = debouncedSearch.trim().length > 0;

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

      <Box sx={styles.resultsBox}>
        {!hasQuery && (
          <Typography sx={styles.message}>
            Caută un angajat pentru a continua.
          </Typography>
        )}

        {hasQuery && isLoading && <UserListItemSkeletons />}

        {hasQuery && !isLoading && isError && (
          <Stack spacing={1.5} alignItems="center" sx={{ py: 4 }}>
            <Typography sx={styles.message}>
              A apărut o eroare la căutare.
            </Typography>
            <Button variant="outlined" size="small" onClick={() => refetch()}>
              Încearcă din nou
            </Button>
          </Stack>
        )}

        {hasQuery && !isLoading && !isError && isEmpty(users) && (
          <Typography sx={styles.message}>
            Nu au fost găsiți utilizatori.
          </Typography>
        )}

        {hasQuery &&
          !isLoading &&
          !isError &&
          users?.map((user) => (
            <SelectedEmployeeItem
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onClick={() => handleUserSelect(user.id)}
            />
          ))}
      </Box>
    </Box>
  );
}

const styles = {
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3.5,
    },
    py: 2.5,
    px: 7.5,
    borderRadius: 10,
  },
  resultsBox: {
    minHeight: 220,
    maxHeight: { xs: 280, sm: 320 },
    overflow: "auto",
    bgcolor: "secondary.main",
    borderRadius: 5,
    mt: 2,
  },
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
