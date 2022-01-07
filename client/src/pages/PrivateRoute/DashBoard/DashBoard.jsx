import React, { useState } from "react";

import Sidebar from "../../../components/DashboardComponents/Sidebar";
import AppBar from "../../../components/DashboardComponents/Appbar";

import useStyles from "./style.js";

const DashBoard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div className={classes.root}>
      <AppBar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </div>
  );
};

export default DashBoard;
