"use client";

import { CircularProgress, Paper, Stack } from "@mui/material";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: { display: false },
	},
};

const labels = [
	"January",
	"February",
	"March",
	"April",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const dataset1 = [20, 40, 50, 70, 10, 50, 80, 90, 100, 20, 30, 23];
const dataset2 = [10, 100, 10, 10, 20, 25, 56, 90, 23, 12, 104, 23];

export const data = {
	labels,
	datasets: [
		{
			label: "Programari proprii",
			data: dataset1,
			backgroundColor: "#00f2ea",
		},
		{
			label: "Programari closer",
			data: dataset2,
			backgroundColor: "#FF6F00",
		},
	],
};

type DashboardBarChartProps = {
	isLoading: boolean;
};

export default function DashboardBarChart({
	isLoading,
}: DashboardBarChartProps) {
	return (
		<Paper>
			{!isLoading && <Bar options={options} data={data} />}
			{isLoading && (
				<Stack
					sx={{
						minHeight: 500,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CircularProgress />
				</Stack>
			)}
		</Paper>
	);
}
