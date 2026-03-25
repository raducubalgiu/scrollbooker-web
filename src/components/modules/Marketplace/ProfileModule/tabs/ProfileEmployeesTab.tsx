import React, { memo } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessEmployeeResponse } from "@/ts/models/booking/business/BusinessEmployeeResponse";
import EmployeeItem from "../EmployeeItem";

type ProfileEmployeesTabProps = {
  businessOwnerId: number | undefined;
};

const ProfileEmployeesTab = ({ businessOwnerId }: ProfileEmployeesTabProps) => {
  const { data, isLoading } = useCustomQuery<BusinessEmployeeResponse>({
    key: ["business-employees", businessOwnerId],
    url: `/api/employees?businessOwnerId=${businessOwnerId}`,
    params: { page: 1, limit: 10 },
    options: { enabled: !!businessOwnerId },
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
