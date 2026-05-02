import React from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Grid2 as Grid,
  Alert,
  Avatar,
  Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const CollectBusinessValidationStep = () => {
  const nextSteps = [
    {
      icon: <PersonAddOutlinedIcon color="primary" />,
      title: "Contul angajatului",
      description:
        "Colegul tău își creează un cont simplu de utilizator în aplicație.",
    },
    {
      icon: <MailOutlineIcon color="primary" />,
      title: "Invitația ta",
      description:
        "Îi trimiți o invitație de colaborare direct din panoul tău de control.",
    },
    {
      icon: <EventAvailableIcon color="primary" />,
      title: "Activare calendar",
      description:
        "După acceptare, acesta primește automat propriul calendar de lucru.",
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mt: 5 }}>
      <Stack alignItems="center" spacing={2} mb={6}>
        <CheckCircleOutlineIcon sx={{ fontSize: 70, color: "success.main" }} />
        <Typography variant="h3" sx={{ fontWeight: 800 }}>
          Felicitări! Ai finalizat configurarea
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
          Am primit toate detaliile despre business-ul tău. Echipa noastră va
          revizui aplicația și te vom anunța imediat ce contul este aprobat.
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ color: "text.secondary" }}
        >
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">
            De obicei, răspundem în mai puțin de 15 minute
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 6 }} />

      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Ce urmează să se întâmple?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          După validarea locației, vei putea să îți adaugi echipa pentru a primi
          programări. Iată cum funcționează procesul:
        </Typography>

        <Grid container spacing={3}>
          {nextSteps.map((step, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  borderColor: "divider",
                  bgcolor: "background.default",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    color: "primary.main",
                    mb: 2,
                    width: 48,
                    height: 48,
                  }}
                >
                  {step.icon}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Alert
        severity="info"
        variant="outlined"
        sx={{
          mt: 6,
          borderRadius: 3,
          textAlign: "left",
          "& .MuiAlert-message": { width: "100%" },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Nu îți face griji, procesul este foarte simplu!
        </Typography>
        <Typography variant="body2">
          Vei găsi un ghid video complet și suport pas cu pas în aplicație
          imediat ce te loghezi.
        </Typography>
      </Alert>
    </Box>
  );
};

export default CollectBusinessValidationStep;
