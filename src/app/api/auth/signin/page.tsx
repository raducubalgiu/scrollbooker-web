"use client";

import React, { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";
import { required } from "@/utils/validation-rules";
import { toast } from "react-toastify";

export default function SignIn() {
	const methods = useForm({ defaultValues: { username: "", password: "" } });
	const { handleSubmit } = methods;
	const [loading, setLoading] = useState(false);
	const isRequired = required();

	const handleLogin = async (data: { username: string; password: string }) => {
		const { username, password } = data;
		setLoading(true);

		const result = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});

		if (result?.error) {
			toast("Ceva nu a mers cum trebuie. Încearcă mai târziu");
			setLoading(false);
		} else {
			setLoading(false);
			window.location.replace("/");
		}
	};

	return (
		<FormProvider {...methods}>
			<Stack
				alignItems="center"
				justifyContent="center"
				sx={{ height: "100vh" }}
			>
				<Container maxWidth="sm">
					<Stack alignItems="center" justifyContent="center">
						<Typography sx={{ mb: 2.5, fontWeight: "700", fontSize: 25 }}>
							Sign In
						</Typography>
						<Input
							name="username"
							rules={isRequired}
							placeholder="Username"
							sx={{ mb: 1.5 }}
						/>
						<Input
							name="password"
							type="password"
							rules={isRequired}
							placeholder="Password"
							sx={{ mb: 1.5 }}
						/>
						<Button
							variant="contained"
							fullWidth
							loading={loading}
							onClick={handleSubmit(handleLogin)}
						>
							Login
						</Button>
					</Stack>
				</Container>
			</Stack>
		</FormProvider>
	);
}
