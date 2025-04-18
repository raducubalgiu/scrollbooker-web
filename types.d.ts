/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends Record<string, unknown>> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}
