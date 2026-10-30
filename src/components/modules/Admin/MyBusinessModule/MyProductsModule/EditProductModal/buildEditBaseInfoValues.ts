import { Product } from "@/ts/models/booking/product/Product";
import { ProductFormValues } from "../AddProductModal/AddProductModal";
import { toCalendarColor } from "@/ts/enums/CalendarColorEnum";

export const buildEditBaseInfoValues = (product: Product): ProductFormValues => ({
  serviceDomainId: String(product.service_domain_id),
  serviceId: String(product.service_id),
  name: product.name,
  description: product.description,
  color: toCalendarColor(product.color),
  variants: [],
  filters: product.filters.map((f) => ({
    filter_id: f.id,
    value: f.sub_filters.map((sf) => String(sf.id)),
  })),
});
