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
    pill: {
      bgcolor: "background.paper",
      borderRadius: 3,
      px: 2,
      py: 1.5,
    },
    // theme.ts aplică global, prin MuiCssBaseline, un stil de "câmp de
    // formular" oricărui <textarea> (padding, minHeight: 44, un glow pe
    // focus) — folosit intenționat de alte textarea-uri din app
    // (descrieri, recenzii scrise etc.). Acest composer e un input
    // minimal, tip TikTok/Instagram, deci trebuie să anuleze explicit
    // acele proprietăți.
    input: {
      "& .MuiInputBase-root": {
        padding: 0,
      },
      "& .MuiInputBase-input": {
        padding: "0 !important",
        minHeight: "0 !important",
        borderRadius: "0 !important",
        backgroundColor: "transparent !important",
        lineHeight: 1.4,
        fontSize: 15,
      },
      "& .MuiInputBase-input:hover": {
        backgroundColor: "transparent !important",
      },
      "& .MuiInputBase-input:focus, & .MuiInputBase-input:focus-visible": {
        outline: "none !important",
        boxShadow: "none !important",
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
          gap={1}
          sx={styles.pill}
        >
          <TextField
            fullWidth
            multiline
            variant="standard"
            minRows={minRows}
            maxRows={maxRows}
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{ input: { disableUnderline: true } }}
            sx={styles.input}
          />

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
          <ArrowUpwardOutlinedIcon fontSize="small" />
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
