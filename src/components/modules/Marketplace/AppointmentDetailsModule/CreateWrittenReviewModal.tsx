import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import { reviewLabelText } from "@/ts/enums/ReviewLabel";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Box, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import EmojiPicker from "@/components/core/EmojiPicker/EmojiPicker";

type CreateWrittenReviewModalProps = {
  open: boolean;
  rating: number | null;
  isLoadingCreateReview: boolean;
  existingReviewText?: string;
  onClose: () => void;
  onCreateReview: (review: string, finalRating: number) => void;
};

const CreateWrittenReviewModal = ({
  open,
  rating,
  existingReviewText = "",
  isLoadingCreateReview,
  onClose,
  onCreateReview,
}: CreateWrittenReviewModalProps) => {
  const [finalRating, setFinalRating] = useState(rating ?? 0);

  useEffect(() => {
    setFinalRating(rating ?? 0);
  }, [rating]);

  const methods = useForm({ defaultValues: { review: existingReviewText } });
  const { handleSubmit, reset, setValue, getValues } = methods;

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(200);

  useEffect(() => {
    if (open) {
      setFinalRating(rating ?? 0);
      reset({ review: existingReviewText });
    }
  }, [open, rating, existingReviewText, reset]);

  const actions: ActionButtonType[] = [
    {
      title: "Trimite",
      props: {
        onClick: handleSubmit((data) => {
          onCreateReview(data.review, finalRating);
        }),
        disabled: isLoadingCreateReview,
        loading: isLoadingCreateReview,
      },
    },
  ];

  const handleEmojiClick = (emoji: string) => {
    const currentText = getValues("review") || "";
    setValue("review", currentText + emoji, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        handleClose={onClose}
        maxWidth="md"
        fullWidth
        actions={actions}
      >
        <Stack spacing={2}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            {finalRating && (
              <Rating
                name="custom-size-rating"
                precision={1}
                sx={{
                  fontSize: "3rem",
                  "& .MuiRating-icon": {
                    marginRight: "8px",
                  },
                }}
                value={finalRating}
                onChange={(_, newValue) => setFinalRating(newValue ?? 0)}
              />
            )}

            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Typography color="text.secondary">
                {finalRating} din 5
              </Typography>
              <Typography color="text.secondary">•</Typography>
              <Typography color="text.primary" fontWeight={600}>
                {reviewLabelText(finalRating)}
              </Typography>
            </Stack>
          </Stack>

          <Box>
            <Typography variant="h4" fontWeight={600}>
              Cum a fost experienta ta?
            </Typography>

            <Typography color="text.secondary">
              Recenzia ta ii ajuta pe altii sa faca alegeri potrivite, iar
              business-ul sa isi imbunatateasca serviciile.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" mb={1}>
              Recenzia ta
            </Typography>

            <Box
              sx={{
                bgcolor: "grey.100",
                borderRadius: 4,
                p: 1,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s ease",
              }}
            >
              <Input
                name="review"
                multiline
                minRows={4}
                maxRows={6}
                fullWidth
                placeholder="Împărtășește câteva detalii..."
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "transparent !important",
                    border: "none !important",
                    boxShadow: "none !important",
                    p: 1,
                    "&:hover, &.Mui-focused": {
                      bgcolor: "transparent !important",
                      border: "none !important",
                      boxShadow: "none !important",
                    },
                  },
                  "& .MuiInputBase-inputMultiline": {
                    p: 0,
                  },
                  "& fieldset": {
                    border: "none !important",
                  },
                }}
                rules={{ ...isRequired, ...minLength, ...maxLength }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  mt: 1,
                  pt: 0.5,
                }}
              >
                <EmojiPicker onEmojiSelect={handleEmojiClick} />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Modal>
    </FormProvider>
  );
};

export default CreateWrittenReviewModal;
