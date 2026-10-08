import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { Product, ProductOffering } from "@/ts/models/booking/product/Product";
import {
  FormProductOffering,
  FormProductVariant,
} from "../AddProductModal/AddProductModal";
import { buildDefaultOfferings } from "../AddProductModal/buildDefaultOfferings";

export const buildEditFormOfferings = (
  realOfferings: ProductOffering[],
  hasEmployees: boolean,
  employees: BusinessEmployee[],
  ownerUserId: number
): FormProductOffering[] => {
  const roster = buildDefaultOfferings(hasEmployees, employees, ownerUserId);

  return roster.map((seat) => {
    const real = realOfferings.find((o) => o.user.id === seat.user_id);

    if (!real) {
      return { ...seat, is_offering: false };
    }

    return {
      user_id: seat.user_id,
      price: Number(real.price),
      price_with_discount: Number(real.price_with_discount),
      discount: Number(real.discount),
      is_offering: true,
    };
  });
};

export const buildEditFormVariants = (
  product: Product,
  hasEmployees: boolean,
  employees: BusinessEmployee[],
  ownerUserId: number
): FormProductVariant[] =>
  product.variants.map((v) => ({
    name: v.name,
    duration: v.duration,
    offerings: buildEditFormOfferings(
      v.offerings,
      hasEmployees,
      employees,
      ownerUserId
    ),
  }));
