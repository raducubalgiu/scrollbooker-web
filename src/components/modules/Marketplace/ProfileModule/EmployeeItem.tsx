import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { Button, ButtonBase, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";
import AvatarWithRating from "@/components/cutomized/Avatar/AvatarWithRating";

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
    </Stack>
  );
};

export default EmployeeItem;
