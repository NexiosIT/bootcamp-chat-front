import React, { useState, useMemo } from "react";
import { Grid } from "@mui/material";
import { ChatView } from "./components/chatview/ChatView";
import { Sidebar } from "./components/sidebar/Sidebar";
import { CreateMessageRequest } from "../../types";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts";
import { CreateMessage } from "../../api/Chatmessage";

export const MainPage = () => {
  const { selectedChatroom } = useAppContext();
  const { jwt } = useUserContext();
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);

	const handleSubmitMessage = async (message: string) => {
    setSubmitLoading(true);

    if (selectedChatroom && jwt) {
      const request: CreateMessageRequest = {
        chatroom: selectedChatroom.id,
        user: "637a3ce32665c902ebf25b29", // TODO: hardcoded id because no user fetch yet
        data: message
      }

      const response = await CreateMessage(jwt, request);

      

    }


  };

	return (
		<Grid container spacing={0} direction="row" alignItems="flex-start" justifyContent="flex-start">
			<Sidebar />
			<ChatView submitMessageLoading={submitLoading} onSubmitMessage={handleSubmitMessage} />
		</Grid>
	);
};
