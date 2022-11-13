import React from "react";
import { Grid } from "@mui/material";
import { ChatView } from "./components/chatview/ChatView";
import { Sidebar } from "./components/sidebar/Sidebar";

export const MainPage = () => {

  return (
    <Grid
			container
			spacing={0}
			direction="row"
			alignItems="flex-start"
			justifyContent="flex-start"
		>
      <Sidebar/>
      <ChatView/>
    </Grid>
  )
}