export type SelectedVariant = {
  productId: number;
  productName: string;
  variantId: number;
  variantName: string;
  duration: number;
  filtersSummary: string;
  priceWithDiscount: number;
  price: number;
  discount: number;
};

export type SelectedSlot = {
  startUtc: string;
  endUtc: string;
  startLocale: string;
  endLocale: string;
};
