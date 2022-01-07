import React, { useState } from "react";
import {
  Drawer,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

import useStyles from "./style.js";
import logoWhite from "../../images/Logo_white.svg";

const styledProps = { drawerWidth: 240 };

const Sidebar = ({ window, mobileOpen, handleDrawerToggle }) => {
  const [selectedLink, setSelectedLink] = useState(0);

  const classes = useStyles(styledProps);
  const itemLists = [
    {
      text: "dashboard",
      logo: <DashboardRoundedIcon />,
      onClick: () => {
        setSelectedLink(0);
      },
    },
    {
      text: "add subject",
      logo: <LibraryBooksRoundedIcon />,
      onClick: () => {
        setSelectedLink(1);
      },
    },
    {
      text: "add student",
      logo: <GroupAddRoundedIcon />,
      onClick: () => {
        setSelectedLink(2);
      },
    },
    {
      text: "search",
      logo: <SearchRoundedIcon />,
      onClick: () => {
        setSelectedLink(3);
      },
    },
  ];

  const drawer = (
    <div style={{ height: "100vh", position: "relative" }}>
      <div className={classes.toolbar}>
        <img src={logoWhite} alt="Logo" className={classes.logo} />
      </div>
      <Divider classes={{ root: classes.divider }} light />
      <List className={classes.list}>
        {itemLists.map((item, index) => {
          return (
            <ListItem
              button
              key={index}
              className={classes.listItem}
              classes={{ selected: classes.selected, root: classes.root }}
              selected={index === selectedLink ? true : false}
              onClick={item.onClick}
            >
              <ListItemIcon className={classes.icon}>{item.logo}</ListItemIcon>
              <ListItemText primary={item.text.toUpperCase()} />
            </ListItem>
          );
        })}
      </List>
      <Button
        className={classes.logout}
        startIcon={<ExitToAppRoundedIcon />}
        fullWidth
      >
        LOGOUT
      </Button>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="dashboard folders">
      <Hidden smUp implementation="js">
        <Drawer
          container={container}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default Sidebar;
