import React, { useState } from "react";
import { Typography, Grid, Paper, Button, Avatar } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

import LoginCard from "../../components/LoginComponents/LoginCard";
import SignupCard from "../../components/LoginComponents/SignupCard";
import LeftSection from "../../components/LoginComponents/LeftSection";
import useStyles from "./styles.js";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [signupDetails, setSignupDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!isSignup) {
      setLoginDetails({ ...loginDetails, [name]: value });
    } else {
      setSignupDetails({ ...signupDetails, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignup) {
      console.log(loginDetails);
    } else {
      console.log(signupDetails);
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <LeftSection isSignup={isSignup} />
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className={classes.paper}>
            <Avatar className={classes.avatar}>
              {isSignup ? (
                <LockOpenOutlinedIcon />
              ) : (
                <AccountCircleOutlinedIcon />
              )}
            </Avatar>
            <Typography
              variant="h4"
              align="center"
              className={classes.loginText}
            >
              {isSignup ? "SIGN UP" : "LOGIN"}
            </Typography>
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              className={classes.form}
            >
              {isSignup ? (
                <SignupCard
                  handleChange={handleChange}
                  handleShowPassword={handleShowPassword}
                  showPassword={showPassword}
                />
              ) : (
                <LoginCard
                  handleChange={handleChange}
                  handleShowPassword={handleShowPassword}
                  showPassword={showPassword}
                />
              )}
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
              >
                {isSignup ? "SIGN UP" : "LOGIN"}
              </Button>
              <Typography align="center">
                {isSignup
                  ? "Already have an account ? "
                  : "Don't have an account yet ? "}
                <span
                  className={classes.link}
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? "Go to Login" : "Create an Account"}
                </span>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
