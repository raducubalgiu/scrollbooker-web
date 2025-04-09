"use client";

import React, { useState } from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignIn() {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		setLoading(true);
		if (!username || !password) return;

		const result = await signIn("credentials", {
			redirect: false,
			username,
			password,
		});

		if (result?.error) {
			setLoading(false);
			// Do something
		} else {
			setLoading(false);
			window.location.replace("/");
		}
	};

	return (
		<Stack alignItems="center" justifyContent="center" sx={{ height: "100vh" }}>
			<Container maxWidth="sm">
				<Stack alignItems="center" justifyContent="center">
					<Typography sx={{ mb: 2.5, fontWeight: "700", fontSize: 25 }}>
						Sign In
					</Typography>
					<TextField
						value={username}
						placeholder="Username"
						onChange={e => setUsername(e.target.value)}
						fullWidth
						sx={{ mb: 1.5 }}
					/>
					<TextField
						value={password}
						placeholder="Password"
						onChange={e => setPassword(e.target.value)}
						type="password"
						fullWidth
						sx={{ mb: 1.5 }}
					/>
					<Button
						variant="contained"
						fullWidth
						loading={loading}
						onClick={handleLogin}
					>
						Login
					</Button>
				</Stack>
			</Container>
		</Stack>
	);
}
