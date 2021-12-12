import React, { useState } from "react";
import { Typography, Grid, Paper, Button, Avatar } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import LoginCard from "../../components/AuthComponents/LoginCard";
import SignupCard from "../../components/AuthComponents/SignupCard";
import LeftSection from "../../components/AuthComponents/LeftSection";
import useStyles from "./styles.js";
import { login, signup } from "../../actions/authActions.js";

const Auth = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      const data = signup(user);
      console.log(data);
      reset();
    } else {
      const { email, password } = user;
      login({ email, password });
    }
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleLink = () => {
    reset();
    setIsSignup(!isSignup);
  };
  const reset = () => {
    setShowPassword(false);
    setUser({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <LeftSection isSignup={isSignup} />
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AccountCircleOutlinedIcon />
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
                <span className={classes.link} onClick={handleToggleLink}>
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

export default Auth;
