export type SelectedVariant = {
  productId: number;
  productName: string;
  variantId: number;
  variantName: string;
  duration: number;
  priceWithDiscount: number;
};

export type SelectedSlot = {
  startUtc: string;
  endUtc: string;
  startLocale: string;
  endLocale: string;
};
