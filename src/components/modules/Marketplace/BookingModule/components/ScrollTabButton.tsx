import { IconButton } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface ScrollTabButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export const ScrollTabButton = ({
  direction,
  onClick,
}: ScrollTabButtonProps) => (
  <IconButton
    onClick={onClick}
    size="large"
    sx={{
      position: "absolute",
      [direction]: -25,
      zIndex: 3,
      bgcolor: "background.paper",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        bgcolor: "background.paper",
        boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.18)",
        transform: "translateY(-1px)",
      },
      transition: "all 0.2s ease-in-out",
      "& .MuiSvgIcon-root": {
        fontSize: 28,
        color: "text.primary",
      },
    }}
  >
    {direction === "left" ? (
      <ChevronLeftRoundedIcon />
    ) : (
      <ChevronRightRoundedIcon />
    )}
  </IconButton>
);
