import React from "react";
import { AppointmentProduct } from "@/ts/models/booking/appointment/Appointment";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { formatPrice } from "@/utils/formatPrice";

type AppointmentDetailsProductsProps = {
  products: AppointmentProduct[];
  totalPriceWithDiscount: number;
  totalPrice: number;
  totalDiscount: number;
};

const AppointmentDetailsProducts = ({
  products,
  totalPriceWithDiscount,
  totalPrice,
  totalDiscount,
}: AppointmentDetailsProductsProps) => {
  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2.5} fontWeight={600}>
        Servicii rezervate:
      </Typography>

      {products.map((product) => {
        const { id, name, price_with_discount, price, discount } = product;

        return (
          <Box key={id}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" color="text.secondary">
                {name}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                alignItems="baseline"
              >
                <Typography fontWeight={600}>
                  {formatPrice(price_with_discount)} RON
                </Typography>

                {discount > 0 && (
                  <>
                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "text.disabled",
                      }}
                    >
                      {formatPrice(price)}
                    </Typography>
                    <Typography sx={{ color: "error.main", fontWeight: 600 }}>
                      (-{Number(discount).toFixed(2)}%)
                    </Typography>
                  </>
                )}
              </Stack>
            </Stack>

            <Divider sx={{ my: 1.5 }} />
          </Box>
        );
      })}

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" color="text.secondary">
          Total
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="baseline"
        >
          <Typography fontWeight={600}>
            {formatPrice(totalPriceWithDiscount)} RON
          </Typography>
          {totalDiscount > 0 && (
            <>
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                }}
              >
                {formatPrice(totalPrice)}
              </Typography>
              <Typography sx={{ color: "error.main", fontWeight: 600 }}>
                (-{Number(totalDiscount).toFixed(2)}%)
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AppointmentDetailsProducts;
