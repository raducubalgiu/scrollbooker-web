import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UserCurrenciesModule from "@/components/modules/UserCurrenciesModule/UserCurrenciesModule";
import { get } from "@/utils/requests";
import { CurrencyType } from "@/models/nomenclatures/CurrencyType";

async function Currencies() {
	const response = (
		await get<CurrencyType[]>({
			url: `/currencies`,
		})
	).data;

	return <UserCurrenciesModule currencies={response} />;
}

export default ProtectedPage(Currencies, "USER_CURRENCIES_VIEW");
