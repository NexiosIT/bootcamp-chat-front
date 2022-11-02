import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../components";
import "../styles/App.css";
import { LoginPage } from "./login";
import { MainPage } from "./main";
import { PageNotFound } from "./notfound";
import { RegisterPage } from "./register";

function App() {
	return (
		<div className="app-container">
			<BrowserRouter>
				<Routes>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<MainPage />} />
					</Route>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
