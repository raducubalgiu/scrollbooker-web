import { Product } from "@/ts/models/booking/product/Product";
import { ProductFormValues } from "../AddProductModal/AddProductModal";

export const buildEditBaseInfoValues = (product: Product): ProductFormValues => ({
  serviceDomainId: String(product.service_domain_id),
  serviceId: String(product.service_id),
  name: product.name,
  description: product.description,
  variants: [],
  filters: product.filters.map((f) => ({
    filter_id: f.id,
    value: f.sub_filters.map((sf) => String(sf.id)),
  })),
});
