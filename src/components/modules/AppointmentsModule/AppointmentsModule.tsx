"use client";

import Table, { TableRowAndTable } from "@/components/core/Table/Table";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";
import React, { useMemo, useState } from "react";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useTheme } from "@mui/material/styles";
import { Label } from "@/components/cutomized/Label/Label";
import { getAppointmentStatusLabel } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import dayjs from "dayjs";
import { MRT_ActionMenuItem, MRT_ColumnDef } from "material-react-table";
import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  AppointmentChannelEnum,
  getAppointmentChannelLabel,
} from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { Delete } from "@mui/icons-material";
import { DropdownMenu } from "@/components/cutomized/DropdownMenu/DropdownMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DateRangeIcon from "@mui/icons-material/DateRange";

const AppointmentsModule = () => {
  const [status, setStatus] = useState<AppointmentStatusEnum | null>(null);
  const [channel, setChannel] = useState<AppointmentChannelEnum | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const { data, isLoading, pagination, setPagination } =
    useTableHandlers<AppointmentResponse>({
      route: "/appointments",
      extraParams: {
        asCustomer: false,
        status: status ?? undefined,
        channel: channel ?? undefined,
        start_date: startDate ?? undefined,
        end_date: endDate ?? undefined,
      },
    });

  const theme = useTheme();

  const getStatusColor = (
    status: AppointmentStatusEnum | string | undefined
  ): string => {
    const key = (status ?? "").toString().toLowerCase();
    switch (key) {
      case AppointmentStatusEnum.IN_PROGRESS:
        return theme.palette.success.main;
      case AppointmentStatusEnum.FINISHED:
        return (
          (theme.palette.grey && theme.palette.grey[600]) ||
          (theme.palette.text && theme.palette.text.secondary) ||
          "#999"
        );
      case AppointmentStatusEnum.CANCELED:
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getStatusButtonColor = (
    status: AppointmentStatusEnum | string | undefined
  ):
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" => {
    const key = (status ?? "").toString().toLowerCase();
    switch (key) {
      case AppointmentStatusEnum.IN_PROGRESS:
        return "success";
      case AppointmentStatusEnum.FINISHED:
        return "primary";
      case AppointmentStatusEnum.CANCELED:
        return "error";
      default:
        return "inherit";
    }
  };

  const getChannelColor = (
    channel: AppointmentChannelEnum | string | undefined
  ) => {
    const key = (channel ?? "").toString().toLowerCase();
    switch (key) {
      case AppointmentChannelEnum.SCROLL_BOOKER:
        return theme.palette.primary.main;
      case AppointmentChannelEnum.OWN_CLIENT:
        return (
          (theme.palette.grey && theme.palette.grey[600]) ||
          theme.palette.text.secondary
        );
      default:
        return theme.palette.primary.main;
    }
  };

  const columns = useMemo<MRT_ColumnDef<AppointmentResponse>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        Cell: ({ row }) => <Typography>#{row.original.id}</Typography>,
      },
      {
        accessorKey: "name",
        header: "Client",
        size: 300,
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
        accessorKey: "channel",
        header: "Canal",
        size: 50,
        Cell: ({ row }) => (
          <Label
            title={getAppointmentChannelLabel(row.original.channel)}
            color={getChannelColor(row.original.channel)}
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
            color={getStatusColor(row.original.status)}
          />
        ),
      },
    ],
    [theme]
  );

  const renderRowActionMenuItems = ({
    row,
    table,
  }: TableRowAndTable<AppointmentResponse>) => {
    if (row.original.status !== AppointmentStatusEnum.IN_PROGRESS) return [];

    return [
      <MRT_ActionMenuItem
        key={2}
        label="Anulează programarea"
        icon={<Delete />}
        onClick={() => {}}
        table={table}
      />,
    ];
  };

  // Separate anchors for status and channel dropdowns
  const [anchorStatusEl, setAnchorStatusEl] =
    React.useState<null | HTMLElement>(null);
  const [anchorChannelEl, setAnchorChannelEl] =
    React.useState<null | HTMLElement>(null);
  const statusOpen = Boolean(anchorStatusEl);
  const channelOpen = Boolean(anchorChannelEl);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorStatusEl(event.currentTarget);
  const handleStatusClose = () => setAnchorStatusEl(null);

  const handleChannelClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorChannelEl(event.currentTarget);
  const handleChannelClose = () => setAnchorChannelEl(null);

  return (
    <MainLayout title="Rezervări" hideAction>
      <Table<AppointmentResponse>
        data={data?.results}
        rowCount={data?.count}
        columns={columns}
        manualPagination={true}
        onPaginationChange={setPagination}
        state={{ pagination, isLoading }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
            >
              Oricand
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              disableElevation
              onClick={() => {
                setStartDate(dayjs().startOf("day").format("YYYY-MM-DD"));
                setEndDate(dayjs().endOf("day").format("YYYY-MM-DD"));
              }}
            >
              Astazi
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              disableElevation
              onClick={() => {}}
              startIcon={<DateRangeIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Custom
            </Button>
            <div>
              <Button
                id="status-filter-button"
                aria-controls={statusOpen ? "status-filter-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={statusOpen ? "true" : undefined}
                variant="outlined"
                color={getStatusButtonColor(status ?? undefined)}
                disableElevation
                onClick={handleStatusClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {status ? getAppointmentStatusLabel(status) : "Status"}
              </Button>
              <DropdownMenu
                id="status-filter-menu"
                slotProps={{
                  list: { "aria-labelledby": "status-filter-button" },
                  paper: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                    },
                  },
                }}
                anchorEl={anchorStatusEl}
                open={statusOpen}
                onClose={handleStatusClose}
              >
                <MenuItem
                  onClick={() => {
                    setStatus(null);
                    handleStatusClose();
                  }}
                  selected={status === null}
                  disableRipple
                  sx={{ fontWeight: 600 }}
                >
                  Toate
                </MenuItem>

                <Divider />

                {AppointmentStatusEnum.all.map((s) => (
                  <MenuItem
                    key={s}
                    onClick={() => {
                      setStatus(s);
                      handleStatusClose();
                    }}
                    selected={status === s}
                    disableRipple
                  >
                    {getAppointmentStatusLabel(s)}
                  </MenuItem>
                ))}
              </DropdownMenu>
            </div>
            <div>
              <Button
                id="channel-filter-button"
                aria-controls={channelOpen ? "channel-filter-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={channelOpen ? "true" : undefined}
                variant="outlined"
                color={channel ? "primary" : "inherit"}
                disableElevation
                onClick={handleChannelClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {channel ? getAppointmentChannelLabel(channel) : "Canal"}
              </Button>
              <DropdownMenu
                id="channel-filter-menu"
                slotProps={{
                  list: { "aria-labelledby": "channel-filter-button" },
                  paper: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                    },
                  },
                }}
                anchorEl={anchorChannelEl}
                open={channelOpen}
                onClose={handleChannelClose}
              >
                <MenuItem
                  onClick={() => {
                    setChannel(null);
                    handleChannelClose();
                  }}
                  selected={channel === null}
                  disableRipple
                  sx={{ fontWeight: 600 }}
                >
                  Toate
                </MenuItem>

                <Divider />

                {AppointmentChannelEnum.all.map((s) => (
                  <MenuItem
                    key={s}
                    onClick={() => {
                      setChannel(s);
                      handleChannelClose();
                    }}
                    selected={channel === s}
                    disableRipple
                  >
                    {getAppointmentChannelLabel(s)}
                  </MenuItem>
                ))}
              </DropdownMenu>
            </div>
          </Stack>
        )}
        enableRowActions={true}
        enableEditing={false}
        renderRowActionMenuItems={renderRowActionMenuItems}
        enableFilters={false}
        enableColumnFilters={false}
        enableSorting={false}
      />
    </MainLayout>
  );
};

export default AppointmentsModule;
