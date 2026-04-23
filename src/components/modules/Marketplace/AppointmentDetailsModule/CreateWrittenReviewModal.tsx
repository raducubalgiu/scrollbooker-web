import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Box, Rating, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type CreateWrittenReviewModalProps = {
  open: boolean;
  rating: number | undefined;
  onClose: () => void;
};

const CreateWrittenReviewModal = ({
  open,
  rating,
  onClose,
}: CreateWrittenReviewModalProps) => {
  const [finalRating, setFinalRating] = useState(rating ?? 0);

  useEffect(() => {
    setFinalRating(rating ?? 0);
  }, [rating]);

  const actions: ActionButtonType[] = [
    {
      title: "Trimite",
    },
  ];

  return (
    <Modal
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      actions={actions}
    >
      <Stack spacing={2}>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {rating && (
            <Rating
              name="custom-size-rating"
              defaultValue={rating}
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
            {rating} din 5 • A fost ok
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

          <TextField
            value=""
            onChange={() => {}}
            multiline
            minRows={4}
            maxRows={4}
            placeholder="Impartaseste cateva idei (atmosfera, rezultate, comunicare..)"
            fullWidth
          />
        </Box>
      </Stack>
    </Modal>
  );
};

export default CreateWrittenReviewModal;
