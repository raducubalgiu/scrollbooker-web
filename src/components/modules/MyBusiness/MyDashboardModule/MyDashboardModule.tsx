"use client";

import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DashboardSummaryType } from "@/ts/models/DashboardSummaryType";
import { useDashboardReducer } from "@/hooks/useDashboardReducer";
import Protected from "@/components/cutomized/Protected/Protected";
import usePermission from "@/components/cutomized/Protected/usePermission";
import DashboardCalendarAvailability from "./DashboardCalendarAvailability";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import DashboardCardSummary from "@/components/modules/MyBusiness/MyDashboardModule/DashboardCardSummary";
import DashboardBarChart from "@/components/modules/MyBusiness/MyDashboardModule/DashboardBarChart";

type DashboardModuleProps = {
  userId: number | undefined;
};

const dummySummary: DashboardSummaryType[] = [
  {
    title: "Total rezervari",
    amount: 250,
    trend: "up",
    percentage: "10%",
    days_diff: 15,
  },
  {
    title: "Clienti proprii",
    amount: 0,
    trend: "no_change",
    percentage: "0%",
    days_diff: 15,
  },
  {
    title: "Clienti ScrollBooker",
    amount: 0,
    trend: "no_change",
    percentage: "0%",
    days_diff: 15,
  },
  {
    title: "Incasari totale",
    amount: 5250,
    trend: "up",
    percentage: "10%",
    days_diff: 15,
  },
];

export default function MyDashboardModule({ userId }: DashboardModuleProps) {
  const { filters, handleDaily, handleMonthly, handleWeekly, PeriodEnum } =
    useDashboardReducer();
  const { startDate, endDate } = filters;
  const [selectedEmployee, setSelectedEmployee] = useState({ id: userId });
  const { hasPermission } = usePermission({ permission: "EMPLOYEES_VIEW" });

  useEffect(() => {
    if (hasPermission) setSelectedEmployee({ id: 0 });
  }, [hasPermission]);

  // const { data: employeesData } = useCustomQuery<PaginatedData<UserMiniType>>({
  // 	key: ["employees", hasPermission],
  // 	url: "/api/employees",
  // 	params: { page: 1, limit: 10 },
  // 	options: { enabled: hasPermission },
  // });

  // const { data: dashboardData, isLoading } = useCustomQuery<
  // 	DashboardSummaryType[]
  // >({
  // 	key: ["dashboard", startDate, endDate, selectedEmployee.id, userId],
  // 	url: `/api/dashboard`,
  // 	params: {
  // 		startDate,
  // 		endDate,
  // 		allEmployees: selectedEmployee.id === 0,
  // 		userId: selectedEmployee.id === 0 ? userId : selectedEmployee.id,
  // 	},
  // 	options: { enabled: !!userId },
  // });

  // const employeesOptions = [
  // 	{ id: 0, username: "Toți angajații" },
  // 	...(employeesData?.results ?? []),
  // ];

  const buttons = [
    {
      title: "Astăzi",
      onClick: handleDaily,
      selected: filters.type == PeriodEnum.DAILY,
    },
    {
      title: "Ultimele 7 zile",
      onClick: handleWeekly,
      selected: filters.type == PeriodEnum.WEEKLY,
    },
    {
      title: "Ultimele 30 de zile",
      onClick: handleMonthly,
      selected: filters.type == PeriodEnum.MONTHLY,
    },
  ];

  return (
    <Box>
      <CustomStack sx={{ mb: 2.5 }}>
        <CustomStack>
          {buttons.map((btn, i) => (
            <Button
              key={i}
              onClick={btn.onClick}
              variant="contained"
              color={btn.selected ? "primary" : "inherit"}
              sx={{ fontWeight: "600", mr: 1.5 }}
            >
              {btn.title}
            </Button>
          ))}
        </CustomStack>
        {/* <Protected permission={PermissionEnum.MY_EMPLOYEES_VIEW}>
					<DashboardEmployeesSelect
						options={employeesOptions}
						selectedEmployeeId={selectedEmployee?.id}
						onSetSelectedEmployee={e =>
							setSelectedEmployee({
								id: Number(e.target.value),
							})
						}
					/>
				</Protected> */}
      </CustomStack>
      <Grid container spacing={3} sx={{ mb: 2.5 }}>
        {/* {isLoading && <DashboardCardSummarySkeleton />} */}
        {dummySummary?.map((summary, i) => (
          <DashboardCardSummary key={i} summary={summary} />
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid size={8}>
          <DashboardBarChart isLoading={false} />
        </Grid>
        <Grid size={4}>
          <Protected permission={PermissionEnum.MY_CALENDAR_VIEW}>
            <DashboardCalendarAvailability userId={userId} />
          </Protected>
        </Grid>
      </Grid>
    </Box>
  );
}
