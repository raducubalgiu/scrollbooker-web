import { Product, ProductVariant } from "@/ts/models/booking/product/Product";
import { SelectedBookingItem } from "./BookingModule";

export const toSelectedBookingItem = (
  product: Product,
  variant: ProductVariant
): SelectedBookingItem => ({
  productId: product.id,
  variantId: variant.id,
  variantDuration: variant.duration,
  offerings: variant.offerings,
  productName: product.name,
  variantName: variant.name,
});
