import React from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type LegalTableColumn<TKey extends string> = {
  key: TKey;
  label: string;
};

type LegalTableProps<TKey extends string> = {
  columns: LegalTableColumn<TKey>[];
  rows: Record<TKey, string>[];
  codeColumn?: TKey;
};

const LegalTable = <TKey extends string>({
  columns,
  rows,
  codeColumn,
}: LegalTableProps<TKey>) => {
  const renderValue = (key: TKey, value: string) =>
    key === codeColumn ? (
      <Box component="code" sx={styles.code}>
        {value}
      </Box>
    ) : (
      value
    );

  return (
    <>
      <Box sx={styles.tableWrapper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} sx={styles.headCell}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={styles.row}>
                {columns.map((column) => (
                  <TableCell key={column.key} sx={styles.cell}>
                    {renderValue(column.key, row[column.key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Stack spacing={1.5} sx={styles.cards}>
        {rows.map((row, index) => (
          <Box key={index} sx={styles.card}>
            {columns.map((column) => (
              <Box key={column.key} sx={styles.cardRow}>
                <Typography variant="caption" sx={styles.cardLabel}>
                  {column.label}
                </Typography>
                <Typography variant="body2" component="div">
                  {renderValue(column.key, row[column.key])}
                </Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default LegalTable;

const styles = {
  tableWrapper: {
    display: { xs: "none", md: "block" },
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 3,
    overflow: "hidden",
    my: 2,
  },
  headCell: {
    fontWeight: 700,
    bgcolor: "background.paper",
    borderColor: "divider",
    py: 1.5,
  },
  row: {
    "&:last-child td": { borderBottom: 0 },
  },
  cell: {
    verticalAlign: "top",
    color: "text.secondary",
    borderColor: "divider",
    py: 1.5,
  },
  cards: {
    display: { xs: "flex", md: "none" },
    my: 2,
  },
  card: {
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 3,
    p: 2,
  },
  cardRow: {
    "&:not(:last-child)": { mb: 1.25 },
  },
  cardLabel: {
    display: "block",
    color: "text.secondary",
    fontWeight: 600,
    mb: 0.25,
  },
  code: {
    fontFamily: "monospace",
    fontSize: "0.85em",
    color: "text.primary",
    wordBreak: "break-word",
  },
};
