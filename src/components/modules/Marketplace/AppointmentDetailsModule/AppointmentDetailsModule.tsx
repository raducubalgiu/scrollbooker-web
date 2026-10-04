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
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import {
  Review,
  ReviewCreate,
  ReviewUpdate,
} from "@/ts/models/booking/review/Review";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import {
  useCreateReview,
  useDeleteReview,
  useUpdateReview,
} from "@/controllers/booking/review.controller";
import { useCancelAppointment } from "@/controllers/booking/appointments.controller";

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

  const isFinished = status === AppointmentStatusEnum.FINISHED;

  const { mutate: handleCancel, isPending: isLoadingCancel } =
    useCancelAppointment();
  const { mutate: handleCreateReview, isPending: isPendingCreateReview } =
    useCreateReview(appointment.id);
  const { mutate: handleUpdateReview, isPending: isPendingUpdateReview } =
    useUpdateReview();
  const { mutate: handleDeleteReview } = useDeleteReview();

  const onHandleCancelAppointment = (canceledReason: string) => {
    const authUserId = session?.user_id;
    if (!authUserId) return;

    const body: AppointmentCancel = {
      canceled_reason: canceledReason,
      canceled_by_user_id: authUserId,
    };

    handleCancel(
      {
        appointmentId: appointment.id,
        payload: body,
      },
      {
        onSuccess: (response: Appointment) => {
          setOpenCancel(false);
          setStatus(AppointmentStatusEnum.CANCELED);
          setCanceledReason(response.canceled_reason);
        },
      }
    );
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
      handleUpdateReview(
        {
          reviewId: writtenReview.id,
          payload: updateBody,
        },
        {
          onSuccess: (review: Review) => {
            setWrittenReview(review);
            setDraftRating(review.rating);
            setOpenReview(false);
          },
        }
      );
    } else {
      handleCreateReview(createBody, {
        onSuccess: (review: Review) => {
          setWrittenReview(review);
          setDraftRating(review.rating);
          setOpenReview(false);
        },
      });
    }
  };

  const onHandleRatingClick = useCallback((rating: number) => {
    setDraftRating(rating);
    setOpenReview(true);
  }, []);

  const onHandleEditReview = useCallback(() => {
    setOpenReview(true);
  }, []);

  const onHandleDeleteReview = useCallback(
    (reviewId: number) => {
      handleDeleteReview(reviewId, {
        onSuccess: () => {
          setWrittenReview(null);
          setDraftRating(null);
        },
      });
    },
    [handleDeleteReview]
  );

  return (
    <MainLayout showHeader={false}>
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
            startDate={appointment.start_date}
            totalDuration={appointment.total_duration}
            user={appointment.user}
            isCustomer={appointment.is_customer}
            customer={appointment.customer}
            canceledReason={canceledReason}
          />

          <AppointmentDetailsProducts
            products={appointment.products}
            totalPriceWithDiscount={appointment.total_price_with_discount}
            totalPrice={appointment.total_price}
            totalDiscount={appointment.total_discount}
          />

          {appointment.products.length > 0 && (
            <AppointmentDetailsActions
              startDate={appointment.start_date}
              status={status}
              onBookAgain={() => {}}
              onCancel={() => setOpenCancel(true)}
            />
          )}

          {!isEmpty(appointment.products) && isFinished && (
            <AppointmentDetailsReview
              writtenReview={writtenReview}
              hasVideoReview={appointment.has_video_review}
              isCustomer={appointment.is_customer}
              status={status}
              customerAvatar={appointment.customer.avatar}
              onRatingClick={onHandleRatingClick}
              onEditReview={onHandleEditReview}
              onDeleteReview={onHandleDeleteReview}
            />
          )}
        </Box>

        <AppointmentDetailsMap business={appointment.business} />
      </Box>
    </MainLayout>
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
    alignItems: "start",
  },
};
