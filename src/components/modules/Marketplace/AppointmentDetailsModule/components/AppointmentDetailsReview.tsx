"use client";

import { AppointmentWrittenReview } from "@/ts/models/booking/appointment/Appointment";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type AppointmentDetailsReviewProps = {
  writtenReview: AppointmentWrittenReview | null;
  customerAvatar: string | null | undefined;
  hasVideoReview: boolean;
  isCustomer: boolean;
  status: AppointmentStatusEnum;
  onRatingClick: (rating: number) => void;
  onEditReview: () => void;
  onDeleteReview: (reviewId: number) => void;
};

const AppointmentDetailsReview = ({
  writtenReview,
  customerAvatar,
  isCustomer,
  onRatingClick,
  onEditReview,
  onDeleteReview,
}: AppointmentDetailsReviewProps) => {
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
                <Rating
                  name="rating"
                  readOnly
                  defaultValue={writtenReview.rating}
                />
              </Stack>
            </Stack>

            {isCustomer && (
              <ReviewMenu
                onEditReview={onEditReview}
                onDeleteReview={() => onDeleteReview(writtenReview.id)}
              />
            )}
          </Stack>

          <Typography mt={1.5}>{writtenReview.review}</Typography>
        </Box>
      )}

      {!writtenReview?.id && isCustomer && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "background.paper" }}
          p={2.5}
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
              fontSize: "2.5rem",
              "& .MuiRating-icon": {
                marginRight: "8px",
              },
            }}
            onChange={(_, r) => r && onRatingClick(r)}
          />
        </Stack>
      )}
    </Box>
  );
};

export default AppointmentDetailsReview;

type ReviewMenuProps = {
  onEditReview: () => void;
  onDeleteReview: () => void;
};

const ReviewMenu = ({ onEditReview, onDeleteReview }: ReviewMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onEditReview();
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Editează</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onDeleteReview();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Șterge</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
