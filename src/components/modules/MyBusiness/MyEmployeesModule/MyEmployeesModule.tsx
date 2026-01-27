"use client";

import React, { useMemo } from "react";
import { type MRT_ColumnDef } from "material-react-table";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { Avatar, Button, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import Table from "@/components/core/Table/Table";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

export default function MyEmployeesModule() {
  const { data, pagination, isLoading, setPagination } =
    useTableHandlers<BusinessEmployeeResponse>({ route: "employees" });

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
                sx={{ width: 35, height: 35, mr: 2.5 }}
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
            <StarIcon color="primary" />
            <Typography sx={{ fontWeight: "600", ml: 1 }}>
              {row.original.ratings_average.toFixed(1)}
            </Typography>
          </CustomStack>
        ),
      },
      {
        accessorKey: "ratings_count",
        header: "Recenzii",
        Cell: ({ row }) => (
          <Typography sx={{ fontWeight: 600 }}>
            {row.original.ratings_count}
          </Typography>
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
    <MainLayout hideAction title="Angajați">
      <Table<BusinessEmployeeResponse>
        data={data?.results}
        columns={columns}
        manualPagination={true}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
        enableFilters={false}
        renderTopToolbarCustomActions={undefined}
        renderRowActions={({ row }) => [
          <Button
            key={row.original.id}
            variant="contained"
            color="error"
            size="small"
          >
            Demite
          </Button>,
        ]}
      />
    </MainLayout>
  );
}
