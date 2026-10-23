"use client";

import { useState } from "react";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { Button, ButtonBase, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NextLink from "next/link";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import AvatarWithRating from "@/components/cutomized/Avatar/AvatarWithRating";
import { getContactActionInfo } from "@/utils/contact-utils";
import ContactChoiceDialog from "@/components/cutomized/Contact/ContactChoiceDialog";

type EmployeeItemProps = {
  employee: BusinessEmployee;
  businessId: number | null;
  businessOwnerId: number | undefined;
};

const EmployeeItem = ({
  employee,
  businessId,
  businessOwnerId,
}: EmployeeItemProps) => {
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);

  const bookingHref =
    businessId && businessOwnerId
      ? AppRoutes.booking(
          businessId,
          businessOwnerId,
          employee.id,
          BookingSourceEnum.PROFILE,
          null
        )
      : null;

  const contactAction = getContactActionInfo(employee.contact_info, () =>
    setIsChoiceOpen(true)
  );

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5 }}
    >
      <ButtonBase
        component={NextLink}
        href={AppRoutes.profile(employee.username, employee.job)}
      >
        <Stack flexDirection="row" alignItems="center">
          <AvatarWithRating
            avatar={employee.avatar}
            ratingsAverage={employee.ratings_average}
            isBusinessOrEmployee={true}
          />

          <Stack sx={{ ml: 2.5 }} alignItems="flex-start">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {employee.fullname}
            </Typography>
            <Typography color="text.secondary">{employee.job}</Typography>
          </Stack>
        </Stack>
      </ButtonBase>

      {employee.instant_booking ? (
        <Button
          component={NextLink}
          href={bookingHref ?? "#"}
          disabled={!bookingHref}
          variant="contained"
          disableElevation
          size="small"
        >
          Alege
        </Button>
      ) : (
        contactAction.isVisible && (
          <Button
            variant="contained"
            disableElevation
            size="small"
            startIcon={
              contactAction.isWhatsAppStyled ? <WhatsAppIcon /> : undefined
            }
            onClick={contactAction.onClick}
            sx={[contactAction.isWhatsAppStyled && styles.whatsappButton]}
          >
            {contactAction.title}
          </Button>
        )
      )}

      {!employee.instant_booking && employee.contact_info.phone && (
        <ContactChoiceDialog
          open={isChoiceOpen}
          phone={employee.contact_info.phone}
          onClose={() => setIsChoiceOpen(false)}
        />
      )}
    </Stack>
  );
};

export default EmployeeItem;

const styles = {
  whatsappButton: {
    bgcolor: "whatsapp.main",
    color: "common.white",
    "&:hover": {
      bgcolor: "whatsapp.main",
      filter: "brightness(0.92)",
    },
  },
};
