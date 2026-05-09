import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import { UserProfile } from "@/ts/models/user/UserProfile";
import { maxField, minField, required } from "@/utils/validation-rules";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type EditProfileModalProps = {
  profile: UserProfile;
  open: boolean;
  handleClose: () => void;
};

const EditProfileModal = ({
  profile,
  open,
  handleClose,
}: EditProfileModalProps) => {
  const methods = useForm({
    defaultValues: {
      name: profile.fullname,
      username: profile.username,
      bio: profile.bio,
    },
  });
  const { reset, handleSubmit } = methods;
  const isRequired = required();
  const minLength = minField(35);
  const maxLength = maxField(35);

  useEffect(() => {
    if (open) {
      reset({
        name: profile.fullname,
        username: profile.username,
        bio: profile.bio,
      });
    }
  }, [open, profile, reset]);

  const actions: ActionButtonType[] = [
    {
      title: "Salvează",
      props: {
        onClick: handleSubmit((data) => console.log(data)),
        sx: {
          py: 1.5,
          px: 2,
          ml: 1,
        },
      },
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const LABEL_WIDTH = { xs: 110, sm: 140, md: 180 };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Editează profilul"
      align="left"
      maxWidth="md"
      fullWidth
      actions={actions}
      dividers={false}
      fullScreen={isMobile}
    >
      <FormProvider {...methods}>
        <Box sx={{ p: { md: 2 } }}>
          <Stack alignItems="center" justifyContent="center">
            <Avatar
              src={profile.avatar ?? ""}
              sx={{
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                my: { xs: 2.5, md: 0 },
              }}
            />
          </Stack>

          <Stack sx={{ mt: 2, p: 2.5 }} gap={2.5}>
            <Stack flexDirection="row" alignItems="center" gap={1} mb={2}>
              <Typography variant="h5" fontWeight={600}>
                {profile.fullname}
              </Typography>
              {profile.is_business_or_employee && (
                <Typography
                  variant="caption"
                  color="primary"
                  sx={{ textTransform: "uppercase" }}
                >
                  {profile.profession}
                </Typography>
              )}
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                sx={{
                  flexBasis: LABEL_WIDTH,
                  flexShrink: 0,
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                Nume
              </Typography>
              <Input
                name="name"
                placeholder="Nume"
                fullWidth
                rules={{ ...isRequired, ...minLength, ...maxLength }}
              />
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                sx={{
                  flexBasis: LABEL_WIDTH,
                  flexShrink: 0,
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                Utilizator
              </Typography>
              <Input
                name="username"
                placeholder="Nume utilizator"
                fullWidth
                rules={{ ...isRequired, ...minLength, ...maxLength }}
              />
            </Stack>

            <Stack flexDirection="row" alignItems="flex-start" gap={2}>
              <Typography
                variant="body1"
                sx={{
                  flexBasis: LABEL_WIDTH,
                  flexShrink: 0,
                  color: "text.secondary",
                  fontWeight: 500,
                  pt: 1.5,
                }}
              >
                Bio
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Input
                  name="bio"
                  placeholder="Scrie ceva despre tine..."
                  minRows={4}
                  maxRows={6}
                  multiline
                />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default EditProfileModal;
