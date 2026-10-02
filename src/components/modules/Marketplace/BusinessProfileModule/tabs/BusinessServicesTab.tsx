"use client";

import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import ServiceCategoryTabs from "@/components/cutomized/ProductCard/ServiceCategoryTabs";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { Product, ProductUtils, UserProducts } from "@/ts/models/booking/product/Product";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";

// Backend-ul limitează la 3 produse per categorie pentru acest profil
// (get_business_profile_by_owner_username → products_limit_per_service=3)
// — "vezi toate serviciile" apare doar când există mai mult decât ce s-ar
// putea arăta cu limita asta (nr. de categorii * 3).
const PRODUCTS_LIMIT_PER_SERVICE = 3;

type BusinessServicesTabProps = {
	id: string;
	innerRef: (element: HTMLDivElement | null) => void;
	userProducts: UserProducts;
	businessId: number;
	businessOwnerId: number;
};

const BusinessServicesTab = ({
	id,
	innerRef,
	userProducts,
	businessId,
	businessOwnerId,
}: BusinessServicesTabProps) => {
	const { navigateTo } = useAppNavigation();
	const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

	const serviceGroups = userProducts.data;
	const activeGroup =
		serviceGroups.find((group) => group.service.id === activeServiceId) ??
		serviceGroups[0];

	const handleNavigateToBooking = (product: Product | null) => {
		const targetUserId = product
			? ProductUtils.getTargetUserId(product)
			: businessOwnerId;

		navigateTo(
			AppRoutes.booking(
				businessId,
				businessOwnerId,
				targetUserId,
				BookingSourceEnum.SEARCH_BUSINESS_PROFILE,
				product?.id ?? null
			)
		);
	};

	const hasMoreServices =
		serviceGroups.length * PRODUCTS_LIMIT_PER_SERVICE < userProducts.total_count;

	return (
		<Box id={id} ref={innerRef}>
			<Typography variant="h3" gutterBottom>
				Servicii
			</Typography>

			{userProducts.total_count === 0 || !activeGroup ? (
				<NotFound
					icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 50 }} />}
					title="Servicii"
					description="Nu au fost găsite servicii"
				/>
			) : (
				<>
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
								onOpenDetail={() => handleNavigateToBooking(product)}
								onAdd={() => {}}
								onNavigateToBooking={() => handleNavigateToBooking(product)}
							/>
						))}
					</Stack>

					{hasMoreServices && (
						<Button
							variant="outlined"
							color="secondary"
							fullWidth
							disableElevation
							sx={{ mt: 2.5 }}
							onClick={() => handleNavigateToBooking(null)}
						>
							Vezi toate cele {userProducts.total_count} servicii
						</Button>
					)}
				</>
			)}
		</Box>
	);
};

export default memo(BusinessServicesTab);
