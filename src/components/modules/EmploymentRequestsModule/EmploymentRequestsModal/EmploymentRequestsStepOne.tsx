import UserListItem from "@/components/cutomized/UserListItem/UserListItem";
import { Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { isEmpty } from "lodash";

type EmploymentRequestsStepOneProps = {
	selectedUserId: number | null;
	setSelectedUserId: (id: number) => void;
};

export default function EmploymentRequestsStepOne({
	selectedUserId,
	setSelectedUserId,
}: EmploymentRequestsStepOneProps) {
	const styles = {
		input: {
			"& .MuiOutlinedInput-root": {
				borderRadius: 3.5,
			},
		},
	};

	const USERS = [
		{
			id: 1,
			username: "alex_ionel",
			name: "Alex Ionel",
		},
		{
			id: 2,
			username: "cristian_dumitrache",
			name: "Cristian Dumitrache",
		},
		{
			id: 3,
			username: "@rad_balgiu",
			name: "Radu Balgiu",
		},
		{
			id: 4,
			username: "@gigi_corsicanu",
			name: "Gigi Corsicanu",
		},
		{
			id: 5,
			username: "@giovani_reina",
			name: "Giovani Reina",
		},
		{
			id: 6,
			username: "@cristiano",
			name: "Cristiano Ronaldo",
		},
	];

	return (
		<Paper sx={{ my: 2.5, px: 2.5 }}>
			<Stack justifyContent="center">
				<TextField
					placeholder="Caută utilizatori"
					sx={{
						py: 2.5,
						px: 7.5,
						borderRadius: 10,
						...styles.input,
					}}
				/>
			</Stack>
			<Divider />
			<Paper sx={{ height: 300, overflow: "auto", pb: 2.5 }}>
				{USERS?.map(user => (
					<UserListItem
						onClick={() => setSelectedUserId(user.id)}
						isSelected={user.id === selectedUserId}
						key={user.id}
						username={user.username}
						name={user.name}
					/>
				))}
				{isEmpty(USERS) && (
					<Typography sx={{ textAlign: "center" }}>
						Nu au fost găsiți utilizatori
					</Typography>
				)}
			</Paper>
		</Paper>
	);
}
