"use client";

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import {
  useApproveBusiness,
  useGetUnapprovedBusinesses,
} from "@/controllers/booking/business.controller";
import UnapprovedBusinessCard from "./UnapprovedBusinessCard";

export default function UnapprovedBusinessModule() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUnapprovedBusinesses();

  const {
    mutate: approveBusiness,
    isPending,
    variables: approvingUserId,
  } = useApproveBusiness();

  const businesses = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <MainLayout title="Afaceri în aprobare" hideAction>
      {isLoading && (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      )}

      {!isLoading && isError && (
        <Stack alignItems="center" spacing={2} sx={{ py: 8 }}>
          <Typography color="text.secondary">
            Nu am putut încărca afacerile în aprobare.
          </Typography>
          <Button variant="outlined" onClick={() => refetch()}>
            Reîncearcă
          </Button>
        </Stack>
      )}

      {!isLoading && !isError && businesses.length === 0 && (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <Typography color="text.secondary">
            Nu există afaceri care așteaptă aprobarea.
          </Typography>
        </Stack>
      )}

      {!isLoading && !isError && businesses.length > 0 && (
        // Folosim un Stack principal doar pentru a ține grid-ul și butonul de "Încarcă mai multe" separate vertical
        <Stack spacing={4}>
          {/* Containerul pentru carduri convertit în CSS Grid responsiv */}
          <Box
            sx={{
              display: "grid",
              // 1 coloană pe mobil (xs), 2 coloane pe desktop (md)
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2, // Spațiul dintre carduri (echivalentul la spacing={2} din Stack)
              width: "100%",
            }}
          >
            {businesses.map((item) => (
              <UnapprovedBusinessCard
                key={item.id}
                item={item}
                isApproving={isPending && approvingUserId === item.id}
                onApprove={() => approveBusiness(item.id)}
              />
            ))}
          </Box>

          {hasNextPage && (
            <Stack alignItems="center" sx={{ pt: 1 }}>
              <Button
                variant="outlined"
                loading={isFetchingNextPage}
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                Încarcă mai multe
              </Button>
            </Stack>
          )}
        </Stack>
      )}
    </MainLayout>
  );
}
