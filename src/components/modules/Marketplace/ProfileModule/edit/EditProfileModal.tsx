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
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { debounce } from "lodash";
import {
  useUpdateProfileMutation,
  UpdateProfilePayload,
} from "@/hooks/mutations/useUpdateProfile";
import { useCheckUsernameAvailability } from "@/controllers/search/search.controller";

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

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 35;

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

  const { reset, handleSubmit, setValue, watch } = methods;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string>(
    profile.avatar || ""
  );

  const [isAvatarChanged, setIsAvatarChanged] = useState<boolean>(false);

  const watchedName = watch("name");
  const watchedUsername = watch("username");
  const watchedBio = watch("bio");

  const [debouncedUsername, setDebouncedUsername] = useState(
    profile.username
  );

  const debouncedSetUsername = useMemo(
    () => debounce((value: string) => setDebouncedUsername(value), 400),
    []
  );

  useEffect(() => {
    debouncedSetUsername(watchedUsername);
    return () => debouncedSetUsername.cancel();
  }, [watchedUsername, debouncedSetUsername]);

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
      setIsAvatarChanged(false);
      setDebouncedUsername(profile.username);
      debouncedSetUsername.cancel();
    }
  }, [open, profile, reset, debouncedSetUsername]);

  const usernameTrimmedLength = watchedUsername.trim().length;
  const isUsernameUnchanged = debouncedUsername === profile.username;
  const isUsernameValidLength =
    usernameTrimmedLength >= USERNAME_MIN_LENGTH &&
    usernameTrimmedLength <= USERNAME_MAX_LENGTH;

  const {
    data: usernameAvailability,
    isLoading: isLoadingUsername,
    isFetching: isFetchingUsername,
  } = useCheckUsernameAvailability(
    isUsernameUnchanged || !isUsernameValidLength ? "" : debouncedUsername
  );

  const isCheckingUsername =
    !isUsernameUnchanged &&
    isUsernameValidLength &&
    (isLoadingUsername || isFetchingUsername);

  const isUsernameAvailable =
    isUsernameUnchanged || usernameAvailability?.available === true;

  const usernameError =
    !isUsernameUnchanged &&
    usernameTrimmedLength > 0 &&
    (!isUsernameValidLength || usernameAvailability?.available === false);

  const usernameHelperText = (() => {
    if (isUsernameUnchanged || usernameTrimmedLength === 0) return undefined;
    if (usernameTrimmedLength < USERNAME_MIN_LENGTH)
      return `Minim ${USERNAME_MIN_LENGTH} caractere`;
    if (usernameTrimmedLength > USERNAME_MAX_LENGTH)
      return `Maxim ${USERNAME_MAX_LENGTH} caractere`;
    if (usernameAvailability?.available === false)
      return "Acest nume de utilizator este deja folosit";
    return undefined;
  })();

  const usernameEndAdornment = (() => {
    if (isUsernameUnchanged || !isUsernameValidLength) return null;
    if (isCheckingUsername) return <CircularProgress size={18} />;
    if (usernameAvailability?.available === true)
      return <CheckIcon color="success" fontSize="small" />;
    if (usernameAvailability?.available === false)
      return <CloseIcon color="error" fontSize="small" />;
    return null;
  })();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue("avatar", file);

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    setIsAvatarChanged(true);
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

  const isFormDirty = useMemo(() => {
    const hasTextChanges =
      watchedName !== profile.fullname ||
      watchedUsername !== profile.username ||
      (watchedBio || null) !== (profile.bio || null);

    return hasTextChanges || isAvatarChanged;
  }, [watchedName, watchedUsername, watchedBio, isAvatarChanged, profile]);

  const isUsernameBlockingSave =
    !isUsernameUnchanged &&
    (!isUsernameValidLength || isCheckingUsername || !isUsernameAvailable);

  const actions: ActionButtonType[] = [
    {
      title: "Salvează",
      props: {
        onClick: handleSubmit(onSubmit),
        disabled: isPending || !isFormDirty || isUsernameBlockingSave,
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
        <Box sx={styles.wrapper}>
          <Stack alignItems="center" justifyContent="center">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Box onClick={handleAvatarClick} sx={styles.avatarContainer}>
              <Avatar src={avatarPreview} sx={styles.avatar} />

              <Box
                className="avatar-overlay"
                sx={[
                  styles.avatarOverlay,
                  (theme) => ({
                    backgroundColor: alpha(theme.palette.common.black, 0.4),
                  }),
                ]}
              >
                <CameraAltIcon sx={styles.cameraIcon} />
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
                  sx={styles.profession}
                >
                  {profile.profession}
                </Typography>
              )}
            </Stack>

            <Stack sx={styles.fieldRow}>
              <Typography variant="body1" sx={styles.fieldLabel(LABEL_WIDTH)}>
                Nume
              </Typography>
              <Input
                name="name"
                placeholder="Nume"
                fullWidth
                rules={{ ...isRequired, ...minLength, ...maxLength }}
              />
            </Stack>

            <Stack sx={styles.fieldRow}>
              <Typography variant="body1" sx={styles.fieldLabel(LABEL_WIDTH)}>
                Utilizator
              </Typography>
              <TextField
                fullWidth
                placeholder="Nume utilizator"
                value={watchedUsername}
                onChange={(e) =>
                  setValue("username", e.target.value, { shouldDirty: true })
                }
                error={usernameError}
                helperText={usernameHelperText}
                slotProps={{
                  input: {
                    endAdornment: usernameEndAdornment ? (
                      <InputAdornment position="end">
                        {usernameEndAdornment}
                      </InputAdornment>
                    ) : undefined,
                  },
                }}
              />
            </Stack>

            <Stack sx={styles.bioRow}>
              <Typography
                variant="body1"
                sx={styles.fieldLabel(LABEL_WIDTH, true)}
              >
                Bio
              </Typography>
              <Box sx={styles.bioInputWrapper}>
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

const styles = {
  wrapper: { p: { md: 2 } },
  avatarContainer: {
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
  },
  avatar: { width: "100%", height: "100%" },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
  },
  cameraIcon: { color: "common.white", fontSize: { xs: 24, md: 32 } },
  profession: { textTransform: "uppercase" as const },
  fieldRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 2,
  },
  bioRow: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
    gap: 2,
  },
  bioInputWrapper: { flexGrow: 1 },
  fieldLabel: (
    labelWidth: { xs: number; sm: number; md: number },
    isBio = false
  ) => ({
    flexBasis: labelWidth,
    flexShrink: 0,
    color: "text.secondary",
    fontWeight: 500,
    ...(isBio ? { pt: 1.5 } : {}),
  }),
};
