"use client";

import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ProductCard from "@/components/cutomized/ProductCard/ProductCard";
import NotFound from "@/components/cutomized/NotFound/NotFound";
import { UserProducts } from "@/ts/models/booking/product/Product";
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

	const handleNavigateToBooking = (productId: number | null) => {
		navigateTo(
			AppRoutes.booking(
				businessId,
				businessOwnerId,
				businessOwnerId,
				BookingSourceEnum.SEARCH_BUSINESS_PROFILE,
				productId
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
					<Stack
						direction="row"
						spacing={1}
						sx={{
							overflowX: "auto",
							pb: 1,
							"&::-webkit-scrollbar": { display: "none" },
						}}
					>
						{serviceGroups.map((group) => (
							<Button
								key={group.service.id}
								variant={
									activeGroup.service.id === group.service.id
										? "contained"
										: "outlined"
								}
								color={
									activeGroup.service.id === group.service.id
										? "primary"
										: "secondary"
								}
								size="small"
								disableElevation
								onClick={() => setActiveServiceId(group.service.id)}
								sx={{ flexShrink: 0, borderRadius: 50 }}
							>
								{group.service.short_name}
							</Button>
						))}
					</Stack>

					<Stack spacing={2} mt={2.5}>
						{activeGroup.products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								isSelected={false}
								showIcon={false}
								onOpenDetail={() => handleNavigateToBooking(product.id)}
								onAdd={() => {}}
								onNavigateToBooking={() => handleNavigateToBooking(product.id)}
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
