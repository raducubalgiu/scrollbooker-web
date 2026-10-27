import {
  ProductUtils,
  ProductVariant,
} from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { ChangeEvent } from "react";

type ProductDetailVariantsOptionsProps = {
  variants: ProductVariant[];
  selectedVariantId: number | string;
  instantBooking: boolean;
  onHandleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ProductDetailVariantsOptions = ({
  variants,
  selectedVariantId,
  instantBooking,
  onHandleChange,
}: ProductDetailVariantsOptionsProps) => {
  return (
    <>
      <Typography variant="h5" fontWeight={600} mb={2.5}>
        Selectează o opțiune *
      </Typography>
      <RadioGroup value={selectedVariantId} onChange={onHandleChange}>
        {variants?.map((variant, index) => {
          const { starting_offering } = variant;

          return (
            <React.Fragment key={variant.id}>
              <FormControlLabel
                value={variant.id}
                label={
                  <Box>
                    <Stack mb={2} spacing={0.5}>
                      <Typography
                        fontSize={{ xs: "1rem", md: "1.25rem" }}
                        fontWeight={600}
                        noWrap
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {variant.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {ProductUtils.getDurationText(variant.duration)}
                      </Typography>
                    </Stack>

                    <Typography fontWeight={600}>
                      {variant.has_different_prices && "de la"}{" "}
                      {`${formatPrice(starting_offering.price_with_discount)} RON`}
                    </Typography>
                  </Box>
                }
                labelPlacement="start"
                control={
                  instantBooking ? <Radio sx={styles.radioStyles} /> : <></>
                }
                sx={styles.formControl}
              />

              {index < variants.length - 1 && <Divider sx={{ my: 2.5 }} />}
            </React.Fragment>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default ProductDetailVariantsOptions;

const styles = {
  radioStyles: {
    "& .MuiSvgIcon-root": { fontSize: { xs: 24, md: 32.5 } },
  },
  formControl: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
  },
};
