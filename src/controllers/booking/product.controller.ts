import { LinkedProducts } from "@/ts/models/booking/product/LinkedProducts";
import {
  Product,
  ProductWithFiltersCreate,
  UserProducts,
} from "@/ts/models/booking/product/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type GetLinkedProductsParams = {
  postId: number | null;
  lat?: number | null;
  lng?: number | null;
  isEnabled: boolean;
};

export const useGetLinkedProductsByPostId = ({
  postId,
  lat,
  lng,
  isEnabled,
}: GetLinkedProductsParams) => {
  const doRequest = () => {
    const hasCoords =
      lat !== undefined && lat !== null && lng !== undefined && lng !== null;
    const queryString = hasCoords ? `?lat=${lat}&lng=${lng}` : "";

    return axios
      .get<LinkedProducts>(
        `/api/protected/posts/${postId}/products${queryString}`
      )
      .then((response) => response.data);
  };

  return useQuery({
    queryKey: ["linked-products", postId, lat, lng],
    queryFn: doRequest,
    enabled: Boolean(postId) && isEnabled,
  });
};

export type GetProductsByBusinessAndEmployeeParams = {
  businessId: number;
  employeeId?: number | null;
  onlyServicesWithProducts: boolean;
  productsLimitPerService?: number | null;
};

export const useGetProductsByBusinessAndEmployee = ({
  businessId,
  employeeId,
  onlyServicesWithProducts,
  productsLimitPerService,
}: GetProductsByBusinessAndEmployeeParams) => {
  const doRequest = () => {
    const searchParams = new URLSearchParams({
      only_services_with_products: String(onlyServicesWithProducts),
    });

    if (employeeId !== undefined && employeeId !== null) {
      searchParams.append("employee_id", String(employeeId));
    }

    if (
      productsLimitPerService !== undefined &&
      productsLimitPerService !== null
    ) {
      searchParams.append(
        "products_limit_per_service",
        String(productsLimitPerService)
      );
    }

    return axios
      .get<UserProducts>(
        `/api/protected/businesses/${businessId}/products?${searchParams.toString()}`
      )
      .then((response) => response.data);
  };

  return useQuery({
    queryKey: [
      "business-employee-products",
      businessId,
      employeeId,
      onlyServicesWithProducts,
      productsLimitPerService,
    ],
    queryFn: doRequest,
    enabled: !!businessId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const doRequest = (
    payload: ProductWithFiltersCreate
  ): Promise<Product> =>
    axios
      .post("/api/protected/products", payload)
      .then((res) => res.data);

  return useMutation<Product, Error, ProductWithFiltersCreate>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-employee-products"],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const doRequest = (productId: number): Promise<void> =>
    axios
      .delete(`/api/protected/products/${productId}`)
      .then((res) => res.data);

  return useMutation<void, Error, number>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["business-employee-products"],
      });
    },
  });
};
