import React, { useState } from "react";
import { Typography, Grid, Paper, Button, Avatar } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

import LoginCard from "../../components/AuthComponents/LoginCard";
import SignupCard from "../../components/AuthComponents/SignupCard";
import LeftSection from "../../components/AuthComponents/LeftSection";
import { useUserContext } from "../../context/userContext.js";
import { loginUser, signupUser } from "../../api/index.js";
import useStyles from "./styles.js";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [userContext, setUserContext] = useUserContext();
  const navigate = useNavigate();

  const classes = useStyles();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSignup) {
      loginUser({
        email: userData.email,
        password: userData.password,
      })
        .then((res) => {
          // if successful
          console.log(res.data.token);
          setUserContext((prevValues) => {
            return { ...prevValues, token: res.data.token };
          });
          reset();
          console.log(userContext);
          navigate("/dashboard");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            setError({
              isError: true,
              message: "Invalid email and password combination.",
            });
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
            setError({
              isError: true,
              message: "Something went wrong! Please try again later.",
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
            setError({ isError: true, message: err.message });
          }
        });
    } else {
      signupUser(userData)
        .then((res) => {
          // if successful
          console.log(res.data.token);
          setUserContext((prevValues) => {
            return { ...prevValues, token: res.data.token };
          });
          reset();
          console.log(userContext);
          navigate("/dashboard");
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            setError({
              isError: true,
              message: err.response.data.message,
            });
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
            setError({
              isError: true,
              message: "Something went wrong! Please try again later.",
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
            setError({ isError: true, message: err.message });
          }
        });
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
    setError({ isError: false, message: "" });
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <LeftSection isSignup={isSignup} />
        <Grid item md={6} sm={12}>
          <Paper elevation={3} className={classes.paper}>
            {error.isError && (
              <div className={classes.error}>
                <ErrorOutlineOutlinedIcon color="primary" />
                <Typography variant="body2">{error.message}</Typography>
              </div>
            )}
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
                  error={error.isError}
                />
              ) : (
                <LoginCard
                  handleChange={handleChange}
                  handleShowPassword={handleShowPassword}
                  showPassword={showPassword}
                  error={error.isError}
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
