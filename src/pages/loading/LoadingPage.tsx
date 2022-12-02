import React from "react";
import { CircularProgress, Grid } from "@mui/material";

export const LoadingPage = () => (
	<Grid
		container
		spacing={0}
		direction="column"
		alignItems="center"
		justifyContent="center"
		style={{ minHeight: "100vh" }}
	>
		<Grid item xs={3}>
			<CircularProgress size={84} />
		</Grid>
	</Grid>
);
