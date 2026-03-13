"use client";

import Table, { TableRowAndTable } from "@/components/core/Table/Table";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";
import React, { useCallback, useMemo, useState } from "react";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useTheme } from "@mui/material/styles";
import { Label } from "@/components/cutomized/Label/Label";
import { getAppointmentStatusLabel } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import dayjs, { Dayjs } from "dayjs";
import { MRT_ActionMenuItem, MRT_ColumnDef } from "material-react-table";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Stack,
  Typography,
  Popover,
} from "@mui/material";
import {
  AppointmentChannelEnum,
  getAppointmentChannelLabel,
} from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DropdownMenu } from "@/components/cutomized/DropdownMenu/DropdownMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DateRangeIcon from "@mui/icons-material/DateRange";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  getChannelColor,
  getStatusButtonColor,
  getStatusColor,
} from "./appointment-utils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const AppointmentsModule = () => {
  const [status, setStatus] = useState<AppointmentStatusEnum | null>(null);
  const [channel, setChannel] = useState<AppointmentChannelEnum | null>(null);
  const [date, setDate] = React.useState<Dayjs | null>(null);
  const [dateAnchorEl, setDateAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();

  const { data, isLoading, pagination, setPagination } =
    useTableHandlers<AppointmentResponse>({
      route: "/appointments",
      extraParams: {
        asCustomer: false,
        status: status ?? undefined,
        channel: channel ?? undefined,
        start_date: date?.startOf("day").format("YYYY-MM-DD") ?? undefined,
        end_date: date?.endOf("day").format("YYYY-MM-DD") ?? undefined,
      },
    });

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
    ],
    [theme]
  );

  const [anchorStatusEl, setAnchorStatusEl] =
    React.useState<null | HTMLElement>(null);
  const [anchorChannelEl, setAnchorChannelEl] =
    React.useState<null | HTMLElement>(null);
  const statusOpen = Boolean(anchorStatusEl);
  const channelOpen = Boolean(anchorChannelEl);

  const handleStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(null);
    setAnchorStatusEl(event.currentTarget);
  };
  const handleStatusClose = () => setAnchorStatusEl(null);

  const handleChannelClick = (event: React.MouseEvent<HTMLElement>) => {
    setDateAnchorEl(null);
    setAnchorChannelEl(event.currentTarget);
  };
  const handleChannelClose = () => setAnchorChannelEl(null);

  React.useEffect(() => {
    if (anchorStatusEl || anchorChannelEl) setDateAnchorEl(null);
  }, [anchorStatusEl, anchorChannelEl]);

  React.useEffect(() => {
    if (dateAnchorEl) {
      setAnchorStatusEl(null);
      setAnchorChannelEl(null);
    }
  }, [dateAnchorEl]);

  const getToolbarCustomActions = React.useCallback(() => {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="contained"
          size="large"
          disableElevation
          onClick={() => setDate(null)}
        >
          Oricand
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="inherit"
          disableElevation
          onClick={() => setDate(dayjs())}
        >
          Astazi
        </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Button
            id="date-filter-button"
            aria-controls={dateAnchorEl ? "date-popover" : undefined}
            aria-haspopup="true"
            aria-expanded={dateAnchorEl ? "true" : undefined}
            variant="outlined"
            color="inherit"
            size="large"
            disableElevation
            onMouseDown={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              setAnchorStatusEl(null);
              setAnchorChannelEl(null);
              setDateAnchorEl(e.currentTarget);
            }}
            startIcon={<DateRangeIcon />}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {date ? date.format("DD.MM.YYYY") : "Custom"}
          </Button>
          <Popover
            id="date-popover"
            open={Boolean(dateAnchorEl) && !anchorStatusEl && !anchorChannelEl}
            anchorEl={dateAnchorEl}
            onClose={() => setDateAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Box sx={{ p: 1 }}>
              <DateCalendar
                value={date}
                disableFuture
                onChange={(newDate) => {
                  setDate(newDate as any);
                  setDateAnchorEl(null);
                }}
              />
            </Box>
          </Popover>
        </LocalizationProvider>
        <div>
          <Button
            id="status-filter-button"
            aria-controls={statusOpen ? "status-filter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={statusOpen ? "true" : undefined}
            variant="outlined"
            size="large"
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
            >
              Toate statusurile
            </MenuItem>

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
            size="large"
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
            >
              Toate canalele
            </MenuItem>

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
    );
  }, [
    status,
    channel,
    date,
    dateAnchorEl,
    anchorStatusEl,
    anchorChannelEl,
    statusOpen,
    channelOpen,
    theme,
  ]);

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
          onClick={() => {
            // TODO: implement cancel action
          }}
          table={table}
          disabled={row?.original?.status !== AppointmentStatusEnum.IN_PROGRESS}
        />,
      ];
    },
    []
  );

  return (
    <MainLayout title="Rezervări" hideAction>
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
