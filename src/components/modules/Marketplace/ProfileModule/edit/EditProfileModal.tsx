import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import FormTextarea from "@/components/core/Input/FormTextarea";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import { UserProfile } from "@/ts/models/user/UserProfile";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Avatar, Box, Stack, Typography } from "@mui/material";
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
  const { reset } = methods;
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
      title: "Renunta",
      props: {
        variant: "outlined",
        color: "secondary",
        onClick: () => {},
        sx: {
          py: 1.5,
          px: 2,
        },
      },
    },
    {
      title: "Salvează",
      props: {
        onClick: () => {},
        sx: {
          py: 1.5,
          px: 2,
          ml: 1,
        },
      },
    },
  ];

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
    >
      <FormProvider {...methods}>
        <Box sx={{ p: 2 }}>
          <Stack alignItems="center" justifyContent="center">
            <Avatar
              src={profile.avatar ?? ""}
              sx={{ width: 150, height: 150 }}
            />
          </Stack>
          <Box sx={{ mt: 2 }}>
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

            <Stack flexDirection="row" alignItems="center" gap={5} mb={2}>
              <Typography variant="h6" width={250} color="text.secondary">
                Nume
              </Typography>
              <Input
                name="name"
                placeholder="Nume"
                label=""
                rules={{ ...isRequired, ...minLength, ...maxLength }}
              />
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={5} mb={2}>
              <Typography variant="h6" width={250} color="text.secondary">
                Nume utilizator
              </Typography>
              <Input
                name="username"
                placeholder="Nume utilizator"
                label=""
                rules={{ ...isRequired, ...minLength, ...maxLength }}
              />
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap={5} mb={2}>
              <Typography variant="h6" width={250} color="text.secondary">
                Bio
              </Typography>
              <FormTextarea
                name="bio"
                placeholder="Bio"
                minRows={1}
                maxRows={1}
                maxLength={255}
              />
            </Stack>
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default EditProfileModal;
