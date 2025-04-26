"use client";

import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomStack from "../../core/CustomStack/CustomStack";
import DashboardBarChart from "./DashboardBarChart";
import DashboardCalendarAvailability from "./DashboardCalendarAvailability";
import { useCustomQuery } from "@/hooks/useHttp";
import DashboardCardSummary from "./DashboardCardSummary";
import { DashboardSummaryType } from "@/models/DashboardSummaryType";
import DashboardCardSummarySkeleton from "@/components/cutomized/Skeletons/DashboardCardSummarySkeleton";
import { useDashboardReducer } from "@/hooks/useDashboardReducer";
import Protected from "@/components/cutomized/Protected/Protected";

type EmployeeType = {
	id: string;
	username: string;
	job: string;
	hire_date: string;
	followers_count: number;
	ratings_count: number;
	ratings_average: number;
};

type PaginatedEmployeesType = {
	count: number;
	results: EmployeeType[];
};

export default function DashboardModule() {
	const { filters, handleDaily, handleMonthly, handleWeekly, PeriodEnum } =
		useDashboardReducer();
	const { startDate, endDate } = filters;
	const [selectedEmployee, setSelectedEmployee] = useState({
		id: 0,
	});

	const { data: employeesData } = useCustomQuery<PaginatedEmployeesType>({
		key: ["employees"],
		url: "/api/employees",
		params: { page: 1, limit: 10 },
	});

	const { data: dashboardData, isLoading } = useCustomQuery<
		DashboardSummaryType[]
	>({
		key: ["dashboard", startDate, endDate],
		url: `/api/dashboard`,
		params: { start_date: startDate, end_date: endDate },
	});

	const dashboardSummary = dashboardData ?? [];
	const employees = [
		{ id: 0, username: "Toți angajații" },
		...(employeesData?.results ?? []),
	];

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
				<Protected permission="EMPLOYEES_VIEW">
					<FormControl sx={{ minWidth: 250 }}>
						<InputLabel id="employees">Angajați</InputLabel>
						<Select
							labelId="employees"
							id="employees"
							value={selectedEmployee.id}
							label="Angajați"
							onChange={e =>
								setSelectedEmployee({
									id: Number(e.target.value),
								})
							}
						>
							{employees?.map((employee, i) => (
								<MenuItem key={i} value={employee.id}>
									{employee.username}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Protected>
			</CustomStack>
			<Grid container spacing={3} sx={{ mb: 2.5 }}>
				{isLoading ? (
					<DashboardCardSummarySkeleton />
				) : (
					dashboardSummary?.map((dashboard, i) => (
						<DashboardCardSummary
							key={i}
							isLoading={isLoading}
							dashboardSummary={dashboard}
						/>
					))
				)}
			</Grid>
			<Grid container spacing={3}>
				<Grid size={8}>
					<DashboardBarChart isLoading={isLoading} />
				</Grid>
				<Grid size={4}>
					<DashboardCalendarAvailability />
				</Grid>
			</Grid>
		</Box>
	);
}
