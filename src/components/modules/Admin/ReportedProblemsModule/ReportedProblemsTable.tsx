"use client";

import { useMemo } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { type MRT_ColumnDef } from "material-react-table";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import CustomTable from "@/components/core/Table/CustomTable";
import ProblemStatusChip from "@/components/cutomized/ProblemStatus/ProblemStatusChip";
import { PLATFORM_LABELS } from "@/components/cutomized/ProblemStatus/problemStatus";
import { AdminProblem } from "@/ts/models/nomenclature/Problem";
import { dateFormat } from "@/utils/date-utils";

type ReportedProblemsTableProps = {
  problems: AdminProblem[];
  isLoading: boolean;
  onChangeStatus: (problem: AdminProblem) => void;
};

const ReportedProblemsTable = ({
  problems,
  isLoading,
  onChangeStatus,
}: ReportedProblemsTableProps) => {
  const columns = useMemo<MRT_ColumnDef<AdminProblem>[]>(
    () => [
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        grow: false,
        Cell: ({ row }) => (
          <ProblemStatusChip status={row.original.status} audience="admin" />
        ),
      },
      {
        id: "reporter",
        header: "Raportat de",
        size: 170,
        grow: false,
        Cell: ({ row }) => {
          const reporter = row.original.reporter;
          if (!reporter) {
            return (
              <Typography variant="body2" color="text.secondary">
                Utilizator șters
              </Typography>
            );
          }
          return (
            <Stack sx={{ minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                {reporter.fullname || reporter.username}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {reporter.email}
              </Typography>
            </Stack>
          );
        },
      },
      {
        id: "device",
        header: "Platformă",
        size: 130,
        grow: false,
        Cell: ({ row }) => (
          <Stack sx={{ minWidth: 0 }}>
            <Typography variant="body2" fontWeight={600}>
              {PLATFORM_LABELS[row.original.platform] ?? row.original.platform}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {[
                row.original.device_name,
                row.original.app_version
                  ? `v${row.original.app_version}`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ") || "—"}
            </Typography>
          </Stack>
        ),
      },
      {
        accessorKey: "text",
        header: "Descriere",
        size: 180,
        grow: true,
        Cell: ({ row }) => (
          <Typography variant="body2" sx={styles.clamp}>
            {row.original.text}
          </Typography>
        ),
      },
      {
        id: "attachments",
        header: "Poze",
        size: 80,
        grow: false,
        Cell: ({ row }) => {
          const count = row.original.attachments.length;
          if (count === 0) {
            return (
              <Typography variant="body2" color="text.secondary">
                —
              </Typography>
            );
          }
          return (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PhotoLibraryOutlinedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2">{count}</Typography>
            </Stack>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Data",
        size: 110,
        grow: false,
        Cell: ({ row }) => (
          <Stack>
            <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
              {dateFormat(row.original.created_at, "D MMM YYYY")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dateFormat(row.original.created_at, "HH:mm")} · #
              {row.original.id}
            </Typography>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <CustomTable<AdminProblem>
      columns={columns}
      data={problems}
      state={{ isLoading }}
      enableTopToolbar={false}
      enablePagination={false}
      enableBottomToolbar={false}
      enableRowActions
      layoutMode="grid"
      displayColumnDefOptions={{
        "mrt-row-actions": { header: "", size: 96, grow: false },
        "mrt-row-expand": { size: 48, grow: false },
      }}
      renderRowActions={({ row }) => (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            onChangeStatus(row.original);
          }}
          sx={{ whiteSpace: "nowrap" }}
        >
          Status
        </Button>
      )}
      positionExpandColumn="first"
      muiTableBodyRowProps={({ row, isDetailPanel }) =>
        isDetailPanel
          ? {}
          : {
              onClick: () => row.toggleExpanded(),
              sx: { cursor: "pointer" },
            }
      }
      muiTableBodyCellProps={{ sx: { verticalAlign: "top" } }}
      renderDetailPanel={({ row }) => (
        <Stack spacing={2} sx={styles.detail}>
          <Stack spacing={0.5}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              Descriere completă
            </Typography>
            <Typography
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {row.original.text}
            </Typography>
          </Stack>

          {row.original.attachments.length > 0 && (
            <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
              {row.original.attachments.map((attachment) => (
                <Box
                  key={attachment.id}
                  component="a"
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={styles.largeThumb}
                >
                  <Box
                    component="img"
                    src={attachment.url}
                    alt={`Captura ${attachment.order_index + 1}`}
                    sx={{ ...styles.image, objectFit: "contain" }}
                  />
                </Box>
              ))}
            </Stack>
          )}

          {row.original.admin_message && (
            <Stack spacing={0.5}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                Mesaj trimis utilizatorului
              </Typography>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {row.original.admin_message}
              </Typography>
            </Stack>
          )}

          {row.original.user_agent && (
            <Stack spacing={0.5}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={600}
              >
                User agent
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordBreak: "break-all" }}
              >
                {row.original.user_agent}
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    />
  );
};

export default ReportedProblemsTable;

const styles = {
  clamp: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
  largeThumb: {
    width: 240,
    height: 180,
    borderRadius: 2,
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.default",
    display: "block",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  detail: {
    py: 1,
    maxWidth: 960,
  },
};
