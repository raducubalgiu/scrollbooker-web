"use client";

import React, { useState } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CustomStack from "../../CustomStack/CustomStack";
import UserInfoCounter from "./UserInfoCounter";
import UserAvatar from "./UserAvatar";
import { UserInfoType } from "@/models/UserInfoType";
import UserInfoEditModal from "./UserInfoEditModal";
import { useCustomQuery } from "@/hooks/useHttp";

const styles = { username: { mt: 2.5, fontSize: 18, fontWeight: "700" } };

export default function UserInfo() {
	const [openModal, setOpenModal] = useState(false);

	const {
		data: user,
		isLoading,
		refetch: refetchUserData,
	} = useCustomQuery<UserInfoType>({
		key: ["user-info"],
		url: "/api/auth/user-info",
	});

	const { profession, counters, avatar, username } = user ?? {};

	const userProfession = (
		<>
			<Typography sx={{ fontSize: 16 }}>{profession}</Typography>
			<StarIcon color="primary" sx={{ ml: 1.5, mr: 0.5 }} />
			<Typography sx={{ fontWeight: "600" }}>
				{counters?.ratings_average}
			</Typography>
		</>
	);

	return (
		<>
			<UserInfoEditModal
				user={user}
				open={openModal}
				handleClose={() => setOpenModal(false)}
				refetchUserData={refetchUserData}
			/>
			<Stack alignItems="center" justifyContent="center" sx={{ my: 5 }}>
				<UserAvatar url={avatar} onOpenModal={() => setOpenModal(true)} />
				<Typography sx={styles.username}>
					{isLoading ? <Skeleton width={100} /> : `@${username}`}
				</Typography>
				<CustomStack sx={{ mt: 1 }}>
					{isLoading ? <Skeleton width={150} /> : userProfession}
				</CustomStack>
				<CustomStack sx={{ mt: 5 }}>
					<UserInfoCounter
						label="Urmaritori"
						counter={counters?.followers_count}
						isLoading={isLoading}
					/>
					<UserInfoCounter
						label="Urmaresti"
						counter={counters?.followings_count}
						isLoading={isLoading}
						sx={{ mx: 2.5 }}
					/>
					<UserInfoCounter
						label="Recenzii"
						counter={counters?.ratings_count}
						isLoading={isLoading}
					/>
				</CustomStack>
			</Stack>
		</>
	);
}
