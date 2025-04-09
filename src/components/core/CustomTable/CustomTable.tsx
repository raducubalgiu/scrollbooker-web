"use client";

import {
	Paper,
	TableRow,
	TableCell,
	Table,
	TableHead,
	TableBody,
	TableContainer,
	TablePagination,
	SxProps,
	Stack,
	IconButton,
} from "@mui/material";
import TableSkeleton from "../Skeletons/TableSkeleton";
import CustomTableRow from "./CustomTableRow";
import AddIcon from "@mui/icons-material/Add";

export type CustomTableColumnType = {
	title: string;
	accessoryKey: string;
	cellStyle?: SxProps;
	rules?: object;
};

type PaginationType = {
	count: number | undefined;
	page: number;
	limit: number;
};

type CustomTableProps<T> = {
	isLoading: boolean;
	columns: CustomTableColumnType[];
	data: T[];
	enableActions?: boolean;
	enablePagination?: boolean;
	initialState?: { pagination: PaginationType };
	onHandleChangePage: (event: unknown, newPage: number) => void;
	onHandleChangeLimit: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomTable<T>(props: CustomTableProps<T>) {
	const {
		isLoading,
		columns,
		data,
		enableActions = true,
		enablePagination = true,
		initialState,
		onHandleChangePage,
		onHandleChangeLimit,
	} = props;
	const { count, limit, page } = initialState?.pagination || {};

	return (
		<Paper>
			<TableContainer>
				<Stack alignItems="flex-end" sx={{ p: 2.5 }}>
					<IconButton>
						<AddIcon />
					</IconButton>
				</Stack>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map(({ title, cellStyle }, i) => (
								<TableCell sx={cellStyle} key={i}>
									{title}
								</TableCell>
							))}
							{enableActions && <TableCell>Actions</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{!isLoading &&
							data?.map((row, i) => {
								return (
									<CustomTableRow
										key={i}
										columns={columns}
										row={row}
										enableActions={enableActions}
									/>
								);
							})}
						{isLoading && <TableSkeleton columns={6} rows={5} />}
					</TableBody>
				</Table>
			</TableContainer>
			{enablePagination && initialState && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={count ? count : 0}
					rowsPerPage={limit ? limit : 0}
					page={page ? page : 0}
					onPageChange={onHandleChangePage}
					onRowsPerPageChange={onHandleChangeLimit}
				/>
			)}
		</Paper>
	);
}
