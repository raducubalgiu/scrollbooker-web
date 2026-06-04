import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export type SegmentedOption<T = string> = {
  value: T;
  label: string;
};

type SegmentedButtonsProps<T = string> = {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
  marginBottom?: number | string;
};

export const SegmentedButtons = <T extends string | number>({
  value,
  onChange,
  options,
  marginBottom = 2.5,
}: SegmentedButtonsProps<T>) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      sx={{ ...styles.container, mb: marginBottom }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          sx={styles.button}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 0.6,
    backgroundColor: "background.default",
    borderRadius: "50px",
    border: "none",
    "& .MuiToggleButtonGroup-grouped": {
      border: "none",
      mx: 0.2,
      "&:not(:first-of-type)": {
        borderRadius: "50px",
      },
      "&:first-of-type": {
        borderRadius: "50px",
      },
    },
  },
  button: {
    flex: 1,
    textTransform: "none",
    fontWeight: 500,
    fontSize: "0.875rem",
    color: "text.secondary",
    py: 1,
    borderRadius: "50px",
    "&.Mui-selected": {
      backgroundColor: "background.paper",
      color: "text.primary",
      fontWeight: 600,
      boxShadow:
        "0px 3px 8px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.05)",
      "&:hover": {
        backgroundColor: "background.paper",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
