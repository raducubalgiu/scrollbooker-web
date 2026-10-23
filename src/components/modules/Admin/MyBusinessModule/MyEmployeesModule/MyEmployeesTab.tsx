import { Avatar, Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
  useMaterialReactTable,
} from "material-react-table";
import GradeIcon from "@mui/icons-material/Grade";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import React, { useMemo } from "react";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Session } from "next-auth";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import EmployeeMobileCard from "./EmployeeMobileCard";

type MyEmployeesTabProps = {
  session: Session;
  isEnabled: boolean;
};

const MyEmployeesTab = ({ session, isEnabled }: MyEmployeesTabProps) => {
  const hasBusinessOwnerId = !!session.business_owner_id;

  const { data, isLoading, isError } = useGetAllEmployeesByOwner({
    businessOwnerId: session.business_owner_id ?? 0,
    isEnabled: isEnabled && hasBusinessOwnerId,
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
            <GradeIcon color="rating" />
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

    enableSorting: false,
    enableFilters: false,
    enableDensityToggle: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableTopToolbar: false,

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableRowActions: true,
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

  if (!hasBusinessOwnerId) {
    return (
      <NotFound
        compact
        icon={<PeopleAltOutlinedIcon />}
        title="Angajați"
        description="Nu există un business asociat acestui cont."
      />
    );
  }

  return (
    <>
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <MaterialReactTable table={table} />
      </Box>

      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={128}
              sx={{ mb: 1.5, borderRadius: 2.5 }}
            />
          ))}

        {!isLoading && tableData.length === 0 && (
          <NotFound
            compact
            icon={<PeopleAltOutlinedIcon />}
            title="Angajați"
            description="Nu ai niciun angajat momentan"
          />
        )}

        {!isLoading &&
          tableData.map((employee) => (
            <EmployeeMobileCard key={employee.id} employee={employee} />
          ))}
      </Box>
    </>
  );
};

export default MyEmployeesTab;
