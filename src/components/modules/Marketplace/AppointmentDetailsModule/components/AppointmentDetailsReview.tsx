"use client";

import RatingsStars from "@/components/cutomized/RatingsDistribution/RatingsStars";
import { AppointmentWrittenReview } from "@/ts/models/booking/appointment/Appointment";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import VideoReviewCTA from "./VideoReviewCTA";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";

type AppointmentDetailsReviewProps = {
  writtenReview: AppointmentWrittenReview;
  customerAvatar: string | null | undefined;
  hasVideoReview: boolean;
  isCustomer: boolean;
  status: AppointmentStatusEnum;
  onRatingClick: (rating: number, review: string | null) => void;
};

const AppointmentDetailsReview = ({
  writtenReview,
  customerAvatar,
  hasVideoReview,
  isCustomer,
  status,
  onRatingClick,
}: AppointmentDetailsReviewProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isFinished = status === AppointmentStatusEnum.FINISHED;

  return (
    <Box mt={5}>
      {writtenReview?.id && (
        <Box>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Avatar
                src={customerAvatar ?? ""}
                sx={{ width: 55, height: 55 }}
              />
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  A evaluat {writtenReview.rating} din 5
                </Typography>
                <RatingsStars rating={writtenReview.rating} />
              </Stack>
            </Stack>

            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size="large"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Editează</MenuItem>
                <MenuItem onClick={handleClose}>Șterge</MenuItem>
              </Menu>
            </div>
          </Stack>

          <Typography mt={1.5}>{writtenReview.review}</Typography>
        </Box>
      )}

      {!writtenReview?.id && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "background.default" }}
          p={5}
          mt={2.5}
          borderRadius={5}
          spacing={4}
        >
          <Typography variant="h6" textAlign="center">
            Click pe o stea pentru a evalua
          </Typography>

          <Rating
            name="custom-size-rating"
            sx={{
              fontSize: "3rem",
              "& .MuiRating-icon": {
                marginRight: "8px",
              },
            }}
            //onChange={(_, v) => v !== null && onRatingClick(v)}
          />
        </Stack>
      )}

      {!hasVideoReview && isFinished && isCustomer && (
        <VideoReviewCTA onNavigateToCamera={() => {}} />
      )}
    </Box>
  );
};

export default AppointmentDetailsReview;
