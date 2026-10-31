"use client";

import { useEffect, useState } from "react";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import Modal from "@/components/core/Modal/Modal";
import FormTextarea from "@/components/core/Input/FormTextarea";
import {
  ADMIN_STATUS_LABELS,
  PROBLEM_STATUSES,
} from "@/components/cutomized/ProblemStatus/problemStatus";
import {
  PROBLEM_ADMIN_MESSAGE_MAX_LENGTH,
  useUpdateProblemStatus,
} from "@/controllers/nomenclature/problem.controller";
import { AdminProblem, ProblemStatus } from "@/ts/models/nomenclature/Problem";

type ProblemStatusDialogProps = {
  problem: AdminProblem | null;
  onClose: () => void;
};

const ProblemStatusDialog = ({
  problem,
  onClose,
}: ProblemStatusDialogProps) => {
  const [status, setStatus] = useState<ProblemStatus>("new");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { mutate: updateStatus, isPending } = useUpdateProblemStatus();

  useEffect(() => {
    if (!problem) return;
    setStatus(problem.status);
    setMessage(problem.admin_message ?? "");
    setError(null);
  }, [problem]);

  const trimmedMessage = message.trim();
  const isMessageMissing = status === "rejected" && !trimmedMessage;
  const notifiesUser =
    (status === "resolved" || status === "rejected") &&
    status !== problem?.status;

  const handleSave = () => {
    if (!problem || isMessageMissing) return;
    setError(null);

    updateStatus(
      { problemId: problem.id, status, message: trimmedMessage || null },
      {
        onSuccess: onClose,
        onError: () =>
          setError("Statusul nu a putut fi salvat. Încearcă din nou."),
      },
    );
  };

  return (
    <Modal
      open={!!problem}
      handleClose={onClose}
      title="Actualizează statusul"
      maxWidth="sm"
      fullWidth
      actions={[
        {
          title: "Renunță",
          props: {
            onClick: onClose,
            color: "secondary",
            variant: "outlined",
            disabled: isPending,
          },
        },
        {
          title: "Salvează",
          props: {
            onClick: handleSave,
            loading: isPending,
            disabled: isPending || isMessageMissing,
          },
        },
      ]}
    >
      <Stack spacing={2.5} sx={{ pt: 1 }}>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value as ProblemStatus)}
          disabled={isPending}
          fullWidth
        >
          {PROBLEM_STATUSES.map((option) => (
            <MenuItem key={option} value={option}>
              {ADMIN_STATUS_LABELS[option]}
            </MenuItem>
          ))}
        </TextField>

        <Stack spacing={1}>
          <Typography fontWeight={600}>
            Mesaj pentru utilizator{" "}
            {status === "rejected" ? "(obligatoriu)" : "(opțional)"}
          </Typography>
          <FormTextarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={
              status === "rejected"
                ? "Explică pe scurt de ce închidem raportul."
                : "Ex: Am rezolvat problema în ultima actualizare. Mulțumim!"
            }
            maxLength={PROBLEM_ADMIN_MESSAGE_MAX_LENGTH}
            minRows={3}
            disabled={isPending}
            aria-label="Mesaj pentru utilizator"
          />
          <Typography variant="caption" color="text.secondary">
            {message.length}/{PROBLEM_ADMIN_MESSAGE_MAX_LENGTH} · Utilizatorul
            vede „Respins” ca „Închis”.
          </Typography>
        </Stack>

        {notifiesUser && (
          <Typography variant="body2" color="text.secondary">
            Utilizatorul va primi o notificare cu noul status
            {trimmedMessage ? " și mesajul tău" : ""}.
          </Typography>
        )}

        {error && (
          <Typography variant="body2" color="error.main">
            {error}
          </Typography>
        )}
      </Stack>
    </Modal>
  );
};

export default ProblemStatusDialog;
