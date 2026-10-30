import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PlaceholderActionBox from "@/components/core/PlaceholderActionBox/PlaceholderActionBox";
import { SelectedVariant } from "../createOwnClientTypes";
import SelectedServiceCard from "./SelectedServiceCard";

type CreateOwnClientServicesSectionProps = {
  step: number;
  selectedVariants: SelectedVariant[];
  onOpenSelect: () => void;
  onRemoveVariant: (variantId: number) => void;
  disabledMessage?: string | null;
};

const CreateOwnClientServicesSection = ({
  step,
  selectedVariants,
  onOpenSelect,
  onRemoveVariant,
  disabledMessage = null,
}: CreateOwnClientServicesSectionProps) => {
  const hasSelection = selectedVariants.length > 0;

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          {step}. Servicii
        </Typography>

        <Button
          size="small"
          startIcon={hasSelection ? <EditOutlinedIcon /> : <AddRoundedIcon />}
          disabled={!!disabledMessage}
          onClick={onOpenSelect}
        >
          {hasSelection ? "Modifică servicii" : "Adaugă serviciile"}
        </Button>
      </Stack>

      {hasSelection ? (
        <Stack spacing={1.5}>
          {selectedVariants.map((variant) => (
            <SelectedServiceCard
              key={variant.variantId}
              variant={variant}
              onRemove={() => onRemoveVariant(variant.variantId)}
            />
          ))}
        </Stack>
      ) : disabledMessage ? (
        <Typography variant="body2" color="text.secondary" sx={styles.disabled}>
          {disabledMessage}
        </Typography>
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

const styles = {
  disabled: {
    border: 1,
    borderStyle: "dashed",
    borderColor: "divider",
    borderRadius: 3,
    px: 2,
    py: 2.5,
    textAlign: "center",
  },
};
