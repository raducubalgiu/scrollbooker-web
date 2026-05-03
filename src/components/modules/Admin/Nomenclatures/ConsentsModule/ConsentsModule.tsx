"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useCustomQuery } from "@/hooks/useHttp";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

const ConsentsModule = () => {
  const { data: consents, isLoading } = useCustomQuery<Consent[]>({
    key: ["consents"],
    url: "/api/nomenclatures/consents",
  });

  const consentsColumns = useMemo<MRT_ColumnDef<Consent>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "text",
        header: "Text",
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              fontSize: "0.85rem",
              lineHeight: "1.4",
            }}
            title={cell.getValue<string>()}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        enableEditing: false,
      },
    ],
    []
  );

  return (
    <MainLayout title="Formulare de consimtamant" hideAction>
      <Table<Consent>
        data={consents ?? []}
        columns={consentsColumns}
        enablePagination={false}
        manualPagination={false}
        state={{ isLoading }}
        muiTableBodyCellProps={{
          sx: {
            verticalAlign: "middle", // Centrează conținutul pe verticală
          },
        }}
      />
    </MainLayout>
  );
};

export default ConsentsModule;
