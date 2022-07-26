import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./contexts";
import { AppContextProvider } from "./contexts/AppContext";
import "./index.css";
import App from "./pages/App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const theme = createTheme();

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<UserContextProvider>
				<AppContextProvider>
					<App />
				</AppContextProvider>
			</UserContextProvider>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
