import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Close } from "@mui/icons-material";
import { Avatar, Button, IconButton, Stack, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import React, { useMemo, useState } from "react";
import EmploymentRequestsModal from "./EmploymentRequestsModal/EmploymentRequestsModal";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import Table from "@/components/core/Table/Table";
import { EmploymentRequest } from "@/ts/models/booking/employmentRequest/EmploymentRequest";
import { toast } from "react-toastify";

type OpenConfirmationState = {
  openModal: boolean;
  employment_request_id: null | number;
};

const MyEmploymentRequestsTab = ({ isEnabled }: { isEnabled: boolean }) => {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState<OpenConfirmationState>({
    openModal: false,
    employment_request_id: null,
  });

  const {
    data: employmentRequests,
    isLoading,
    refetch,
  } = useCustomQuery<EmploymentRequest[]>({
    key: ["get-employment-requests"],
    url: "/api/booking/employment-requests",
    options: {
      enabled: isEnabled,
    },
  });

  const { mutate: handleCancel, isPending: isPendingCancel } = useMutate({
    key: ["cancel-employment-request", confirmation.employment_request_id],
    url: `/api/booking/employment-requests/${confirmation.employment_request_id}`,
    method: "DELETE",
    options: {
      onSuccess: () => {
        setConfirmation({ openModal: false, employment_request_id: null });
        refetch();
        toast.success("Cererea de angajare a fost ștearsă");
      },
    },
  });

  const columns = useMemo<MRT_ColumnDef<EmploymentRequest>[]>(
    () => [
      {
        accessorKey: "employee.username",
        header: "Viitorul angajat",
        Cell: ({ row }) => {
          return (
            <Stack flexDirection="row" justifyContent="flex-start">
              <Avatar
                src={row.original.employee.avatar ?? ""}
                sx={{ width: 35, height: 35, mr: 2.5 }}
              />
              {row.original.employee.fullname}
            </Stack>
          );
        },
      },
      {
        accessorKey: "profession.name",
        header: "Funcția",
      },
      {
        accessorKey: "created_at",
        header: "Data",
        Cell: ({ row }) => dayjs(row.original.created_at).format("DD-MM-YYYY"),
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: () => "În așteptare",
      },
    ],
    []
  );

  const renderRowActions = ({ row }: { row: MRT_Row<EmploymentRequest> }) => (
    <Tooltip title="Anulează cererea">
      <IconButton
        onClick={() =>
          setConfirmation({
            openModal: true,
            employment_request_id: row.original.id,
          })
        }
      >
        <Close color="error" />
      </IconButton>
    </Tooltip>
  );

  const getToolbarCustomActions = React.useCallback(() => {
    return (
      <Button
        variant="outlined"
        size="large"
        disableElevation
        onClick={() => setOpen(true)}
      >
        Trimite o cerere
      </Button>
    );
  }, []);

  return (
    <>
      <ConfirmationModal
        open={confirmation.openModal}
        onClose={() =>
          setConfirmation({ openModal: false, employment_request_id: null })
        }
        onConfirm={() => handleCancel({})}
        isLoading={isPendingCancel}
        title="Ești sigur?"
        message="Ești sigur că dorești să anulezi această cerere?"
      />
      <EmploymentRequestsModal
        open={open}
        handleClose={() => {
          setOpen(false);
          refetch();
        }}
      />
      <Table
        data={employmentRequests ?? []}
        columns={columns}
        enableFilters={false}
        enableSorting={false}
        enableColumnActions={false}
        enablePagination={false}
        enableHiding={false}
        localization={MRT_Localization_RO}
        state={{ isLoading }}
        enableRowActions={true}
        positionActionsColumn="last"
        renderRowActions={renderRowActions}
        renderTopToolbarCustomActions={getToolbarCustomActions}
      />
    </>
  );
};

export default MyEmploymentRequestsTab;
