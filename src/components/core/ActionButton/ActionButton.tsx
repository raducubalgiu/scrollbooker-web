import { Button, ButtonProps, SxProps, Stack, Theme } from "@mui/material";

export type ActionButtonType = {
  title: string;
  props?: ButtonProps;
};

type ActionButtonProps = {
  actions: ActionButtonType[];
  sx?: SxProps<Theme>;
};

const ActionButton = ({ actions, sx }: ActionButtonProps) => {
  return (
    <Stack flexDirection="row" alignItems="center" sx={sx ?? {}}>
      {actions.map((btn, index) => (
        <Button
          key={index}
          variant="contained"
          size="large"
          disableElevation
          sx={{
            ml: 1,
            mt: 2,
            fontWeight: 600,
            "&:nth-child(1)": { ml: 0 },
          }}
          {...btn.props}
        >
          {btn.title}
        </Button>
      ))}
    </Stack>
  );
};

export default ActionButton;
