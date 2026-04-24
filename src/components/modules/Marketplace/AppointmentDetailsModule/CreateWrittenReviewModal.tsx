import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Box, Rating, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type CreateWrittenReviewModalProps = {
  open: boolean;
  rating: number | null;
  isLoadingCreateReview: boolean;
  onClose: () => void;
  onCreateReview: (review: string, finalRating: number) => void;
};

const CreateWrittenReviewModal = ({
  open,
  rating,
  isLoadingCreateReview,
  onClose,
  onCreateReview,
}: CreateWrittenReviewModalProps) => {
  const [finalRating, setFinalRating] = useState(rating ?? 0);

  useEffect(() => {
    setFinalRating(rating ?? 0);
  }, [rating]);

  const methods = useForm({ defaultValues: { review: "" } });
  const { handleSubmit } = methods;

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(200);

  const actions: ActionButtonType[] = [
    {
      title: "Trimite",
      props: {
        onClick: handleSubmit((data) =>
          onCreateReview(data.review, finalRating)
        ),
        disabled: isLoadingCreateReview,
        loading: isLoadingCreateReview,
      },
    },
  ];

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
                value={finalRating}
                precision={1}
                sx={{
                  fontSize: "3rem",
                  "& .MuiRating-icon": {
                    marginRight: "8px",
                  },
                }}
                onChange={(_, v) => v && setFinalRating(v)}
              />
            )}

            <Typography color="text.secondary">
              {finalRating} din 5 • A fost ok
            </Typography>
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

            <Input
              name="review"
              multiline
              minRows={4}
              maxRows={4}
              fullWidth
              placeholder="Împărtășește câteva detalii (atmosferă, rezultate, comunicare..)"
              slotProps={{
                htmlInput: {
                  maxLength: 200,
                },
              }}
              sx={{
                mt: 1,
                "& .MuiInputBase-root": {
                  transition: "all 0.3s ease",
                  borderRadius: 5,
                },
              }}
              rules={{ ...isRequired, ...minLength, ...maxLength }}
            />
          </Box>
        </Stack>
      </Modal>
    </FormProvider>
  );
};

export default CreateWrittenReviewModal;
