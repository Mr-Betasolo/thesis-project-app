import React from "react";

import useStyles from "./style";
import InputField from "../InputField/InputField";

const SignupCard = ({ handleChange, handleShowPassword, showPassword }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.flex}>
        <InputField
          name="fname"
          label="First Name"
          autoFocus
          type="text"
          handleChange={handleChange}
        />
        <InputField
          name="lname"
          label="Last Name"
          type="text"
          handleChange={handleChange}
        />
      </div>
      <InputField
        name="email"
        label="Email"
        type="email"
        handleChange={handleChange}
      />
      <InputField
        name="password"
        label="Create Password"
        type={showPassword ? "text" : "password"}
        handleShowPassword={handleShowPassword}
        handleChange={handleChange}
      />
    </>
  );
};

export default SignupCard;
