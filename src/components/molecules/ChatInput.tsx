import { Grid, Input } from "@mui/material";
import React from "react";
import styles from "./ChatInput.module.css";

export const ChatInput = () => {
	return (
    <Grid container padding={2} paddingBottom={3} className={styles.chatInputContainer}>
      <Input fullWidth placeholder="Type Message" />
    </Grid>
  )
};
