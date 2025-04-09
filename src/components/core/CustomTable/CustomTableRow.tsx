import React, { useState } from "react";
import { TableRow, TableCell, SxProps } from "@mui/material";
import Input from "../Input/Input";
import {
	FormProvider,
	useForm,
	DefaultValues,
	FieldValues,
} from "react-hook-form";
import CancelIconButton from "@/components/cutomized/IconButtons/CancelIconButton";
import EditIconButton from "@/components/cutomized/IconButtons/EditIconButton";
import DeleteIconButton from "@/components/cutomized/IconButtons/DeleteIconButton";
import SaveIconButton from "@/components/cutomized/IconButtons/SaveIconButton";

type ColumnType = {
	title: string;
	accessoryKey: string;
	cellStyle?: SxProps;
	rules?: object;
};

type CustomTableRowProps<T extends FieldValues> = {
	columns: ColumnType[];
	enableActions: boolean;
	row: DefaultValues<T>;
};

export default function CustomTableRow<T extends FieldValues>(
	props: CustomTableRowProps<T>
) {
	const { columns, enableActions, row } = props;
	const [isEdit, setIsEdit] = useState(false);
	const methods = useForm<T>({ defaultValues: row });
	const { watch, handleSubmit, reset } = methods;
	const tableRow = watch();

	const handleSave = (new_data: T) => {
		console.log("NEW DATA!!!", new_data);
	};

	const handleClose = () => {
		setIsEdit(false);
		reset();
	};
	const handleEdit = () => setIsEdit(true);

	const editActions = (
		<>
			<SaveIconButton onClick={handleSubmit(handleSave)} />
			<CancelIconButton onClick={handleClose} />
		</>
	);

	const viewActions = (
		<>
			<EditIconButton onClick={handleEdit} />
			<DeleteIconButton onClick={() => {}} />
		</>
	);

	return (
		<TableRow>
			<FormProvider {...methods}>
				{columns.map(({ accessoryKey, title, cellStyle, rules }, colIndex) => {
					if (isEdit) {
						return (
							<TableCell sx={cellStyle} key={colIndex}>
								<Input name={accessoryKey} placeholder={title} rules={rules} />
							</TableCell>
						);
					}

					return <TableCell key={colIndex}>{tableRow[accessoryKey]}</TableCell>;
				})}
				{enableActions && (
					<TableCell>{isEdit ? editActions : viewActions}</TableCell>
				)}
			</FormProvider>
		</TableRow>
	);
}
