import CustomStack from "@/components/core/CustomStack/CustomStack";
import UserListItem from "@/components/cutomized/UserListItem/UserListItem";
import { useCustomQuery } from "@/hooks/useHttp";
import { UserInfoType } from "@/models/UserInfoType";
import {
	Box,
	Divider,
	Paper,
	Skeleton,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";

type EmploymentRequestsStepOneProps = {
	selectedUserId: number | null;
	setSelectedUserId: (id: number | null) => void;
};

export default function EmploymentRequestsStepOne({
	selectedUserId,
	setSelectedUserId,
}: EmploymentRequestsStepOneProps) {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [hasTypedAfterSelection, setHasTypesAfterSelection] = useState(false);

	const { data: users, isLoading } = useCustomQuery<UserInfoType[]>({
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
		},
	};

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value);

			if (selectedUserId !== null && !hasTypedAfterSelection) {
				setSelectedUserId(null);
				setHasTypesAfterSelection(true);
			}
		},
		[hasTypedAfterSelection, selectedUserId, setSelectedUserId]
	);

	const handleUserSelect = (userId: number) => {
		setSelectedUserId(userId);
		setHasTypesAfterSelection(false);
	};

	return (
		<Paper sx={{ my: 2.5, px: 2.5 }}>
			<Stack justifyContent="center">
				<TextField
					placeholder="Caută utilizatori"
					onChange={handleSearch}
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
				{isLoading && (
					<>
						<CustomStack sx={{ p: 2.5 }} justifyContent="flex-start">
							<Skeleton variant="circular" width={50} height={50} />
							<Box sx={{ ml: 1.5 }}>
								<Skeleton variant="text" width={200} />
								<Skeleton variant="text" width={200} />
							</Box>
						</CustomStack>
						<CustomStack sx={{ p: 2.5 }} justifyContent="flex-start">
							<Skeleton variant="circular" width={50} height={50} />
							<Box sx={{ ml: 1.5 }}>
								<Skeleton variant="text" width={200} />
								<Skeleton variant="text" width={200} />
							</Box>
						</CustomStack>
						<CustomStack sx={{ p: 2.5 }} justifyContent="flex-start">
							<Skeleton variant="circular" width={50} height={50} />
							<Box sx={{ ml: 1.5 }}>
								<Skeleton variant="text" width={200} />
								<Skeleton variant="text" width={200} />
							</Box>
						</CustomStack>
						<CustomStack sx={{ p: 2.5 }} justifyContent="flex-start">
							<Skeleton variant="circular" width={50} height={50} />
							<Box sx={{ ml: 1.5 }}>
								<Skeleton variant="text" width={200} />
								<Skeleton variant="text" width={200} />
							</Box>
						</CustomStack>
					</>
				)}
				{isEmpty(users) && !isLoading && (
					<Typography sx={{ textAlign: "center" }}>
						Nu au fost găsiți utilizatori
					</Typography>
				)}
			</Paper>
		</Paper>
	);
}
