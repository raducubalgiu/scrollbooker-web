"use client";

import { Appointment } from "@/ts/models/booking/appointment/Appointment";
import { Box } from "@mui/material";
import React, { useState } from "react";
import AppointmentDetailsHeader from "./components/AppointmentDetailsHeader";
import AppointmentDetailsActions from "./components/AppointmentDetailsActions";
import AppointmentDetailsProducts from "./components/AppointmentDetailsProducts";
import AppointmentDetailsMap from "./components/AppointmentDetailsMap";
import AppointmentDetailsReview from "./components/AppointmentDetailsReview";
import CancelAppointmentModal from "./CancelAppointmentModal";
import CreateWrittenReviewModal from "./CreateWrittenReviewModal";

type AppointmentDetailsModuleProps = {
  appointment: Appointment;
};

type CreateReviewType = {
  open: boolean;
  rating: number;
};

const AppointmentDetailsModule = ({
  appointment,
}: AppointmentDetailsModuleProps) => {
  const [openCancel, setOpenCancel] = useState(false);
  const [openCreateReview, setOpenCreateReview] =
    useState<CreateReviewType | null>(null);

  const {
    start_date,
    status,
    user,
    customer,
    is_customer,
    total_duration,
    products,
    total_price_with_discount,
    total_price,
    total_discount,
    written_review,
    business,
    has_video_review,
  } = appointment;

  return (
    <Box sx={styles.container}>
      <CancelAppointmentModal
        open={openCancel}
        onClose={() => setOpenCancel(false)}
      />

      <CreateWrittenReviewModal
        open={openCreateReview?.open === true}
        rating={openCreateReview?.rating}
        onClose={() => setOpenCreateReview(null)}
      />

      <Box sx={{ minWidth: 0 }}>
        <AppointmentDetailsHeader
          status={status}
          startDate={start_date}
          totalDuration={total_duration}
          user={user}
          customer={customer}
          isCustomer={is_customer}
        />

        <AppointmentDetailsProducts
          products={products}
          totalPriceWithDiscount={total_price_with_discount}
          totalPrice={total_price}
          totalDiscount={total_discount}
        />

        {products.length > 0 && (
          <AppointmentDetailsActions
            status={status}
            onBookAgain={() => {}}
            onCancel={() => setOpenCancel(true)}
          />
        )}
        <AppointmentDetailsReview
          writtenReview={written_review}
          hasVideoReview={has_video_review}
          isCustomer={is_customer}
          status={status}
          customerAvatar={customer.avatar}
          onRatingClick={(r) => setOpenCreateReview({ open: true, rating: r })}
        />
      </Box>

      <AppointmentDetailsMap business={business} />
    </Box>
  );
};

export default AppointmentDetailsModule;

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr",
    },
    gap: { xs: 4, md: 10 },
    p: { md: 2.5 },
    alignItems: "start",
  },
};
