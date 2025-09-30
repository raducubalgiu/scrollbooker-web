import UserListItemSkeletons from "@/components/cutomized/Skeletons/UserListItemSkeletons";
import UserListItem from "@/components/cutomized/UserListItem/UserListItem";
import { useCustomQuery } from "@/hooks/useHttp";
import { UserMiniType } from "@/ts/models/User/UserMiniType";
import { Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";

type EmploymentRequestsStepOneProps = {
	selectedUserId: number | null;
	onSelectUserId: (id: number | null) => void;
};

export default function EmploymentRequestsStepOne({
	selectedUserId,
	onSelectUserId,
}: EmploymentRequestsStepOneProps) {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [hasTypedAfterSelection, setHasTypesAfterSelection] = useState(false);

	const { data: users, isLoading } = useCustomQuery<UserMiniType[]>({
		key: ["search-users", debouncedSearch],
		url: "/api/employment-requests/search-users",
		params: { search },
		options: {
			enabled: !!debouncedSearch,
			staleTime: 1000 * 60,
			retry: false,
		},
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
		}, 500);

		return () => clearTimeout(timeout);
	}, [search]);

	const styles = {
		input: {
			"& .MuiOutlinedInput-root": {
				borderRadius: 3.5,
			},
			py: 2.5,
			px: 7.5,
			borderRadius: 10,
		},
	};

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value);

			if (selectedUserId !== null && !hasTypedAfterSelection) {
				onSelectUserId(null);
				setHasTypesAfterSelection(true);
			}
		},
		[hasTypedAfterSelection, selectedUserId, onSelectUserId]
	);

	const handleUserSelect = (userId: number) => {
		onSelectUserId(userId);
		setHasTypesAfterSelection(false);
	};

	return (
		<Paper sx={{ my: 2.5, px: 2.5 }}>
			<Stack justifyContent="center">
				<TextField
					placeholder="Caută utilizatori"
					onChange={handleSearch}
					sx={styles.input}
				/>
			</Stack>
			<Divider />
			<Paper sx={{ height: 300, overflow: "auto", pb: 2.5 }}>
				{!isLoading &&
					users?.map(user => (
						<UserListItem
							onClick={() => handleUserSelect(user.id)}
							isSelected={user.id === selectedUserId}
							key={user.id}
							username={user.username}
							name={user.fullname}
						/>
					))}
				{isLoading && <UserListItemSkeletons />}
				{isEmpty(users) && !isLoading && (
					<Typography sx={{ textAlign: "center" }}>
						Nu au fost găsiți utilizatori
					</Typography>
				)}
			</Paper>
		</Paper>
	);
}
