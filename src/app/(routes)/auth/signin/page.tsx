"use client";

import React, { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import Input from "@/components/core/Input/Input";
import { required } from "@/utils/validation-rules";

type SignInForm = {
  username: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<SignInForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const isRequired = required();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (data: SignInForm) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Username sau parolă greșită.");
      return;
    }

    router.replace(result?.url || callbackUrl);
    router.refresh();
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
              Conectare
            </Typography>

            <Input
              label="Username sau email"
              name="username"
              rules={isRequired}
              placeholder="Username sau email"
              sx={{ mb: 1.5 }}
              size="medium"
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
              onClick={methods.handleSubmit(handleLogin)}
              disableElevation
              sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
            >
              Login
            </Button>

            <Stack flexDirection="row" alignItems="center" gap={1} my={1.5}>
              <Typography color="text.secondary">
                Nu ai încă un cont?
              </Typography>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => router.push("/auth/register")}
              >
                Înregistrare
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </FormProvider>
  );
}
