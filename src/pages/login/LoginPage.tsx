import { Card, Container, Grid } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Center } from "../../components";
import { LoginForm } from "./components/LoginForm";

export const LoginPage = () => {
	const navigate = useNavigate();

	const handleLoginSuccess = useCallback(() => {
		navigate("/", { replace: true });
	}, []);

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: "100vh" }}
		>
			<Grid item xs={3}>
				<LoginForm onSuccess={handleLoginSuccess} />
			</Grid>
		</Grid>
	);
};
