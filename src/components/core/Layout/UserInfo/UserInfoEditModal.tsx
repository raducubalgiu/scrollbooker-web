import Modal from "../../Modal/Modal";
import { ActionButtonType } from "../../ActionButton/ActionButton";
import Input from "../../Input/Input";
import InputSelect from "../../Input/InputSelect";
import { Avatar, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { UserInfoType } from "@/models/UserInfoType";
import { useEffect } from "react";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import { required, minField, maxField } from "@/utils/validation-rules";

type UserInfoEditModalProps = {
	open: boolean;
	handleClose: () => void;
	user: UserInfoType | undefined;
	refetchUserData: () => void;
};

type ProfessionType = {
	id: string;
	name: string;
	active: boolean;
	created_at: string;
	updated_at: string;
};

export default function UserInfoEditModal({
	open,
	handleClose,
	user,
	refetchUserData,
}: UserInfoEditModalProps) {
	const methods = useForm({ defaultValues: user });
	const { handleSubmit, reset } = methods;

	const { data } = useCustomQuery<ProfessionType[]>({
		key: ["professions"],
		url: "/api/professions",
	});

	const { mutate: updateUser, isPending } = useMutate({
		key: ["update-user-info"],
		url: "/api/auth/update-user-info",
		method: "PUT",
		options: {
			onSuccess: () => {
				refetchUserData();
				handleClose();
				toast.success("Ți-ai editat profilul cu succes!");
			},
			onError: () => {
				toast.error("Ceva nu a mers bine. Încearcă mai tarziu");
			},
		},
	});

	const professions = data ?? [];

	const handleEditUser = (updatedUser: UserInfoType) =>
		updateUser({
			username: updatedUser.username,
			fullname: updatedUser.fullname,
			bio: updatedUser.bio,
			profession: updatedUser.profession,
		});

	const actions: ActionButtonType[] = [
		{
			title: "Renunță",
			props: {
				color: "inherit",
				onClick: () => {
					reset();
					handleClose();
				},
			},
		},
		{
			title: "Salvează",
			props: { onClick: handleSubmit(handleEditUser), loading: isPending },
		},
	];

	useEffect(() => {
		reset(user);
	}, [reset, user]);

	return (
		<Modal
			title="Editează-ți profilul"
			open={open}
			handleClose={() => {
				reset();
				handleClose();
			}}
			actions={actions}
		>
			<FormProvider {...methods}>
				<Stack justifyContent="center" alignItems="center" sx={{ p: 2.5 }}>
					<Avatar
						src="avatar"
						alt={user?.avatar}
						sx={{ width: 125, height: 125 }}
					>
						<CameraAltIcon sx={{ width: 45, height: 45 }} />
					</Avatar>
				</Stack>
				<Input
					name="username"
					label="Username*"
					rules={{ ...required() }}
					sx={{ mb: 2.5 }}
				/>
				<Input
					name="fullname"
					label="Nume"
					placeholder="Adaugă un nume.."
					rules={{ ...minField(3), ...maxField(30) }}
					sx={{ mb: 2.5 }}
				/>
				<Input
					name="bio"
					label="Biografie"
					placeholder="Adaugă o biografie.."
					multiline={true}
					minRows={3}
					sx={{ mb: 2.5 }}
					rules={{ ...maxField(100) }}
				/>
				<InputSelect
					name="profession"
					label="Profesie*"
					options={professions.map(profession => {
						return {
							value: profession.name,
							name: profession.name,
						};
					})}
				/>
			</FormProvider>
		</Modal>
	);
}
