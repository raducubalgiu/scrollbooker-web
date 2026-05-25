import { Button, Stack } from "@mui/material";

type EmploymentRespondBottomBarProps = {
  isSaving: boolean;
  onDeny: () => void;
  onAccept: () => void;
};

const EmploymentRespondBottomBar = ({
  isSaving,
  onDeny,
  onAccept,
}: EmploymentRespondBottomBarProps) => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={1} mt={2.5}>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        disabled={isSaving}
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
        disabled={isSaving}
        loading={isSaving}
      >
        Acceptă
      </Button>
    </Stack>
  );
};

export default EmploymentRespondBottomBar;
