import { ChangeEvent, useState } from "react";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { Product } from "@/ts/models/booking/product/Product";

export const useProductDetailState = (
  product: Product | null,
  onAdd: (item: SelectedBookingItem) => void,
  onClose: () => void
) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0]?.id || ""
  );

  const currentVariant = product?.variants.find(
    (v) => v.id === Number(selectedVariant)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedVariant(event.target.value);
  };

  const handleAddClick = () => {
    if (!product || !currentVariant) return;

    onAdd({
      productId: product.id,
      variantId: currentVariant.id,
      variantDuration: currentVariant.duration,
      offerings: currentVariant.offerings,
      productName: product.name,
      variantName: currentVariant.name,
    });
    onClose();
  };

  return { selectedVariant, currentVariant, handleChange, handleAddClick };
};
