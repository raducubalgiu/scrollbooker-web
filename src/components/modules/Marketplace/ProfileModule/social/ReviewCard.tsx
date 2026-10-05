import Image from "next/image";
import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography,
  Theme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Review } from "@/ts/models/booking/review/Review";
import ReviewCardCustomer from "./ReviewCardCustomer";

type ReviewCardProps = {
  review: Review;
  onNavigateToVideoReview: () => void;
  onLike: () => void;
};

const ReviewCard = ({
  review,
  onNavigateToVideoReview,
  onLike,
}: ReviewCardProps) => {
  const thumbnailVideo = review.video_review?.media_files?.[0]?.thumbnail_url;
  const hasText = !!review.review?.trim();

  return (
    <Stack
      spacing={1.5}
      sx={{
        width: "100%",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <ReviewCardCustomer
        avatar={review.customer.avatar ?? ""}
        fullname={review.customer.fullname}
        rating={review.rating}
        createdAt={review.created_at}
      />

      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          textAlign: "left",
          wordBreak: "break-word",
        }}
      >
        {hasText ? review.review : "..."}
      </Typography>

      {review.video_review ? (
        <ButtonBase
          onClick={onNavigateToVideoReview}
          aria-label="Vezi recenzia video"
          sx={styles.videoLink}
        >
          <Box sx={styles.videoThumb}>
            {thumbnailVideo && (
              <Image
                src={thumbnailVideo}
                alt=""
                fill
                sizes="34px"
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>

          <Typography variant="body2" sx={styles.videoText}>
            Vezi recenzia video
          </Typography>

          <ArrowForwardRoundedIcon
            className="video-arrow"
            sx={styles.videoArrow}
          />
        </ButtonBase>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
          sx={{ width: "100%", height: 24 }}
        >
          {review.is_liked_by_product_owner && (
            <Avatar
              src={review.product_business_owner.avatar ?? ""}
              alt="Business Owner"
              sx={{ width: 18, height: 18 }}
            />
          )}

          <ButtonBase
            onClick={onLike}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
              p: 0.5,
              borderRadius: "50px",
              "&:active": { transform: "scale(0.92)" },
            }}
          >
            {review.like_count > 0 && (
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: review.is_liked ? "error.main" : "text.secondary",
                }}
              >
                {review.like_count}
              </Typography>
            )}

            {review.is_liked ? (
              <FavoriteIcon sx={{ fontSize: 20, color: "error.main" }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ fontSize: 20, color: "text.secondary" }}
              />
            )}
          </ButtonBase>
        </Stack>
      )}
    </Stack>
  );
};

export default ReviewCard;

const styles = {
  videoCard: {
    position: "relative",
    alignSelf: "flex-start",
    width: 104,
    aspectRatio: "9 / 16",
    borderRadius: 3,
    overflow: "hidden",
    bgcolor: "action.selected",
    transition: "transform 0.15s ease",
    "&:hover": { transform: "scale(1.02)" },
    "&:active": { transform: "scale(0.97)" },
  },
  videoGradient: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 45%)",
    pointerEvents: "none",
  },
  videoLabel: {
    position: "absolute",
    left: 8,
    bottom: 6,
    fontWeight: 600,
    color: "common.white",
    lineHeight: 1.2,
  },
  videoLink: {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    gap: 1.25,
    p: 0.75,
    pr: 1.5,
    border: 1,
    borderColor: "divider",
    borderRadius: "14px",
    transition: "background-color 0.15s ease, transform 0.15s ease",
    "&:hover": {
      bgcolor: "action.hover",
      "& .video-arrow": { transform: "translateX(3px)" },
    },
    "&:active": { transform: "scale(0.98)" },
  },
  videoThumb: {
    position: "relative",
    width: 34,
    height: 48,
    flexShrink: 0,
    borderRadius: "8px",
    overflow: "hidden",
    bgcolor: "action.selected",
  },
  playBadge: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: (theme: Theme) => alpha(theme.palette.common.black, 0.5),
    backdropFilter: "blur(3px)",
  },
  videoText: {
    fontWeight: 600,
    color: "text.primary",
  },
  videoArrow: {
    fontSize: 16,
    color: "text.secondary",
    transition: "transform 0.15s ease",
  },
};
