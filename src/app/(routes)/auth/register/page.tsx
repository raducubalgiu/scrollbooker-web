"use client";

import { Button, Container, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/core/Input/Input";
import { required } from "@/utils/validation-rules";
import { toast } from "react-toastify";
import { UserRegister } from "@/ts/models/auth/auth";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn, SignInResponse, useSession } from "next-auth/react";

type RegisterForm = {
  email: string;
  password: string;
};

interface BackendError {
  detail: string | Array<{ msg: string; loc: string[] }>;
}

export default function RegisterPage() {
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isRequired = required();

  const onSubmit = async (data: RegisterForm): Promise<void> => {
    setLoading(true);

    const registerPayload: UserRegister = {
      email: data.email,
      password: data.password,
      role_name: "business",
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT}/auth/register`,
        registerPayload
      );

      const result: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        username: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Cont creat, dar autentificarea automată a eșuat.");
        router.push("/auth/signin");
        return;
      }

      await update();

      toast.success("Cont creat cu succes!");
      router.refresh();
    } catch (error: unknown) {
      let message = "Eroare la înregistrare.";

      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<BackendError>;
        const detail = axiosError.response?.data?.detail;

        if (typeof detail === "string") {
          message = detail;
        } else if (Array.isArray(detail)) {
          message = detail[0]?.msg || message;
        }
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
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
              loading={loading}
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
