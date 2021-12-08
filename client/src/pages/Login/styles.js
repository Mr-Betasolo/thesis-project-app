import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(to right, #98c1d9 65%, #ffffff 35%);",
    height: "100vh",
    overflow: "hidden",
    padding: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5),
    borderRadius: "3.125rem",
    maxWidth: "29rem",
    [theme.breakpoints.down("sm")]: {
      margin: "2rem auto",
    },
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  loginText: {
    color: theme.palette.primary,
    fontWeight: "bold",
  },
  signInBtn: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold,
  },
  textContainer: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  text: {
    fontWeight: theme.typography.fontWeightBold,
    color: "#ffffff",
  },
  leftGrid: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "90%",
    display: "block",
    marginLeft: "auto",
  },
}));

export default useStyles;
