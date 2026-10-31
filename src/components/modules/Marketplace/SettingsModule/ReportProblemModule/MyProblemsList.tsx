"use client";

import { useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ProblemStatusChip from "@/components/cutomized/ProblemStatus/ProblemStatusChip";
import { useInfiniteMyProblems } from "@/controllers/nomenclature/problem.controller";
import { dateFormat } from "@/utils/date-utils";

const MyProblemsList = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteMyProblems();

  const problems = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  if (isLoading || problems.length === 0) return null;

  return (
    <Stack spacing={1.5}>
      <Typography variant="h6" fontWeight={600}>
        Rapoartele mele
      </Typography>

      {problems.map((problem) => (
        <Stack key={problem.id} spacing={1} sx={styles.card}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ProblemStatusChip status={problem.status} audience="user" />
            <Typography variant="body2" color="text.secondary">
              {dateFormat(problem.created_at, "D MMM YYYY")}
            </Typography>
          </Stack>

          <Typography variant="body2" sx={styles.text}>
            {problem.text}
          </Typography>

          {problem.admin_message && (
            <Box sx={styles.reply}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                Răspunsul echipei ScrollBooker
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {problem.admin_message}
              </Typography>
            </Box>
          )}
        </Stack>
      ))}

      {hasNextPage && (
        <Button
          variant="outlined"
          color="secondary"
          loading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          sx={{ alignSelf: "flex-start" }}
        >
          Vezi mai multe
        </Button>
      )}
    </Stack>
  );
};

export default MyProblemsList;

const styles = {
  card: {
    p: 2,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  },
  text: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    wordBreak: "break-word",
  },
  reply: {
    p: 1.5,
    borderRadius: 2,
    bgcolor: "background.default",
  },
};
