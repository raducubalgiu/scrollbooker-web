import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { FormProductOffering } from "./AddProductModal";

export const buildDefaultOfferings = (
  hasEmployees: boolean,
  employees: BusinessEmployee[],
  ownerUserId: number
): FormProductOffering[] =>
  hasEmployees
    ? employees.map((emp) => ({
        user_id: emp.id,
        price: 0,
        price_with_discount: 0,
        discount: 0,
        is_offering: false,
      }))
    : [
        {
          user_id: ownerUserId,
          price: 0,
          price_with_discount: 0,
          discount: 0,
          is_offering: true,
        },
      ];
