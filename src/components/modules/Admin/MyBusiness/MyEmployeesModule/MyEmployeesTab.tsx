import { Avatar, Button, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import GradeIcon from "@mui/icons-material/Grade";
import React, { useMemo, useState } from "react";
import { PaginatedData } from "@/components/core/Table/Table";
import { useSession } from "next-auth/react";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { useCustomQuery } from "@/hooks/useHttp";
import { MRT_Localization_RO } from "material-react-table/locales/ro";

type MyEmployeesTabProps = {
  isEnabled: boolean;
  initialData: PaginatedData<BusinessEmployee>;
  pageSize: number;
};

const MyEmployeesTab = ({
  isEnabled,
  initialData,
  pageSize,
}: MyEmployeesTabProps) => {
  const { data: session } = useSession();
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const { data, isLoading, isError } = useCustomQuery<
    PaginatedData<BusinessEmployee>
  >({
    key: ["business-employees", pagination.pageIndex, pagination.pageSize],
    url: `/api/employees`,
    params: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      businessOwnerId: session?.user_id ?? undefined,
    },
    options: {
      ...(pagination.pageIndex === 0 && pagination.pageSize === pageSize
        ? { initialData }
        : {}),
      enabled: isEnabled,
    },
  });

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const columns = useMemo<MRT_ColumnDef<BusinessEmployee>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Angajat",
        Cell: ({ row }) => {
          return (
            <Stack flexDirection="row" alignItems="center">
              <Avatar
                src={row.original.avatar ?? ""}
                sx={{ width: 40, height: 40, mr: 2.5 }}
              />
              {row.original.fullname}
            </Stack>
          );
        },
      },
      {
        accessorKey: "job",
        header: "Job",
      },
      {
        accessorKey: "ratings_average",
        header: "Rating",
        Cell: ({ row }) => (
          <Stack flexDirection="row" alignItems="center">
            <GradeIcon color="primary" />
            <Typography sx={{ fontWeight: "600", ml: 1 }}>
              {row.original.ratings_average.toFixed(1)} (
              {row.original.ratings_count})
            </Typography>
          </Stack>
        ),
      },
      {
        accessorKey: "products_count",
        header: "Produse",
        Cell: ({ row }) => (
          <Typography sx={{ fontWeight: 600 }}>
            {row.original.products_count}
          </Typography>
        ),
      },
      {
        accessorKey: "hire_date",
        header: "Data angajării",
      },
    ],
    []
  );

  const renderRowActions = ({ row }: { row: MRT_Row<BusinessEmployee> }) => (
    <Button
      key={row.original.id}
      variant="contained"
      color="error"
      size="small"
      disableElevation
    >
      Demite
    </Button>
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    rowCount: totalCount,

    enablePagination: true,
    manualPagination: true,

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: true,
    renderRowActions,
    positionActionsColumn: "last",
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    localization: MRT_Localization_RO,
    state: {
      pagination,
      isLoading,
      showAlertBanner: isError,
    },

    onPaginationChange: setPagination,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default MyEmployeesTab;
