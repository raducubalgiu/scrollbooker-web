import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";
import { EmploymentRequest } from "@/ts/models/booking/employmentRequest/EmploymentRequest";

type EmploymentRequestMobileCardProps = {
  employmentRequest: EmploymentRequest;
  onCancel: (employmentRequestId: number) => void;
};

const EmploymentRequestMobileCard = ({
  employmentRequest,
  onCancel,
}: EmploymentRequestMobileCardProps) => {
  return (
    <Box sx={styles.card}>
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Avatar
          src={employmentRequest.employee.avatar ?? ""}
          sx={styles.avatar}
        />

        <Stack sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontWeight={700} noWrap>
            {employmentRequest.employee.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            @{employmentRequest.employee.username}
          </Typography>
        </Stack>

        <IconButton
          size="small"
          sx={styles.cancelButton}
          onClick={() => onCancel(employmentRequest.id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack flexDirection="row" justifyContent="space-between">
        <Stack spacing={0.25}>
          <Typography variant="caption" color="text.secondary">
            Funcția propusă
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {employmentRequest.profession.name}
          </Typography>
        </Stack>

        <Stack spacing={0.25} alignItems="flex-end">
          <Typography variant="caption" color="text.secondary">
            Data
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {dayjs(employmentRequest.created_at).format("DD-MM-YYYY")}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmploymentRequestMobileCard;

const styles = {
  card: {
    p: 2,
    borderRadius: 2.5,
    border: "1px solid",
    borderColor: "divider",
    mb: 1.5,
  },
  avatar: { width: 48, height: 48 },
  cancelButton: {
    color: "error.main",
    flexShrink: 0,
  },
};
