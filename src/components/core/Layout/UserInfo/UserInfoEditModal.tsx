import React from "react";
import Modal from "../../Modal/Modal";
import { ActionButtonType } from "../../ActionButton/ActionButton";
import Input from "../../Input/Input";
import InputSelect from "../../Input/InputSelect";
import { Avatar, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

type UserInfoEditModalProps = {
	open: boolean;
	handleClose: () => void;
};

export default function UserInfoEditModal({
	open,
	handleClose,
}: UserInfoEditModalProps) {
	const { watch } = useFormContext();
	const { data } = watch();

	const actions: ActionButtonType[] = [
		{
			title: "Cancel",
			props: { color: "inherit", onClick: handleClose },
		},
		{
			title: "Save",
		},
	];

	return (
		<Modal
			title="Edit User Data"
			open={open}
			handleClose={handleClose}
			actions={actions}
		>
			<Stack justifyContent="center" alignItems="center" sx={{ p: 2.5 }}>
				<Avatar src="avatar" alt="" sx={{ width: 125, height: 125 }}>
					<CameraAltIcon sx={{ width: 45, height: 45 }} />
				</Avatar>
			</Stack>
			<Input name="data.username" label="Username" sx={{ mb: 1.5 }} />
			<Input name="data.fullname" label="Fullname" sx={{ mb: 1.5 }} />
			<Input
				name="data.bio"
				label="Biografie"
				multiline={true}
				minRows={3}
				sx={{ mb: 1.5 }}
			/>
			<InputSelect
				name="data.profession"
				label="Profession"
				options={[{ name: "Something cool", value: "1" }]}
			/>
		</Modal>
	);
}
