import React, { memo } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
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
      },
    },
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
