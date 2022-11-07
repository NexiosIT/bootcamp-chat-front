import React from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import styles from "./LoginForm.module.css";
import { useUserContext } from "../../../contexts";
import { PATH_REGISTER } from "../../routes";

export interface ILoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({onSuccess}: ILoginFormProps) => {
	const { logIn, loading } = useUserContext();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const email = data.get("email")?.toString();
		const password = data.get("password")?.toString();

		console.log("Logging in user:", {
			email,
			password,
		});

		if (email && password) {
			const result = await logIn(email, password);
      console.log("login result", result)
			if (result && result.isSuccess) {
				// login succesfull, call success callback
        onSuccess();
			} else {
        // login failed, display error: TODO
      }
		}
	};

	return (
		<Box className={styles.loginFormContainer}>
			<Typography variant="h4">Sign In</Typography>
			<Box component="form" onSubmit={handleSubmit}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
					Sign In
				</Button>
				<Link href={PATH_REGISTER} variant="body2">
					Don't have an account? Sign Up
				</Link>
			</Box>
		</Box>
	);
};
