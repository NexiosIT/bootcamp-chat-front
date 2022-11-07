import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../components";
import "../styles/App.css";
import { LoginPage } from "./login";
import { MainPage } from "./main";
import { PageNotFound } from "./notfound";
import { RegisterPage } from "./register";
import { PATH_LOGIN, PATH_REGISTER, PATH_ROOT } from "./routes";

function App() {
	return (
		<div className="app-container">
			<BrowserRouter>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path={PATH_ROOT}element={<MainPage />} />
					</Route>
					<Route path={PATH_LOGIN} element={<LoginPage />} />
					<Route path={PATH_REGISTER} element={<RegisterPage />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
