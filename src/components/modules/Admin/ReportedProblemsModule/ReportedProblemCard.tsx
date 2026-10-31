"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import ProblemStatusChip from "@/components/cutomized/ProblemStatus/ProblemStatusChip";
import { PLATFORM_LABELS } from "@/components/cutomized/ProblemStatus/problemStatus";
import { AdminProblem } from "@/ts/models/nomenclature/Problem";
import { dateFormat } from "@/utils/date-utils";

type ReportedProblemCardProps = {
  problem: AdminProblem;
  onChangeStatus: (problem: AdminProblem) => void;
};

const ReportedProblemCard = ({
  problem,
  onChangeStatus,
}: ReportedProblemCardProps) => {
  const device = [
    PLATFORM_LABELS[problem.platform] ?? problem.platform,
    problem.device_name,
    problem.app_version ? `v${problem.app_version}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const reporter = problem.reporter;

  return (
    <Stack spacing={1.5} sx={styles.card}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
      >
        <ProblemStatusChip status={problem.status} audience="admin" />
        <Typography variant="body2" color="text.secondary">
          #{problem.id} · {dateFormat(problem.created_at, "D MMM YYYY, HH:mm")}
        </Typography>
      </Stack>

      <Stack spacing={0.25}>
        <Typography variant="body2" fontWeight={600}>
          {reporter
            ? reporter.fullname || reporter.username
            : "Utilizator șters"}
        </Typography>
        {reporter && (
          <Typography variant="body2" color="text.secondary">
            @{reporter.username} · {reporter.email}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          {device}
        </Typography>
      </Stack>

      <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {problem.text}
      </Typography>

      {problem.attachments.length > 0 && (
        <Stack direction="row" spacing={1.5}>
          {problem.attachments.map((attachment) => (
            <Box
              key={attachment.id}
              component="a"
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Deschide captura ${attachment.order_index + 1}`}
              sx={styles.thumbnail}
            >
              <Box
                component="img"
                src={attachment.url}
                alt={`Captura ${attachment.order_index + 1}`}
                sx={styles.image}
              />
            </Box>
          ))}
        </Stack>
      )}

      {problem.admin_message && (
        <Box sx={styles.adminMessage}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Mesaj trimis utilizatorului
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {problem.admin_message}
          </Typography>
        </Box>
      )}

      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={() => onChangeStatus(problem)}
        sx={{ alignSelf: "flex-start" }}
      >
        Actualizează statusul
      </Button>
    </Stack>
  );
};

export default ReportedProblemCard;

const styles = {
  card: {
    p: 2,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: 2,
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    display: "block",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  adminMessage: {
    p: 1.5,
    borderRadius: 2,
    bgcolor: "background.default",
  },
};
