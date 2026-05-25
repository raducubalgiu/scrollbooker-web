import { Button, Stack } from "@mui/material";

type EmploymentRespondBottomBarProps = {
  isPendingAccept: boolean;
  isPendingDeny: boolean;
  onDeny: () => void;
  onAccept: () => void;
};

const EmploymentRespondBottomBar = ({
  isPendingAccept,
  isPendingDeny,
  onDeny,
  onAccept,
}: EmploymentRespondBottomBarProps) => {
  const disabled = isPendingAccept || isPendingDeny;

  return (
    <Stack flexDirection="row" alignItems="center" gap={1} mt={2.5}>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        disabled={disabled}
        loading={isPendingDeny}
        onClick={onDeny}
        sx={{ py: 1.5 }}
      >
        Refuză
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onAccept}
        sx={{ py: 1.5 }}
        disableElevation
        disabled={disabled}
        loading={isPendingAccept}
      >
        Acceptă
      </Button>
    </Stack>
  );
};

export default EmploymentRespondBottomBar;
