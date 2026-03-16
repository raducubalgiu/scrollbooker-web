import CustomStack from "@/components/core/CustomStack/CustomStack";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { Avatar, Button, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import GradeIcon from "@mui/icons-material/Grade";
import React, { useMemo } from "react";
import { BusinessEmployeeResponse } from "@/ts/models/booking/business/BusinessEmployeeResponse";
import Table from "@/components/core/Table/Table";

const EmployeesTab = ({ isEnabled }: { isEnabled: boolean }) => {
  const { data, pagination, isLoading, setPagination } =
    useTableHandlers<BusinessEmployeeResponse>({
      route: "employees",
      enabled: isEnabled,
    });

  const columns = useMemo<MRT_ColumnDef<BusinessEmployeeResponse>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Angajat",
        Cell: ({ row }) => {
          return (
            <CustomStack justifyContent="flex-start">
              <Avatar
                src={row.original.avatar}
                sx={{ width: 40, height: 40, mr: 2.5 }}
              />
              {row.original.fullname}
            </CustomStack>
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
          <CustomStack justifyContent="flex-start">
            <GradeIcon color="primary" />
            <Typography sx={{ fontWeight: "600", ml: 1 }}>
              {row.original.ratings_average.toFixed(1)} (
              {row.original.ratings_count})
            </Typography>
          </CustomStack>
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

  return (
    <Table<BusinessEmployeeResponse>
      data={data?.results}
      columns={columns}
      manualPagination={true}
      enableFilters={false}
      enableSorting={false}
      enableColumnActions={false}
      enablePagination={false}
      enableHiding={false}
      onPaginationChange={setPagination}
      state={{ pagination, isLoading }}
      renderTopToolbarCustomActions={undefined}
      renderRowActions={({ row }) => [
        <Button
          key={row.original.id}
          variant="contained"
          color="error"
          size="small"
          disableElevation
        >
          Demite
        </Button>,
      ]}
    />
  );
};

export default EmployeesTab;
