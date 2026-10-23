import { Button, Stack } from "@mui/material";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";

type MainLayoutFooterActionsProps = {
  actions: ActionButtonType[];
};

export default function MainLayoutFooterActions({
  actions,
}: MainLayoutFooterActionsProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ width: { xs: "100%", lg: "auto" } }}
    >
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="contained"
          disableElevation
          {...action.props}
          sx={{ fontWeight: 600, flex: { xs: 1, lg: "initial" } }}
        >
          {action.title}
        </Button>
      ))}
    </Stack>
  );
}
