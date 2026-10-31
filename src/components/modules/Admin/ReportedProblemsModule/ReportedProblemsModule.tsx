"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import ReportedProblemCard from "./ReportedProblemCard";
import ReportedProblemsTable from "./ReportedProblemsTable";
import ProblemStatusDialog from "./ProblemStatusDialog";
import {
  ADMIN_STATUS_LABELS,
  PLATFORM_LABELS,
  PROBLEM_PLATFORMS,
  PROBLEM_STATUSES,
} from "@/components/cutomized/ProblemStatus/problemStatus";
import { useInfiniteAdminProblems } from "@/controllers/nomenclature/problem.controller";
import {
  AdminProblem,
  ProblemPlatform,
  ProblemStatus,
} from "@/ts/models/nomenclature/Problem";

const ALL = "all";

const ReportedProblemsModule = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [status, setStatus] = useState<ProblemStatus | null>("new");
  const [platform, setPlatform] = useState<ProblemPlatform | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<AdminProblem | null>(
    null
  );

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteAdminProblems({ status, platform });

  const problems = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );
  const total = data?.pages[0]?.count ?? 0;

  return (
    <MainLayout
      title="Probleme semnalate"
      hideAction
      sx={{ bgcolor: "background.default", height: "100%" }}
    >
      <ProblemStatusDialog
        problem={selectedProblem}
        onClose={() => setSelectedProblem(null)}
      />

      <Stack spacing={2.5} sx={styles.content}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label="Toate"
              color={status === null ? "primary" : "default"}
              onClick={() => setStatus(null)}
            />
            {PROBLEM_STATUSES.map((option) => (
              <Chip
                key={option}
                label={ADMIN_STATUS_LABELS[option]}
                color={status === option ? "primary" : "default"}
                onClick={() => setStatus(option)}
              />
            ))}
          </Stack>

          <TextField
            select
            size="small"
            label="Platformă"
            value={platform ?? ALL}
            onChange={(event) =>
              setPlatform(
                event.target.value === ALL
                  ? null
                  : (event.target.value as ProblemPlatform)
              )
            }
            sx={{ minWidth: 180 }}
          >
            <MenuItem value={ALL}>Toate platformele</MenuItem>
            {PROBLEM_PLATFORMS.map((option) => (
              <MenuItem key={option} value={option}>
                {PLATFORM_LABELS[option]}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {!isLoading && !isError && (
          <Typography variant="body2" color="text.secondary">
            {total === 1 ? "1 raport" : `${total} rapoarte`}
          </Typography>
        )}

        {isLoading && !isDesktop && (
          <Box sx={styles.centered}>
            <CircularProgress size={28} />
          </Box>
        )}

        {isError && (
          <Typography color="error.main">
            Rapoartele nu au putut fi încărcate. Încearcă din nou.
          </Typography>
        )}

        {!isLoading && !isError && !isDesktop && problems.length === 0 && (
          <Typography color="text.secondary">
            Nu există rapoarte pentru filtrele alese.
          </Typography>
        )}

        {isDesktop && !isError && (
          <ReportedProblemsTable
            problems={problems}
            isLoading={isLoading}
            onChangeStatus={setSelectedProblem}
          />
        )}

        {!isDesktop &&
          problems.map((problem) => (
            <ReportedProblemCard
              key={problem.id}
              problem={problem}
              onChangeStatus={setSelectedProblem}
            />
          ))}

        {hasNextPage && (
          <Button
            variant="outlined"
            color="secondary"
            loading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            sx={{ alignSelf: "center" }}
          >
            Încarcă mai multe
          </Button>
        )}
      </Stack>
    </MainLayout>
  );
};

export default ReportedProblemsModule;

const styles = {
  content: {
    maxWidth: { xs: 900, lg: "none" },
    width: "100%",
    mx: "auto",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    py: 4,
  },
};
