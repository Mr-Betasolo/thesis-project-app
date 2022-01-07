import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // Sidebar styles
  drawer: (props) => ({
    backgroundColor: "#222222",
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
      minWidth: `${props.drawerWidth}px`,
      flexShrink: 0,
    },
  }),
  drawerPaper: (props) => ({
    backgroundColor: "#3D5A80",
    color: "#fff",
    minWidth: `${props.drawerWidth}px`,
  }),
  toolbar: theme.mixins.toolbar,
  logo: {
    display: "block",
    width: "8rem",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(2),
  },
  divider: {
    background: "#bbbbbb",
    margin: 0,
  },
  list: {
    margin: theme.spacing(2),
  },
  listItem: {
    borderRadius: "1.5625rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: theme.spacing(1),
    transition: theme.transitions.create(["background"], {
      duration: theme.transitions.duration.complex,
    }),
  },
  icon: {
    color: "#fff",
    paddingLeft: theme.spacing(2),
  },
  root: {
    "&$selected": {
      background: "rgba(255, 255, 255, 0.1)",
      // "&:hover": {
      //   backgroundColor: "yellow",
      // },
    },
  },
  selected: {
    background: "rgba(255, 255, 255, 0.1)",
  },
  logout: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    color: "#fff",
    // marginTop: theme.spacing(24),
    position: "absolute",
    bottom: "2.8rem",
  },

  // Appbar styles
  appBar: (props) => ({
    backgroundColor: "#fff",
    color: "#293241",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props.drawerWidth,
    },
  }),
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    position: "absolute",
    right: "3rem",
  },
}));

export default useStyles;
