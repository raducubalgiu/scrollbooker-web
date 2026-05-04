import React, { memo, useMemo } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import EmployeeItem from "../EmployeeItem";
import { isEmpty } from "lodash";
import { useInfiniteEmployees } from "@/hooks/infiniteQuery/useInfiniteEmployees";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ErrorMessage from "@/components/cutomized/NotFound/ErrorMessage";

type ProfileEmployeesTabProps = {
  businessOwnerId: number | undefined;
};

const ProfileEmployeesTab = ({ businessOwnerId }: ProfileEmployeesTabProps) => {
  const { data, isLoading, isError } = useInfiniteEmployees(businessOwnerId);

  const employees = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  return (
    <>
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
        employees.map((employee) => (
          <Box sx={{ maxWidth: "md" }}>
            <EmployeeItem key={employee.id} employee={employee} />
          </Box>
        ))}
      {!isLoading && isEmpty(employees) && !isError && (
        <NotFound
          title="Nu au fost găsite angajați"
          description="Acest business nu și-a adăugat încă specialiștii"
          icon={<PeopleAltOutlinedIcon sx={{ fontSize: 50 }} />}
        />
      )}

      {!isLoading && isError && <ErrorMessage resource="specialiști" />}
    </>
  );
};

export default memo(ProfileEmployeesTab);
