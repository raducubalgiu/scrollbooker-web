import CustomStack from "@/components/core/CustomStack/CustomStack";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { Avatar, Button, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import GradeIcon from "@mui/icons-material/Grade";
import React, { useMemo } from "react";
import Table from "@/components/core/Table/Table";
import { useSession } from "next-auth/react";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

const EmployeesTab = ({ isEnabled }: { isEnabled: boolean }) => {
  const { data: session } = useSession();

  const { data, pagination, isLoading, setPagination } =
    useTableHandlers<BusinessEmployee>({
      route: "/employees",
      extraParams: { businessOwnerId: session?.user_id ?? undefined },
      enabled: isEnabled,
    });

  const columns = useMemo<MRT_ColumnDef<BusinessEmployee>[]>(
    () => [
      {
        accessorKey: "fullname",
        header: "Angajat",
        Cell: ({ row }) => {
          return (
            <CustomStack justifyContent="flex-start">
              <Avatar
                src={row.original.avatar ?? ""}
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
    <Table<BusinessEmployee>
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
