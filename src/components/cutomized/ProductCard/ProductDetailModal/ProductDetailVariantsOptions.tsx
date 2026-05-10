import {
  ProductUtils,
  ProductVariant,
} from "@/ts/models/booking/product/Product";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { minBy } from "lodash";
import React, { ChangeEvent } from "react";

type ProductDetailVariantsOptionsProps = {
  variants: ProductVariant[];
  selectedVariantId: number | string;
  onHandleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ProductDetailVariantsOptions = ({
  variants,
  selectedVariantId,
  onHandleChange,
}: ProductDetailVariantsOptionsProps) => {
  return (
    <>
      <Typography variant="h4" fontWeight={600} mb={2.5}>
        Selectează o opțiune *
      </Typography>
      <RadioGroup value={selectedVariantId} onChange={onHandleChange}>
        {variants?.map((variant, index) => {
          const minOffering = minBy(variant.offerings, "price_with_discount");
          const lowestPrice = minOffering?.price_with_discount;

          return (
            <React.Fragment key={variant.id}>
              <FormControlLabel
                value={variant.id}
                label={
                  <Box>
                    <Stack mb={2} spacing={0.5}>
                      <Typography
                        fontSize={20}
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

                    <Typography variant="h5">{lowestPrice} RON</Typography>
                  </Box>
                }
                labelPlacement="start"
                control={<Radio sx={styles.radioStyles} />}
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
    "& .MuiSvgIcon-root": { fontSize: 32.5 },
  },
  formControl: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
  },
};
