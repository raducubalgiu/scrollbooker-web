"use client";

import { useState, useMemo } from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import React, { memo } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import ServiceCategoryTabs from "@/components/cutomized/ProductCard/ServiceCategoryTabs";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import ErrorMessage from "@/components/cutomized/NotFound/ErrorMessage";
import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";

const PRODUCTS_LIMIT_PER_SERVICE = 5;

type ProfileProductsTabProps = {
  businessId: number | null;
  businessOwnerId: number | undefined;
  userId: number;
};

const ProfileProductsTab = ({
  businessId,
  businessOwnerId,
  userId,
}: ProfileProductsTabProps) => {
  const { navigateTo } = useAppNavigation();
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  const employeeId =
    businessOwnerId !== undefined && businessOwnerId !== userId
      ? userId
      : null;

  const { data: userProducts, isLoading, isError } =
    useGetProductsByBusinessAndEmployee({
      businessId: businessId ?? 0,
      employeeId,
      onlyServicesWithProducts: true,
      productsLimitPerService: PRODUCTS_LIMIT_PER_SERVICE,
    });

  const serviceGroups = useMemo(
    () => userProducts?.data ?? [],
    [userProducts]
  );

  const activeGroup =
    serviceGroups.find((group) => group.service.id === activeServiceId) ??
    serviceGroups[0];

  const handleNavigateToBooking = (product: Product) => {
    navigateTo(
      AppRoutes.booking(
        product.business_id,
        product.business_owner_id,
        ProductUtils.getTargetUserId(product),
        BookingSourceEnum.PROFILE,
        product.id
      )
    );
  };

  if (!businessId) {
    return (
      <NotFound
        icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 50 }} />}
        title="Servicii"
        description="Nu au fost găsite servicii"
      />
    );
  }

  if (isLoading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 10, width: "100%" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (isError) {
    return <ErrorMessage resource="servicii" />;
  }

  return (
    <Box sx={{ px: { xs: 2.5, lg: 0 } }}>
      {!userProducts || userProducts.total_count === 0 || !activeGroup ? (
        <NotFound
          icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 50 }} />}
          title="Servicii"
          description="Nu au fost găsite servicii"
        />
      ) : (
        <Box sx={{ maxWidth: "md", pt: 2.5 }}>
          <ServiceCategoryTabs
            serviceGroups={serviceGroups}
            activeServiceId={activeGroup.service.id}
            onSelect={setActiveServiceId}
          />

          <Stack spacing={2} mt={2.5}>
            {activeGroup.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={false}
                showIcon={false}
                expandDescriptionOnClick
                onAdd={() => {}}
                onNavigateToBooking={() => handleNavigateToBooking(product)}
              />
            ))}
          </Stack>

          {serviceGroups.length * PRODUCTS_LIMIT_PER_SERVICE <
            userProducts.total_count && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              disableElevation
              sx={{ mt: 2.5 }}
            >
              Vezi toate cele {userProducts.total_count} servicii
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default memo(ProfileProductsTab);
