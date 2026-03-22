import React, { memo } from "react";
import { Box } from "@mui/material";
import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessEmployeeResponse } from "@/ts/models/booking/business/BusinessEmployeeResponse";
import { PaginatedData } from "@/components/core/Table/Table";

type ProfileEmployeesTabProps = {
  businessId: number | undefined;
};

const ProfileEmployeesTab = ({ businessId }: ProfileEmployeesTabProps) => {
  const { data, isLoading, isRefetching } = useCustomQuery<
    PaginatedData<BusinessEmployeeResponse>
  >({
    key: ["business-employees", businessId],
    url: `/api/employees?businessId=${businessId}`,
    params: { page: 1, limit: 10 },
    options: { enabled: !!businessId },
  });

  return (
    <Box sx={{ maxWidth: "md" }}>
      {data?.results.map((employee) => (
        // <UserItem key={employee.id} user={employee} />
        <Box key={employee.id}>{employee.fullname}</Box>
      ))}
    </Box>
  );
};

export default memo(ProfileEmployeesTab);
