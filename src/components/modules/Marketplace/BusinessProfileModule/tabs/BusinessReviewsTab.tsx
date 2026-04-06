import RatingsStars from "@/components/cutomized/RatingsDistribution/RatingsStars";
import { reviewLabelText } from "@/ts/enums/ReviewLabel";
import { BusinessProfileReviews } from "@/ts/models/booking/business/BusinessProfile";
import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

type BusinessReviewsTabProps = {
  id: string;
  innerRef: (element: HTMLDivElement | null) => void;
  reviews: BusinessProfileReviews;
};

const BusinessReviewsTab = ({
  id,
  innerRef,
  reviews,
}: BusinessReviewsTabProps) => {
  console.log("REVIEWS", reviews);

  return (
    <Box id={id} ref={innerRef}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Recenzii
      </Typography>

      <Box mb={5}>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            5,0
          </Typography>
          <RatingsStars rating={4.5} starSize={35} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            (2)
          </Typography>
        </Stack>
      </Box>

      {reviews.total === 0 && (
        <Typography sx={{ color: "text.secondary" }}>
          Momentan nu au fost adaugate recenzii
        </Typography>
      )}

      {reviews.total > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: {
              xs: "2px",
              sm: "4px",
              md: 2,
              lg: 10,
            },
          }}
        >
          {reviews.data.map((r) => {
            return (
              <Box key={r.id}>
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Avatar
                    src={r.reviewer.avatar ?? ""}
                    alt=""
                    sx={{ width: 85, height: 85 }}
                  />

                  <Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {r.reviewer.fullname}
                    </Typography>
                    <Typography color="text.secondary">
                      {r.created_at}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography fontWeight={600} sx={{ my: 2.5 }} variant="h6">
                  {reviewLabelText(r.rating)}
                </Typography>

                <Rating
                  readOnly
                  value={r.rating}
                  size="medium"
                  sx={{ color: "primary.main" }}
                />

                <Typography mt={1}>{r.review}</Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default memo(BusinessReviewsTab);
