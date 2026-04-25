import React, { useState } from "react";
import { Box, IconButton, Popover } from "@mui/material";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";

type EmojiPickerProps = {
  onEmojiSelect: (emoji: string) => void;
};

const EMOJIS = Array.from(
  new Set([
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🤭",
    "😉",
    "😊",
    "😇",
    "😍",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "😝",
    "🤑",
    "🤗",
    "🤔",
    "🤐",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "😕",
    "😌",
  ])
);

const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="large"
        sx={{ color: "text.secondary" }}
      >
        <MoodOutlinedIcon fontSize="large" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: -1,
              p: 1.5,
              borderRadius: 4,
              maxWidth: "calc(100vw - 24px)",
              boxShadow: 3,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 0.75,
          }}
        >
          {EMOJIS.map((emoji) => (
            <IconButton
              key={emoji}
              onClick={() => {
                onEmojiSelect(emoji);
                handleClose();
              }}
              size="small"
              sx={{
                width: 50,
                height: 50,
                fontSize: 35,
                borderRadius: 999,
                opacity: 1,
                color: "inherit",
                transition: "background-color 0.2s ease, transform 0.15s ease",
                "&:hover": {
                  bgcolor: "action.hover",
                  transform: "scale(1.08)",
                },
              }}
            >
              <Box component="span" sx={{ lineHeight: 1 }}>
                {emoji}
              </Box>
            </IconButton>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default EmojiPicker;
