import React from "react";
import { Search } from "@mui/icons-material";
import { Grid, Input } from "@mui/material";
import styles from "./SidebarSearch.module.css";

export const SidebarSearch = () => {

  return (
    <Grid padding={2} className={styles.sidebarSearchContainer} container flexDirection="row">
      <Input fullWidth placeholder="Search Chatrooms" endAdornment={<Search/>} />
    </Grid>
  )
}