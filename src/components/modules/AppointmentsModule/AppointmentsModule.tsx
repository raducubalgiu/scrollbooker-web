"use client";

import Table, { TableRowAndTable } from "@/components/core/Table/Table";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";
import React, { useCallback, useMemo, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Label } from "@/components/cutomized/Label/Label";
import { getAppointmentStatusLabel } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import dayjs, { Dayjs } from "dayjs";
import { MRT_ActionMenuItem, MRT_ColumnDef } from "material-react-table";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import {
  AppointmentChannelEnum,
  getAppointmentChannelLabel,
} from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { getChannelColor, getStatusColor } from "./appointment-utils";
import StatusButton from "./StatusButton";
import ChannelButton from "./ChannelButton";
import PickerButton from "./PickerButton";
import EmployeeButton from "./EmployeeButton";
import { Session } from "next-auth/core/types";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import AsCustomerButton from "./AsCustomerButton";
import AppointmentCancelModal from "./AppointmentCancelModal";

const AppointmentsModule = ({ session }: { session: Session | null }) => {
  const [asCustomer, setAsCustomer] = useState<boolean | null>(null);
  const [status, setStatus] = useState<AppointmentStatusEnum | null>(null);
  const [channel, setChannel] = useState<AppointmentChannelEnum | null>(null);
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [employee, setEmployee] = React.useState<number | null>(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const theme = useTheme();

  const { data, isLoading, pagination, setPagination } =
    useTableHandlers<AppointmentResponse>({
      route: "/appointments",
      extraParams: {
        business_id: session?.business_id ?? undefined,
        employee_id: session?.is_employee
          ? session.user_id
          : (employee ?? undefined),
        asCustomer: asCustomer ?? undefined,
        status: status ?? undefined,
        channel: channel ?? undefined,
        start_date: date?.startOf("day").format("YYYY-MM-DD") ?? undefined,
        end_date: date?.endOf("day").format("YYYY-MM-DD") ?? undefined,
      },
    });

  const columns = useMemo<MRT_ColumnDef<AppointmentResponse>[]>(() => {
    const cols: MRT_ColumnDef<AppointmentResponse>[] = [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        Cell: ({ row }) => <Typography>#{row.original.id}</Typography>,
      },
      {
        accessorKey: "customer",
        header: "Client",
        size: 250,
        Cell: ({ row }) => (
          <Stack flexDirection="row" alignItems={"center"}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={row.original.customer.avatar}
            />
            <Box sx={{ ml: 1.5 }}>
              <Typography>{row.original.customer.fullname}</Typography>
            </Box>
          </Stack>
        ),
      },
      {
        accessorKey: "start_date",
        header: "Data si ora",
        size: 150,
        Cell: ({ row }) => (
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Typography sx={{ mr: 1 }}>
              {dayjs(row.original.start_date).format("DD.MM.YYYY")}
            </Typography>
            <Label
              title={`${dayjs(row.original.start_date).format("HH:mm")} - ${dayjs(row.original.end_date).format("HH:mm")}`}
              color={theme.palette.text.secondary}
            />
          </Stack>
        ),
      },
      {
        accessorKey: "products",
        header: "Produse rezervate",
        size: 250,
        Cell: ({ row }) => (
          <Typography>
            {row.original.products && row.original.products.length > 0
              ? row.original.products.map((p) => p.name).join(", ")
              : "N/A"}
          </Typography>
        ),
      },
      {
        accessorKey: "price_with_discount",
        header: "Pret final",
        size: 250,
        Cell: ({ row }) => {
          const { total_discount, total_price, total_price_with_discount } =
            row.original;
          const hasDiscount = total_discount > 0;

          const formatNumber = (v: number | undefined | null) =>
            v == null
              ? ""
              : Number(v).toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                });

          return (
            <Typography>
              {hasDiscount ? (
                <>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: theme.palette.text.secondary,
                      marginRight: 8,
                    }}
                  >
                    {formatNumber(total_price)} RON
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {formatNumber(total_price_with_discount)} RON
                  </span>
                  <span
                    style={{ color: theme.palette.error.main, marginLeft: 8 }}
                  >
                    ({formatNumber(total_discount)} %)
                  </span>
                </>
              ) : (
                <span style={{ fontWeight: 600 }}>
                  {formatNumber(total_price_with_discount)} RON
                </span>
              )}
            </Typography>
          );
        },
      },
      {
        accessorKey: "channel",
        header: "Canal",
        size: 50,
        Cell: ({ row }) => (
          <Label
            title={getAppointmentChannelLabel(row.original.channel)}
            color={getChannelColor(row.original.channel, theme)}
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 50,
        Cell: ({ row }) => (
          <Label
            title={getAppointmentStatusLabel(row.original.status)}
            color={getStatusColor(row.original.status, theme)}
          />
        ),
      },
    ];

    if (!session?.is_employee) {
      cols.splice(2, 0, {
        accessorKey: "user",
        header: "Angajat",
        size: 250,
        Cell: ({ row }) => (
          <Stack flexDirection="row" alignItems={"center"}>
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={row.original.user?.avatar}
            />
            <Box sx={{ ml: 1.5 }}>
              <Typography>{row.original.user?.fullname}</Typography>
            </Box>
          </Stack>
        ),
      });
    }

    return cols;
  }, [theme, session]);

  const getToolbarCustomActions = React.useCallback(() => {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        {!session?.is_employee && (
          <EmployeeButton
            employee={employee}
            onSetEmployee={(id) => setEmployee(id)}
            theme={theme}
          />
        )}
        <Button
          variant={date == null ? "contained" : "outlined"}
          color={date == null ? "primary" : "secondary"}
          size="large"
          disableElevation
          onClick={() => setDate(null)}
        >
          Oricând
        </Button>
        <PickerButton date={date} onSetDate={setDate} />
        <StatusButton
          status={status}
          onSetStatus={(s) => setStatus(s)}
          theme={theme}
        />
        <ChannelButton
          channel={channel}
          onSetChannel={(s) => setChannel(s)}
          theme={theme}
        />
        {session?.is_employee && (
          <AsCustomerButton
            asCustomer={asCustomer}
            onSetAsCustomer={(v) => setAsCustomer(v)}
            theme={theme}
          />
        )}
      </Stack>
    );
  }, [asCustomer, employee, status, channel, date, theme]);

  const renderRowActionMenuItems = useCallback(
    ({ row, table }: TableRowAndTable<AppointmentResponse>) => {
      return [
        <MRT_ActionMenuItem
          key="details"
          label="Detalii programare"
          icon={<RemoveRedEyeOutlinedIcon />}
          onClick={() => {
            // TODO: implement view details action
          }}
          table={table}
        />,
        <MRT_ActionMenuItem
          key="cancel"
          label="Anulează programarea"
          icon={<DeleteOutlineOutlinedIcon />}
          onClick={() => setOpenCancelModal(true)}
          table={table}
          disabled={row?.original?.status !== AppointmentStatusEnum.IN_PROGRESS}
        />,
      ];
    },
    []
  );

  return (
    <MainLayout title="Rezervări" hideAction>
      <AppointmentCancelModal
        open={openCancelModal}
        onClose={() => setOpenCancelModal(false)}
      />

      <Table<AppointmentResponse>
        data={data?.results}
        rowCount={data?.count}
        columns={columns}
        manualPagination={true}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
        renderTopToolbarCustomActions={getToolbarCustomActions}
        renderRowActionMenuItems={renderRowActionMenuItems}
        enableRowActions={true}
        enableEditing={false}
        enableFilters={false}
        enableColumnFilters={false}
        enableSorting={false}
      />
    </MainLayout>
  );
};

export default AppointmentsModule;
