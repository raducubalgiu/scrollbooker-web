"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
	Checkbox,
	Typography,
	CircularProgress,
	Skeleton,
} from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { find } from "lodash";
import { CurrencyType } from "@/ts/models/nomenclatures/CurrencyType";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { toast } from "react-toastify";

type UserCurrenciesItemProps = { currency: CurrencyType };

export default function UserCurrenciesItem({
	currency,
}: UserCurrenciesItemProps) {
	const [checked, setChecked] = useState(false);

	const {
		data: userCurrencies,
		isLoading,
		refetch,
	} = useCustomQuery({
		key: ["user-currencies"],
		url: "/api/user-currencies",
	});

	const { mutateAsync: handleAttach } = useMutate({
		key: ["attach-currency"],
		url: "/api/user-currencies",
		options: {
			onSuccess: () => toast.success("Moneda a fost adăugată cu succes"),
		},
	});

	const { mutateAsync: handleDetach } = useMutate({
		key: ["detach-currency"],
		url: "/api/user-currencies",
		method: "PUT",
		options: {
			onSuccess: () => toast.success("Moneda a fost eliminată cu succes"),
		},
	});

	useEffect(() => {
		if (userCurrencies) {
			const isPresent = !!find(userCurrencies ?? [], ["id", currency.id]);
			setChecked(isPresent);
		}
	}, [currency.id, userCurrencies]);

	const handleCheckbox = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.checked) {
				await handleAttach({ currencyId: currency.id });
			} else {
				await handleDetach({ currencyId: currency.id });
			}

			refetch();
		},
		[currency.id, handleAttach, handleDetach, refetch]
	);

	const skeleton = (
		<CustomStack justifyContent="flex-start" sx={{ mb: 3.5, ml: 1 }}>
			<Skeleton width={20} height={33.5} sx={{ mr: 1.5 }} />
			<Skeleton width={30} height={33.5} />
		</CustomStack>
	);

	return (
		<>
			{isLoading ? (
				skeleton
			) : (
				<CustomStack justifyContent="flex-start" sx={{ mb: 2.5 }}>
					{isLoading && <CircularProgress size={17.5} />}
					<Checkbox checked={checked} onChange={handleCheckbox} />
					<Typography>{currency?.name}</Typography>
				</CustomStack>
			)}
		</>
	);
}
