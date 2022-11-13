import React from "react";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import styles from "./SidebarHeader.module.css";

export const SidebarHeader = () => {
  return (
    <Grid container padding={1} className={styles.sidebarHeaderContainer}>
      <Grid item xs={10}>
        <Avatar sx={{ width: 42, height: 42 }}>
          <Typography>JD</Typography>
        </Avatar>
      </Grid>
      <Grid paddingTop={0.5} item xs={2}>
        <IconButton size="small">
          <MoreVert fontSize="medium"/>
        </IconButton>
      </Grid>
    </Grid>
  )
}