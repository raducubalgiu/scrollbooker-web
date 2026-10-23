import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import AvatarWithRating from "@/components/cutomized/Avatar/AvatarWithRating";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

type EmployeeMobileCardProps = {
  employee: BusinessEmployee;
};

const EmployeeMobileCard = ({ employee }: EmployeeMobileCardProps) => {
  return (
    <Box sx={styles.card}>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <AvatarWithRating
          avatar={employee.avatar}
          ratingsAverage={employee.ratings_average}
          isBusinessOrEmployee
        />

        <Stack sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontWeight={700} noWrap>
            {employee.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {employee.job}
          </Typography>
        </Stack>

        <IconButton size="small" sx={styles.dismissButton}>
          <PersonRemoveOutlinedIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mt: 4, mb: 2 }} />

      <Stack flexDirection="row" justifyContent="space-between">
        <Stack spacing={0.25}>
          <Typography variant="caption" color="text.secondary">
            Data angajării
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {employee.hire_date}
          </Typography>
        </Stack>

        <Stack spacing={0.25} alignItems="flex-end">
          <Typography variant="caption" color="text.secondary">
            Produse
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {employee.products_count}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmployeeMobileCard;

const styles = {
  card: {
    p: 2,
    borderRadius: 2.5,
    border: "1px solid",
    borderColor: "divider",
    mb: 1.5,
  },
  dismissButton: {
    color: "error.main",
    flexShrink: 0,
  },
};
