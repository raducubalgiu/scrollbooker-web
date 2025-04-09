"use client";

import React, { useEffect, useState } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CustomStack from "../../CustomStack/CustomStack";
import UserInfoCounter from "./UserInfoCounter";
import UserAvatar from "./UserAvatar";
import { UserInfoType } from "@/models/UserInfoType";
import UserInfoEditModal from "./UserInfoEditModal";
import { FormProvider, useForm } from "react-hook-form";
import { useMutate } from "@/hooks/useHttp";

const styles = { username: { mt: 2.5, fontSize: 18, fontWeight: "700" } };

export default function UserInfo() {
	const [openModal, setOpenModal] = useState(false);
	const methods = useForm<{ data: UserInfoType | null }>({
		defaultValues: { data: null },
	});
	const { setValue, watch } = methods;
	const { profession, counters, avatar, username } = watch().data || {};

	const { mutate: fetchUserInfo, isPending } = useMutate<
		undefined,
		UserInfoType
	>({
		key: ["user-info"],
		url: "/api/auth/user-info",
		method: "GET",
		options: {
			onSuccess: response => setValue("data", response),
		},
	});

	useEffect(() => {
		fetchUserInfo(undefined);
	}, [fetchUserInfo]);

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
		<FormProvider {...methods}>
			<UserInfoEditModal
				open={openModal}
				handleClose={() => setOpenModal(false)}
			/>
			<Stack alignItems="center" justifyContent="center" sx={{ my: 5 }}>
				<UserAvatar url={avatar} onOpenModal={() => setOpenModal(true)} />
				<Typography sx={styles.username}>
					{!username || isPending ? <Skeleton width={100} /> : `@${username}`}
				</Typography>
				<CustomStack sx={{ mt: 1 }}>
					{!profession || isPending ? <Skeleton width={150} /> : userProfession}
				</CustomStack>
				<CustomStack sx={{ mt: 5 }}>
					<UserInfoCounter
						label="Urmaritori"
						counter={counters?.followers_count}
						isLoading={!counters || isPending}
					/>
					<UserInfoCounter
						label="Urmaresti"
						counter={counters?.followings_count}
						isLoading={!counters || isPending}
						sx={{ mx: 2.5 }}
					/>
					<UserInfoCounter
						label="Recenzii"
						counter={counters?.ratings_count}
						isLoading={!counters || isPending}
					/>
				</CustomStack>
			</Stack>
		</FormProvider>
	);
}
