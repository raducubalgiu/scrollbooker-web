import RatingsStars from "@/components/cutomized/RatingsDistribution/RatingsStars";
import { reviewLabelText } from "@/ts/enums/ReviewLabel";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useMemo } from "react";
import { Review } from "@/ts/models/booking/review/Review";
import dayjs from "dayjs";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const {
    customer,
    created_at,
    rating,
    is_liked,
    is_liked_by_product_owner,
    like_count,
  } = review;

  const likeButton = useMemo(() => {
    return (
      <IconButton size="small">
        {is_liked ? <FavoriteIcon color={"error"} /> : <FavoriteBorderIcon />}
      </IconButton>
    );
  }, [is_liked]);

  return (
    <Box
      sx={{
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        bgcolor: "secondary.main",
        mb: 2.5,
        borderRadius: 5,
      }}
    >
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Avatar
          src={review.customer.avatar ?? ""}
          sx={{ width: 70, height: 70 }}
        />

        <Box>
          <Typography variant="h6" fontWeight={600}>
            {customer.fullname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {dayjs(created_at).format("DD MMMM YYYY HH:mm")}
          </Typography>
        </Box>
      </Stack>

      <Typography fontWeight={600}>{reviewLabelText(rating)}</Typography>

      <Stack direction="row" alignItems="center" gap={1}>
        <RatingsStars rating={rating} />
        <Typography variant="body2" color="text.secondary">
          {rating} din 5
        </Typography>
      </Stack>

      <Typography sx={{ mt: 1 }}>{review.review}</Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        gap={2}
        mt={2}
      >
        {is_liked_by_product_owner && (
          <Avatar
            src={review.product_business_owner.avatar ?? ""}
            sx={{ width: 24, height: 24 }}
          />
        )}

        <Stack direction="row" alignItems="center">
          <Typography
            color={is_liked_by_product_owner ? "error.main" : "text.secondary"}
            fontWeight={600}
          >
            {like_count}
          </Typography>

          {likeButton}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewCard;
