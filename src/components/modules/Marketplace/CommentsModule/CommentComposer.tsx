import React, { memo } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import EmojiPicker from "@/components/core/EmojiPicker/EmojiPicker";

const QUICK_EMOJIS = ["👌", "😁", "😇", "🤣", "😍", "🥰"];

type CommentComposerProps = {
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
    quickEmoji: {
      fontSize: 24,
      lineHeight: 1,
      border: "none",
      background: "none",
      p: 0,
      py: 1,
      cursor: "pointer",
    },
  };

  const handleEmojiSelect = (emoji: string) => {
    onChange(`${value}${emoji}`);
  };

  const { data: session } = useSession();

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

      {isMobile && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: 44, mb: 1 }}
        >
          {QUICK_EMOJIS.map((emoji) => (
            <Box
              key={emoji}
              component="button"
              type="button"
              onClick={() => handleEmojiSelect(emoji)}
              sx={styles.quickEmoji}
            >
              {emoji}
            </Box>
          ))}
        </Stack>
      )}

      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar src={session?.avatar ?? ""} sx={{ width: 40, height: 40 }} />

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

          {!isMobile && <EmojiPicker onEmojiSelect={handleEmojiSelect} />}
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
