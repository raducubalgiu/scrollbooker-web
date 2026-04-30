"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/core/Input/Input";
import { required } from "@/utils/validation-rules";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import { UserRegister } from "@/ts/models/auth/auth";

type RegisterForm = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const methods = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isRequired = required();

  const { mutate: handleRegister, isPending } = useMutate({
    key: ["register-user"],
    url: "/api/auth/register",
    options: {
      onSuccess: () => {
        toast.success("Userul a fost inregistrat cu success");
      },
    },
  });

  const onSubmit = (data: RegisterForm) => {
    const registerPayload: UserRegister = {
      email: data.email,
      password: data.password,
      role_name: "client",
    };

    handleRegister(registerPayload);
  };

  return (
    <FormProvider {...methods}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
      >
        <Container maxWidth="sm">
          <Stack>
            <Typography
              variant="h4"
              sx={{ mb: 2.5, fontWeight: 700, textAlign: "center" }}
            >
              Inregistrare
            </Typography>

            <Input
              label="Email"
              name="email"
              rules={isRequired}
              placeholder="Email"
              sx={{ mb: 1.5 }}
              size="medium"
              type="email"
            />

            <Input
              label="Parola"
              name="password"
              type="password"
              rules={isRequired}
              placeholder="Password"
              sx={{ mb: 1.5 }}
              size="medium"
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              loading={isPending}
              onClick={methods.handleSubmit(onSubmit)}
              disableElevation
              sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
            >
              Inregistrare
            </Button>

            <Stack flexDirection="row" alignItems="center" gap={1} my={1.5}>
              <Typography color="text.secondary">Ai deja un cont?</Typography>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </FormProvider>
  );
}
