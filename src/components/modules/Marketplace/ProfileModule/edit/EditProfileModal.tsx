import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import {
  UserProfile,
  UserProfileUpdateResponse,
} from "@/ts/models/user/UserProfile";
import { maxField, minField, required } from "@/utils/validation-rules";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  useUpdateProfileMutation,
  UpdateProfilePayload,
} from "@/hooks/mutations/useUpdateProfile";

type EditProfileModalProps = {
  profile: UserProfile;
  open: boolean;
  handleClose: () => void;
  onProfileUpdated: (update: UserProfileUpdateResponse) => void;
};

type ProfileFormValues = {
  name: string;
  username: string;
  bio: string | null;
  avatar: File | string | null;
};

const EditProfileModal = ({
  profile,
  open,
  handleClose,
  onProfileUpdated,
}: EditProfileModalProps) => {
  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      name: profile.fullname,
      username: profile.username,
      bio: profile.bio,
      avatar: profile.avatar || "",
    },
  });

  const { reset, handleSubmit, setValue } = methods;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    profile.avatar || ""
  );

  const { mutate, isPending } = useUpdateProfileMutation((updatedUser) => {
    onProfileUpdated(updatedUser);
    handleClose();
  });

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(35);

  useEffect(() => {
    if (open) {
      reset({
        name: profile.fullname,
        username: profile.username,
        bio: profile.bio,
        avatar: profile.avatar || "",
      });
      setAvatarPreview(profile.avatar || "");
    }
  }, [open, profile, reset]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue("avatar", file);
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const onSubmit = (data: ProfileFormValues) => {
    const payload: UpdateProfilePayload = {
      name: data.name,
      username: data.username,
      bio: data.bio,
      avatar: data.avatar,
    };
    mutate(payload);
  };

  const actions: ActionButtonType[] = [
    {
      title: isPending ? "Se salvează..." : "Salvează",
      props: {
        onClick: handleSubmit(onSubmit),
        disabled: isPending,
        loading: isPending,
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
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Box
              onClick={handleAvatarClick}
              sx={{
                position: "relative",
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                my: { xs: 2.5, md: 0 },
                cursor: "pointer",
                borderRadius: "50%",
                overflow: "hidden",
                "&:hover .avatar-overlay": {
                  opacity: 1,
                },
              }}
            >
              <Avatar
                src={avatarPreview}
                sx={{ width: "100%", height: "100%" }}
              />

              <Box
                className="avatar-overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.2s ease-in-out",
                }}
              >
                <CameraAltIcon
                  sx={{ color: "#fff", fontSize: { xs: 24, md: 32 } }}
                />
              </Box>
            </Box>
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
