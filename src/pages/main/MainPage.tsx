import React, { useState } from "react";
import { Grid } from "@mui/material";
import { ChatView } from "./components/chatview/ChatView";
import { Sidebar } from "./components/sidebar/Sidebar";
import { CreateMessageRequest } from "../../types";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts";
import { CreateMessage } from "../../api/Chatmessage";
import { LoadingPage } from "../loading/LoadingPage";

export const MainPage = () => {
	const { selectedChatroom, appLoading } = useAppContext();
	const { jwt, user } = useUserContext();
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);

	const handleSubmitMessage = async (message: string) => {
		setSubmitLoading(true);

		if (selectedChatroom && jwt && user && user.id) {
			const request: CreateMessageRequest = {
				chatroom: selectedChatroom.id,
				user: user.id,
				data: message,
			};

			await CreateMessage(jwt, request);

			// websocket will load new message
		}

		setSubmitLoading(false);
	};

	if (appLoading) return <LoadingPage />;

	return (
		<Grid container spacing={0} direction="row" alignItems="flex-start" justifyContent="flex-start">
			<Sidebar />
			<ChatView submitMessageLoading={submitLoading} onSubmitMessage={handleSubmitMessage} />
		</Grid>
	);
};
