import CurrenciesModule from "@/components/modules/Admin/Nomenclatures/CurrenciesModule/CurrenciesModule";
import { Currency } from "@/ts/models/nomenclatures/currency/Currency";
import { get } from "@/utils/requests";
import { JSX } from "react";

export default async function Currencies(): Promise<JSX.Element> {
  const response = await get<Currency[]>({
    url: "/currencies",
  });

  const initialData = response?.data || [];

  return <CurrenciesModule initialData={initialData} />;
}
