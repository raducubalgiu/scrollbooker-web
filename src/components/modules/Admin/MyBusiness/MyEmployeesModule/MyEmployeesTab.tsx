import { Avatar, Button, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import GradeIcon from "@mui/icons-material/Grade";
import React, { useMemo } from "react";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Session } from "next-auth";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";

type MyEmployeesTabProps = {
  session: Session;
  isEnabled: boolean;
};

const MyEmployeesTab = ({ session, isEnabled }: MyEmployeesTabProps) => {
  if (!session.business_owner_id) return;

  const { data, isLoading, isError } = useGetAllEmployeesByOwner({
    businessOwnerId: session.business_owner_id,
    isEnabled,
  });

  const tableData = useMemo(() => data || [], [data]);

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
    enablePagination: true,
    manualPagination: false,

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: true,
    renderRowActions,
    positionActionsColumn: "last",
    localization: MRT_Localization_RO,
    state: {
      isLoading,
      showAlertBanner: isError,
    },

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
