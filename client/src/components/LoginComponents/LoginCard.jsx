import React from "react";

import InputField from "../InputField/InputField";

const LoginCard = ({ handleChange, handleShowPassword, showPassword }) => {
  return (
    <>
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
    </>
  );
};

export default LoginCard;
