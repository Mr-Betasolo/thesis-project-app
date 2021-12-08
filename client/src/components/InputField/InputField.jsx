import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import useStyles from "./style.js";

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
    />
  );
};

export default InputField;
