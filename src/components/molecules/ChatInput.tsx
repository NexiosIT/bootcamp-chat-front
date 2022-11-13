import React from "react";
import { Send } from "@mui/icons-material";
import { Grid, IconButton, Input } from "@mui/material";
import styles from "./ChatInput.module.css";

export const ChatInput = () => {
	return (
    <Grid container padding={2} paddingTop={1.5} className={styles.chatInputContainer}>
      <Grid item xs={11}>
        <Input fullWidth placeholder="Type Message" />
      </Grid>
      <Grid item xs={1}>
        <IconButton color="primary" size="medium">
          <Send fontSize="large"/>
        </IconButton>
      </Grid>
    </Grid>
  )
};
