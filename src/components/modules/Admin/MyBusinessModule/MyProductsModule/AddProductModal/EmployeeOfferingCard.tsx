import Input from "@/components/core/Input/Input";
import { max, min, required } from "@/utils/validation-rules";
import { formatPrice } from "@/utils/formatPrice";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import OfferingToggle from "./OfferingToggle";

type EmployeeOfferingCardProps = {
  employee: BusinessEmployee | undefined;
  index: number;
  empIndex: number;
};

const EmployeeOfferingCard = ({
  employee,
  index,
  empIndex,
}: EmployeeOfferingCardProps) => {
  const { control, setValue, clearErrors } = useFormContext();

  const isRequired = required({ isNumber: true });
  const minDiscount = min(0);
  const maxDiscount = max(100);

  const priceName = `variants.${index}.offerings.${empIndex}.price`;
  const discountName = `variants.${index}.offerings.${empIndex}.discount`;
  const finalPriceName = `variants.${index}.offerings.${empIndex}.price_with_discount`;
  const isOfferingName = `variants.${index}.offerings.${empIndex}.is_offering`;

  const isOffering = useWatch({ control, name: isOfferingName });
  const priceValue = useWatch({ control, name: priceName });
  const discountValue = useWatch({ control, name: discountName });

  const [expanded, setExpanded] = useState(!!isOffering);

  const numericPrice = parseFloat(priceValue) || 0;
  const numericDiscount = parseFloat(discountValue) || 0;
  const safeDiscount = Math.min(Math.max(numericDiscount, 0), 100);
  const calculatedPriceWithDiscount =
    numericPrice - (numericPrice * safeDiscount) / 100;

  useEffect(() => {
    if (!isOffering) {
      clearErrors([priceName, discountName, finalPriceName]);
      setValue(priceName, 0);
      setValue(discountName, 0);
      setValue(finalPriceName, 0);
      return;
    }

    if (numericPrice > 0) {
      setValue(
        finalPriceName,
        parseFloat(calculatedPriceWithDiscount.toFixed(2)),
        { shouldValidate: true, shouldDirty: true }
      );
    } else {
      setValue(finalPriceName, 0);
    }
  }, [
    isOffering,
    numericPrice,
    safeDiscount,
    calculatedPriceWithDiscount,
    priceName,
    discountName,
    finalPriceName,
    setValue,
    clearErrors,
  ]);

  const handleToggleOffering = () => {
    const next = !isOffering;
    setValue(isOfferingName, next, { shouldDirty: true });
    setExpanded(next);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, next) => setExpanded(next)}
      sx={styles.container(!!isOffering)}
    >
      <AccordionSummary component="div" sx={styles.summary}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            minWidth={0}
            sx={{ opacity: isOffering ? 1 : 0.6, transition: "all 0.2s ease" }}
          >
            <Avatar
              src={employee?.avatar ?? ""}
              sx={{ width: 40, height: 40 }}
            />
            <Box minWidth={0}>
              <Typography fontWeight="700" noWrap>
                {employee?.fullname}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {employee?.job}
              </Typography>
            </Box>
          </Stack>

          <OfferingToggle
            isOffering={!!isOffering}
            onToggle={handleToggleOffering}
          />
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={styles.details}>
        {isOffering ? (
          <>
            <Stack direction="row" spacing={2}>
              <Input
                size="small"
                name={priceName}
                label="Preț standard"
                type="number"
                rules={{ ...isRequired }}
              />
              <Input
                size="small"
                name={discountName}
                label="Discount %"
                type="number"
                rules={{ ...minDiscount, ...maxDiscount }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              Preț final:{" "}
              <Typography
                component="span"
                fontWeight="700"
                color="text.primary"
              >
                {`${formatPrice(calculatedPriceWithDiscount)} RON`}
              </Typography>
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nu oferă serviciul respectiv
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default EmployeeOfferingCard;

const styles = {
  container: (isOffering: boolean) => ({
    borderRadius: "12px !important",
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: isOffering ? "background.default" : "action.hover",
    transition: "all 0.2s ease",
    "&:before": { display: "none" },
    boxShadow: "none",
  }),
  summary: {
    py: 0.5,
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
      minWidth: 0,
    },
  },
  details: {
    bgcolor: "background.default",
    borderTop: "1px solid",
    borderColor: "divider",
    pt: 2,
  },
};
