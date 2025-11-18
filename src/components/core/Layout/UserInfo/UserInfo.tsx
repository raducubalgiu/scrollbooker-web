"use client";

import React, { useState } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CustomStack from "../../CustomStack/CustomStack";
import UserInfoCounter from "./UserInfoCounter";
import UserAvatar from "./UserAvatar";
import UserInfoEditModal from "./UserInfoEditModal";
import { UseQueryResult } from "@tanstack/react-query";
import { UserProfileType } from "@/ts/models/User/UserProfileType";

const styles = { username: { mt: 2.5, fontSize: 18, fontWeight: "700" } };

type UserInfoProps = {
	user: UserProfileType | undefined;
	isLoadingUser: boolean;
	refetchUser: () => Promise<UseQueryResult<UserProfileType, unknown>>;
};

export default function UserInfo({
	user,
	isLoadingUser,
	refetchUser,
}: UserInfoProps) {
	const [openModal, setOpenModal] = useState(false);
	const { profession, counters, avatar, username, is_business_or_employee } = user ?? {};

	const userProfession = (
		<>
			<Typography sx={{ fontSize: 16 }}>{profession}</Typography>
			{is_business_or_employee && (
				<>
					<StarIcon color="primary" sx={{ ml: 1.5, mr: 0.5 }} />
					<Typography sx={{ fontWeight: "600" }}>
						{counters?.ratings_average}
					</Typography>
				</>
			)}
		</>
	);

	return (
		<>
			<UserInfoEditModal
				user={user}
				open={openModal}
				handleClose={() => setOpenModal(false)}
				refetchUserData={refetchUser}
			/>
			<Stack alignItems="center" justifyContent="center" sx={{ my: 5 }}>
				<UserAvatar url={avatar} onOpenModal={() => setOpenModal(true)} />
				<Typography sx={styles.username}>
					{isLoadingUser ? <Skeleton width={100} /> : `@${username}`}
				</Typography>
				<CustomStack sx={{ mt: 1 }}>
					{isLoadingUser ? <Skeleton width={150} /> : userProfession}
				</CustomStack>
				<CustomStack sx={{ mt: 5 }}>
					<UserInfoCounter
						label="Urmărești"
						counter={counters?.followings_count}
						isLoading={isLoadingUser}
					/>
					<UserInfoCounter
						label="Urmăritori"
						counter={counters?.followers_count}
						isLoading={isLoadingUser}
						sx={{ mx: 2.5 }}
					/>
					<UserInfoCounter
						label="Recenzii"
						counter={counters?.ratings_count}
						isLoading={isLoadingUser}
					/>
				</CustomStack>
			</Stack>
		</>
	);
}
