import { Avatar, Box, Button, Divider, Stack, Typography, alpha } from "@mui/material";
import { UnapprovedBusinessResponse } from "@/ts/models/booking/business/UnapprovedBusinessResponse";

type UnapprovedBusinessCardProps = {
  item: UnapprovedBusinessResponse;
  isApproving: boolean;
  onApprove: () => void;
};

export default function UnapprovedBusinessCard({
  item,
  isApproving,
  onApprove,
}: UnapprovedBusinessCardProps) {
  const { business } = item;

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar src={item.avatar ?? ""} alt={item.fullname} />
        <Box>
          <Typography fontWeight={700}>{item.fullname}</Typography>
          <Typography variant="body2" color="text.secondary">
            @{item.username}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Tip business: {business.business_type.name}
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5 }}>
        Adresă: {business.location.address}
      </Typography>

      <Box
        sx={{
          display: "inline-block",
          mt: 1.5,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
        }}
      >
        <Typography variant="caption" color="primary.main" fontWeight={700}>
          {business.has_employees ? "Are angajați" : "Fără angajați"}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        loading={isApproving}
        disabled={isApproving}
        onClick={onApprove}
        sx={{ mt: 3 }}
      >
        Aprobă
      </Button>
    </Box>
  );
}
