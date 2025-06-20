import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UserCurrenciesModule from "@/components/modules/UserCurrenciesModule/UserCurrenciesModule";
import { get } from "@/utils/requests";
import { CurrencyType } from "@/models/nomenclatures/CurrencyType";
import { PermissionEnum } from "@/models/enums/PermissionsEnum";

async function Currencies() {
	const response = (
		await get<CurrencyType[]>({
			url: `/currencies`,
		})
	).data;

	return <UserCurrenciesModule currencies={response} />;
}

export default ProtectedPage(Currencies, PermissionEnum.MY_CURRENCIES_VIEW);
