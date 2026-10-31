"use client";

import { useState } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HeaderMobile from "@/components/core/HeaderMobile/HeaderMobile";
import FormTextarea from "@/components/core/Input/FormTextarea";
import ProblemPhotosPicker from "./ProblemPhotosPicker";
import MyProblemsList from "./MyProblemsList";
import {
  PROBLEM_TEXT_MAX_LENGTH,
  PROBLEM_TEXT_MIN_LENGTH,
  useReportProblem,
} from "@/controllers/nomenclature/problem.controller";

const GENERIC_ERROR = "A apărut o eroare. Încearcă din nou.";

function submitErrorMessage(error: unknown) {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  if (status === 429) {
    return "Ai trimis prea multe rapoarte într-un timp scurt. Încearcă din nou mai târziu.";
  }
  if (status === 413 || status === 415 || status === 400) {
    return "Una dintre fotografii nu a putut fi încărcată. Încearcă altă imagine.";
  }
  return GENERIC_ERROR;
}

const ReportProblemModule = () => {
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const { mutate: reportProblem, isPending } = useReportProblem();

  const trimmedLength = text.trim().length;
  const isTextValid =
    trimmedLength >= PROBLEM_TEXT_MIN_LENGTH &&
    trimmedLength <= PROBLEM_TEXT_MAX_LENGTH;

  const handleSubmit = () => {
    if (!isTextValid) return;
    setSubmitError(null);

    reportProblem(
      { text: text.trim(), photos },
      {
        onSuccess: () => {
          setIsSent(true);
          setText("");
          setPhotos([]);
          setPhotoError(null);
        },
        onError: (error) => setSubmitError(submitErrorMessage(error)),
      },
    );
  };

  return (
    <Box sx={styles.container}>
      <HeaderMobile title="Raportează o problemă" />

      {isSent ? (
        <Stack spacing={2} alignItems="flex-start" sx={styles.content}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
          <Typography variant="h6" fontWeight={600}>
            Mulțumim! Am primit raportul tău.
          </Typography>
          <Typography color="text.secondary">
            Ne uităm cât mai repede peste problemă. Poți urmări statusul mai
            jos, în „Rapoartele mele”.
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsSent(false)}
          >
            Trimite alt raport
          </Button>
        </Stack>
      ) : (
        <Stack spacing={3} sx={styles.content}>
          <Typography color="text.secondary">
            Ai găsit ceva care nu funcționează? Descrie ce încercai să faci și
            ce s-a întâmplat. Dacă poți, adaugă și capturi de ecran.
          </Typography>

          <Stack spacing={1}>
            <Typography fontWeight={600}>Descrierea problemei</Typography>
            <FormTextarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Ex: Când apăs pe „Rezervă”, pagina rămâne albă."
              maxLength={PROBLEM_TEXT_MAX_LENGTH}
              minRows={5}
              disabled={isPending}
              aria-label="Descrierea problemei"
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" color="text.secondary">
                {trimmedLength < PROBLEM_TEXT_MIN_LENGTH
                  ? `Minimum ${PROBLEM_TEXT_MIN_LENGTH} de caractere`
                  : " "}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {text.length}/{PROBLEM_TEXT_MAX_LENGTH}
              </Typography>
            </Stack>
          </Stack>

          <ProblemPhotosPicker
            photos={photos}
            disabled={isPending}
            onChange={setPhotos}
            onError={setPhotoError}
          />

          {(photoError || submitError) && (
            <Typography color="error.main" variant="body2">
              {submitError ?? photoError}
            </Typography>
          )}

          <Button
            variant="contained"
            disableElevation
            loading={isPending}
            disabled={!isTextValid || isPending}
            onClick={handleSubmit}
            sx={styles.submitButton}
          >
            Trimite raportul
          </Button>
        </Stack>
      )}

      <Box sx={styles.myProblems}>
        <MyProblemsList />
      </Box>
    </Box>
  );
};

export default ReportProblemModule;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  content: {
    px: { xs: 2.5, lg: 0 },
    pt: { xs: 2.5, lg: 0 },
    pb: 4,
  },
  submitButton: {
    alignSelf: { xs: "stretch", lg: "flex-start" },
  },
  myProblems: {
    px: { xs: 2.5, lg: 0 },
    pb: 4,
  },
};
