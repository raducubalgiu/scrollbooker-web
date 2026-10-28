import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { AppointmentProduct } from "@/ts/models/booking/appointment/Appointment";
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
      <Typography variant="h5" mt={4} mb={2.5} fontWeight={600}>
        Servicii rezervate
      </Typography>

      <Box
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Stack spacing={0}>
          {products.map((product, index) => {
            const { id, name, price_with_discount, price, discount } = product;
            const hasDiscount = discount > 0;

            return (
              <Box key={id}>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  gap={3}
                  sx={{ p: 2.5 }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      wordBreak: "break-word",
                      color: "text.primary",
                    }}
                  >
                    {name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="baseline"
                    justifyContent="flex-end"
                    sx={{
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      textAlign: "right",
                    }}
                  >
                    {hasDiscount && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: "line-through",
                            color: "text.disabled",
                          }}
                        >
                          {formatPrice(price)}
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight={600}
                          sx={{ color: "error.main" }}
                        >
                          (-{Number(discount).toFixed(0)}%)
                        </Typography>
                      </>
                    )}

                    <Typography variant="body2" fontWeight={600}>
                      {formatPrice(price_with_discount)} RON
                    </Typography>
                  </Stack>
                </Stack>
                {index < products.length - 1 && <Divider sx={{ mx: 2.5 }} />}
              </Box>
            );
          })}
        </Stack>

        <Divider sx={{ borderWidth: "1px", borderColor: "divider" }} />

        <Box
          sx={{
            p: 2.5,
            bgcolor: "action.hover",
          }}
        >
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            gap={3}
          >
            <Typography variant="h6" fontWeight={600} color="text.primary">
              Total de plată
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="baseline"
              justifyContent="flex-end"
              sx={{
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {totalDiscount > 0 && (
                <>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.disabled",
                    }}
                  >
                    {formatPrice(totalPrice)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "error.main", fontWeight: 700 }}
                  >
                    (-{Number(totalDiscount).toFixed(0)}%)
                  </Typography>
                </>
              )}

              <Typography variant="h5" fontWeight={700}>
                {formatPrice(totalPriceWithDiscount)} RON
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentDetailsProducts;
