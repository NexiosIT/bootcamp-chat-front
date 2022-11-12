import React from "react";
import { Avatar, Grid, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import styles from "./SidebarHeader.module.css";

export const SidebarHeader = () => {
  return (
    <Grid container padding={2} spacing={2} className={styles.sidebarHeaderContainer}>
      <Grid item xs={10}>
        <Avatar sx={{ width: 54, height: 54 }}>JVD</Avatar>
      </Grid>
      <Grid item xs={2}>
        <IconButton>
          <MoreVert fontSize="large"/>
        </IconButton>
      </Grid>
    </Grid>
  )
}