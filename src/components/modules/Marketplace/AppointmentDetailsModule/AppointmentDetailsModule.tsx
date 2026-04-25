"use client";

import {
  Appointment,
  AppointmentCancel,
  AppointmentWrittenReview,
} from "@/ts/models/booking/appointment/Appointment";
import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import AppointmentDetailsHeader from "./components/AppointmentDetailsHeader";
import AppointmentDetailsActions from "./components/AppointmentDetailsActions";
import AppointmentDetailsProducts from "./components/AppointmentDetailsProducts";
import AppointmentDetailsMap from "./components/AppointmentDetailsMap";
import AppointmentDetailsReview from "./components/AppointmentDetailsReview";
import CancelAppointmentModal from "./CancelAppointmentModal";
import CreateWrittenReviewModal from "./CreateWrittenReviewModal";
import { useMutate } from "@/hooks/useHttp";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import {
  Review,
  ReviewCreate,
  ReviewUpdate,
} from "@/ts/models/booking/review/Review";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";

type AppointmentDetailsModuleProps = {
  appointment: Appointment;
};

const AppointmentDetailsModule = ({
  appointment,
}: AppointmentDetailsModuleProps) => {
  const { data: session } = useSession();
  const [status, setStatus] = useState(appointment.status);
  const [canceledReason, setCanceledReason] = useState(
    appointment.canceled_reason
  );
  const [openCancel, setOpenCancel] = useState<boolean>(false);

  const [writtenReview, setWrittenReview] =
    useState<AppointmentWrittenReview | null>(appointment.written_review);

  const [openReview, setOpenReview] = useState(false);
  const [draftRating, setDraftRating] = useState<number | null>(
    appointment.written_review?.rating ?? null
  );

  const {
    id,
    start_date,
    user,
    customer,
    is_customer,
    total_duration,
    products,
    total_price_with_discount,
    total_price,
    total_discount,
    business,
    has_video_review,
  } = appointment;
  const isFinished = status === AppointmentStatusEnum.FINISHED;

  const { mutate: handleCancel, isPending: isLoadingCancel } = useMutate({
    key: ["cancel-appointment", id],
    url: `/api/appointments/${id}/cancel`,
    method: "PUT",
    options: {
      onSuccess: (response: Appointment) => {
        setOpenCancel(false);
        setStatus(AppointmentStatusEnum.CANCELED);
        setCanceledReason(response.canceled_reason);
      },
    },
  });

  const { mutate: handleCreateReview, isPending: isPendingCreateReview } =
    useMutate({
      key: ["create-written-review"],
      url: `/api/appointments/${id}/create-review`,
      options: {
        onSuccess: (review: Review) => {
          setWrittenReview(review);
          setDraftRating(review.rating);
          setOpenReview(false);
        },
      },
    });

  const { mutate: handleDeleteReview } = useMutate({
    key: ["create-written-review"],
    url: `/api/reviews/${writtenReview?.id}/delete-review`,
    method: "DELETE",
    options: {
      onSuccess: () => {
        setWrittenReview(null);
        setDraftRating(null);
      },
    },
  });

  const { mutate: handleUpdateReview, isPending: isPendingUpdateReview } =
    useMutate({
      key: ["update-written-review"],
      url: `/api/reviews/${writtenReview?.id}/update-review`,
      method: "PUT",
      options: {
        onSuccess: (review: Review) => {
          setWrittenReview(review);
          setDraftRating(review.rating);
          setOpenReview(false);
        },
      },
    });

  const onHandleCancelAppointment = (canceledReason: string) => {
    const authUserId = session?.user_id;
    if (!authUserId) return;

    const body: AppointmentCancel = {
      canceled_reason: canceledReason,
      canceled_by_user_id: authUserId,
    };
    handleCancel(body);
  };

  const onHandleSaveReview = (reviewText: string, finalRating: number) => {
    const firstProductId = appointment.products[0]?.id;
    if (!finalRating || !appointment.user.id || !firstProductId) return;

    const createBody: ReviewCreate = {
      review: reviewText,
      rating: finalRating,
      user_id: appointment.user.id,
      product_id: firstProductId,
      parent_id: null,
    };

    const updateBody: ReviewUpdate = {
      review: reviewText,
      rating: finalRating,
    };

    if (writtenReview?.id) {
      handleUpdateReview(updateBody);
    } else {
      handleCreateReview(createBody);
    }
  };

  const onHandleRatingClick = useCallback((rating: number) => {
    setDraftRating(rating);
    setOpenReview(true);
  }, []);

  const onHandleEditReview = useCallback(() => {
    setOpenReview(true);
  }, []);

  const onHandleDeleteReview = useCallback(() => {
    handleDeleteReview({});
  }, []);

  return (
    <Box sx={styles.container}>
      <CancelAppointmentModal
        open={openCancel}
        onClose={() => setOpenCancel(false)}
        onCancel={onHandleCancelAppointment}
        isLoadingCancel={isLoadingCancel}
      />

      <CreateWrittenReviewModal
        open={openReview}
        rating={draftRating}
        existingReviewText={writtenReview?.review || ""}
        onClose={() => setOpenReview(false)}
        onCreateReview={onHandleSaveReview}
        isLoadingCreateReview={isPendingCreateReview || isPendingUpdateReview}
      />

      <Box sx={{ minWidth: 0 }}>
        <AppointmentDetailsHeader
          status={status}
          startDate={start_date}
          totalDuration={total_duration}
          user={user}
          canceledReason={canceledReason}
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

        {!isEmpty(products) && isFinished && (
          <AppointmentDetailsReview
            writtenReview={writtenReview}
            hasVideoReview={has_video_review}
            isCustomer={is_customer}
            status={status}
            customerAvatar={customer.avatar}
            onRatingClick={onHandleRatingClick}
            onEditReview={onHandleEditReview}
            onDeleteReview={onHandleDeleteReview}
          />
        )}
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
