import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(to right, #98c1d9 65%, #ffffff 35%);",
    height: "100vh",
    overflow: "hidden",
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      background: "#98c1d9",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5),
    borderRadius: "3.125rem",
    maxWidth: "29rem",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  loginText: {
    color: theme.palette.primary,
    fontWeight: "bold",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  button: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
  },
  link: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  error: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    width: "100%",
    padding: "1rem .5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "3%",
    [theme.breakpoints.down("sm")]: {
      padding: ".5rem 1rem",
    },
  },
}));

export default useStyles;
