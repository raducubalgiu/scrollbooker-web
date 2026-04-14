import React, { memo } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import CloseIcon from "@mui/icons-material/Close";

type CommentComposerProps = {
  authUserAvatar: string | null;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  minRows?: number;
  maxRows?: number;
  replyingTo?: string | null;
  onCancel?: () => void;
  disabled?: boolean;
};

const CommentComposer = ({
  authUserAvatar,
  value,
  onChange,
  onSubmit,
  placeholder = "Add comment...",
  autoFocus = false,
  minRows = 1,
  maxRows = 4,
  replyingTo,
  onCancel,
  disabled = false,
}: CommentComposerProps) => {
  const styles = {
    input: {
      "& .MuiOutlinedInput-root": {
        padding: 0,
        borderRadius: 10,
      },

      "& .MuiInputBase-inputMultiline": {
        padding: "10px 20px 0px 20px",
        borderRadius: 10,

        "&:focus": {
          border: 0,
        },
      },
    },
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      "😊",
    ])
  );

  const handleEmojiSelect = (emoji: string) => {
    onChange(`${value}${emoji}`);
    handleClose();
  };

  return (
    <Box>
      {replyingTo && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography variant="body2" color="text.secondary">
            Răspunzi lui <strong>@{replyingTo}</strong>
          </Typography>
        </Stack>
      )}

      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar src={authUserAvatar ?? ""} sx={{ width: 40, height: 40 }} />

        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          sx={{
            bgcolor: "background.default",
            borderRadius: 50,
          }}
        >
          <Box flex={1}>
            <TextField
              fullWidth
              multiline
              minRows={minRows}
              maxRows={maxRows}
              autoFocus={autoFocus}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              sx={styles.input}
            />
          </Box>

          <IconButton size="large" aria-describedby={id} onClick={handleClick}>
            <MoodOutlinedIcon fontSize="large" />
          </IconButton>

          <Popover
            id={id}
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
                  onClick={() => handleEmojiSelect(emoji)}
                  size="small"
                  sx={{
                    width: 50,
                    height: 50,
                    fontSize: 35,
                    borderRadius: 999,
                    opacity: 1,
                    color: "inherit",
                    transition:
                      "background-color 0.2s ease, transform 0.15s ease",
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
        </Stack>

        <IconButton
          onClick={onSubmit}
          disabled={disabled || value.trim() === ""}
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&.Mui-disabled": {
              bgcolor: "action.disabledBackground",
              color: "action.disabled",
            },
          }}
        >
          <ArrowUpwardOutlinedIcon />
        </IconButton>

        {onCancel && (
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

export default memo(CommentComposer);
