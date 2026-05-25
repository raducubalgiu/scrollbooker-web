"use client";

import { EmploymentRequest } from "@/ts/models/booking/employmentRequest/EmploymentRequest";
import {
  alpha,
  AppBar,
  Box,
  Container,
  IconButton,
  Theme,
  Toolbar,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AppRoutes, useAppNavigation } from "@/utils/routes";
import EmploymentRespondParagraphs from "./EmploymentRequestParagraphs";
import EmploymentDetails from "./EmploymentDetails";
import EmploymentRespondBottomBar from "./EmploymentRespondBottomBar";
import { useMutate } from "@/hooks/useHttp";
import { EmploymentRequestStatusEnum } from "@/ts/enums/EmploymentRequestStatusEnum";
import { toast } from "react-toastify";

type EmploymentRequestModuleProps = {
  employmentRequest: EmploymentRequest;
};

const EmploymentRequestModule = ({
  employmentRequest,
}: EmploymentRequestModuleProps) => {
  const employee = employmentRequest.employee;
  const employer = employmentRequest.employer;
  const { navigateTo } = useAppNavigation();
  const { goBack } = useAppNavigation();

  const { mutate: handleRespond, isPending } = useMutate({
    key: ["update-employment-request"],
    url: `/api/booking/employment-requests/${employmentRequest.id}`,
    method: "PUT",
    options: {
      onSuccess: () => {
        navigateTo(AppRoutes.profile(employee.username, employee.profession));
        toast.success(
          `Raspunsul tău a fost trimis către ${employmentRequest.employer.fullname}`
        );
      },
    },
  });

  const handleDenied = () =>
    handleRespond({ status: EmploymentRequestStatusEnum.DENIED });

  return (
    <Box sx={styles.container}>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar disableGutters sx={{ height: 90, px: 5 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              goBack();
            }}
            sx={styles.back}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth={false} sx={styles.main}>
        <EmploymentDetails employer={employer} />
        <EmploymentRespondParagraphs employerFullName={employer.fullname} />
        <Box sx={{ width: "100%", pb: 3, pt: 2 }}>
          <EmploymentRespondBottomBar
            isSaving={isPending}
            onDeny={handleDenied}
            onAccept={() => {}}
          />
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
  },
  main: {
    flex: 1,
    overflowY: "auto",
    maxWidth: "600px !important",
    px: 3,
    py: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  back: {
    width: 64,
    height: 64,
    color: "text.primary",
    border: (theme: Theme) =>
      `1.5px solid ${alpha(theme.palette.divider, 0.18)}`,
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
};

export default EmploymentRequestModule;
