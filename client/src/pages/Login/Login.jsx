import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Hidden,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import InputField from "../../components/InputField/InputField";
import loginImage from "../../images/login_image.svg";
import useStyles from "./styles.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const handleChange = () => {};
  const handleSubmit = () => {};
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} alignItems="center">
          <Hidden smDown>
            <Grid item md={6} className={classes.leftGrid}>
              <div className={classes.textContainer}>
                <Typography
                  variant="h3"
                  align="center"
                  className={classes.text}
                >
                  Welcome Back
                </Typography>
                <Typography variant="h6" component="p" align="center">
                  Nice to see you again
                </Typography>
              </div>
              <span></span>
              <img src={loginImage} alt="security" className={classes.image} />
            </Grid>
          </Hidden>
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
                LOGIN
              </Typography>
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.form}
              >
                <InputField
                  name="email"
                  label="Email"
                  autoFocus
                  type="email"
                  handleChange={handleChange}
                />
                <InputField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  handleChange={handleChange}
                />
                <Button
                  className={classes.signInBtn}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                >
                  SIGN IN
                </Button>
                <Typography align="center">
                  Don't have an account yet?{" "}
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "none",
                      color: "#EE6C4D",
                    }}
                  >
                    Create an Account
                  </Link>
                </Typography>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
