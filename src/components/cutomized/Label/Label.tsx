import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

type LabelProps = {
  title: string;
  color: string;
};

export function Label({ title, color }: LabelProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: 1.25,
        py: 0.5,
        borderRadius: "999px",
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        backgroundColor: alpha(color, 0.16),
        color: color,
      }}
    >
      {title}
    </Box>
  );
}
