import CurrenciesModule from "@/components/modules/Admin/Nomenclatures/CurrenciesModule/CurrenciesModule";
import { Currency } from "@/ts/models/nomenclatures/currency/Currency";
import { get } from "@/utils/requests";

export default async function Currencies() {
  const response = await get<Currency[]>({
    url: "/currencies",
  });

  const initialData = response?.data || [];

  return <CurrenciesModule initialData={initialData} />;
}
