import { Paper, Typography } from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import React from "react";
import UserCurrenciesItem from "./UserCurrenciesItem";
import { CurrencyType } from "@/ts/models/nomenclatures/CurrencyType";

type UserCurrenciesModuleProps = { currencies: CurrencyType[] };

export default function UserCurrenciesModule({
	currencies,
}: UserCurrenciesModuleProps) {
	return (
		<MainLayout title="Modalități de plată" hideAction>
			<Paper sx={{ p: 2.5 }}>
				<Typography mb={3.5} fontWeight={600}>
					Poți alege să primești comenzi în una sau mai multe din monedele de
					mai jos:
				</Typography>
				{currencies.map((curr, i) => (
					<UserCurrenciesItem key={i} currency={curr} />
				))}
			</Paper>
		</MainLayout>
	);
}
