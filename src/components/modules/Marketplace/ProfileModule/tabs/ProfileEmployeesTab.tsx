import React, { memo } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessEmployeeResponse } from "@/ts/models/booking/business/BusinessEmployeeResponse";
import EmployeeItem from "../EmployeeItem";

type ProfileEmployeesTabProps = {
  businessId: number | undefined;
};

const ProfileEmployeesTab = ({ businessId }: ProfileEmployeesTabProps) => {
  const { data, isLoading, isRefetching } =
    useCustomQuery<BusinessEmployeeResponse>({
      key: ["business-employees", businessId],
      url: `/api/employees?businessId=${businessId}`,
      params: { page: 1, limit: 10 },
      options: { enabled: !!businessId },
    });

  return (
    <Box sx={{ maxWidth: "md" }}>
      {isLoading && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 10, width: "100%" }}
        >
          <CircularProgress />
        </Stack>
      )}
      {!isLoading &&
        data?.results.map((employee) => (
          <EmployeeItem key={employee.id} employee={employee} />
        ))}
    </Box>
  );
};

export default memo(ProfileEmployeesTab);
