import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./style.js";

const PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$";
const PASSWORD_TEXT =
  "Password must have: \nMinimum of 8 characters \nAnd have at least 1 Uppercase, 1 Lowercase and 1 Number";

const InputField = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  const classes = useStyles();

  return (
    <TextField
      id={name}
      className={classes.textField}
      name={name}
      label={label}
      type={type}
      onChange={handleChange}
      autoFocus={autoFocus}
      variant="outlined"
      fullWidth
      required
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      inputProps={
        name === "password"
          ? {
              pattern: PASSWORD_PATTERN,
              title: PASSWORD_TEXT,
            }
          : {}
      }
    />
  );
};

export default InputField;
