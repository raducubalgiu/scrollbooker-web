import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlaceholderActionBox from "@/components/core/PlaceholderActionBox/PlaceholderActionBox";
import { SelectedVariant } from "./createOwnClientTypes";
import SelectedServiceCard from "./SelectedServiceCard";

type CreateOwnClientServicesSectionProps = {
  selectedVariants: SelectedVariant[];
  onOpenSelect: () => void;
  onRemoveVariant: (variantId: number) => void;
};

const CreateOwnClientServicesSection = ({
  selectedVariants,
  onOpenSelect,
  onRemoveVariant,
}: CreateOwnClientServicesSectionProps) => {
  const hasSelection = selectedVariants.length > 0;

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={700}>
        2. Servicii
      </Typography>

      {hasSelection ? (
        <Stack spacing={1.5}>
          {selectedVariants.map((variant) => (
            <SelectedServiceCard
              key={variant.variantId}
              variant={variant}
              onRemove={() => onRemoveVariant(variant.variantId)}
            />
          ))}

          <Button
            startIcon={<AddRoundedIcon />}
            onClick={onOpenSelect}
            sx={{ justifyContent: "flex-start" }}
          >
            Adaugă alt serviciu
          </Button>
        </Stack>
      ) : (
        <PlaceholderActionBox
          description="Atașează unul sau mai multe servicii"
          onClick={onOpenSelect}
        />
      )}
    </Stack>
  );
};

export default CreateOwnClientServicesSection;
