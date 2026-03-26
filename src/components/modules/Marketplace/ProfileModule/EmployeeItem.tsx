import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import {
  Avatar,
  Badge,
  Button,
  ButtonBase,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { formatRating } from "@/utils/formatters";
import { useRouter } from "next/navigation";

const EmployeeItem = ({ employee }: { employee: BusinessEmployee }) => {
  const router = useRouter();

  const styles = {
    badge: {
      "& .MuiBadge-badge": {
        right: "auto",
        left: "50%",
        transform: `translate(-50%, 100%)`,
      },
    },
    badgeContent: {
      backgroundColor: "background.paper",
      px: 1.5,
      py: 0.5,
      borderRadius: 50,
      boxShadow: 1,
    },
    avatar: { width: 70, height: 70, border: 1, borderColor: "divider" },
  };

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2.5 }}
    >
      <ButtonBase onClick={() => router.push(`/profile/${employee.username}`)}>
        <Stack flexDirection="row" alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={styles.badgeContent}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {formatRating(employee.ratings_average)}
                </Typography>
              </Stack>
            }
            sx={styles.badge}
          >
            <Avatar sx={styles.avatar} src={employee.avatar ?? ""} />
          </Badge>

          <Stack sx={{ ml: 2.5 }} alignItems="flex-start">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {employee.fullname}
            </Typography>
            <Typography color="text.secondary">{employee.job}</Typography>
          </Stack>
        </Stack>
      </ButtonBase>

      <Button variant="outlined" color="secondary" size="large">
        Servicii
      </Button>
    </Stack>
  );
};

export default EmployeeItem;
