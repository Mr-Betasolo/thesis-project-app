import React from "react";

import InputField from "../InputField/InputField";

const LoginCard = ({
  handleChange,
  handleShowPassword,
  showPassword,
  error,
}) => {
  return (
    <>
      <InputField
        name="email"
        label="Email"
        autoFocus
        type="email"
        error={error}
        handleChange={handleChange}
      />
      <InputField
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        handleShowPassword={handleShowPassword}
        handleChange={handleChange}
        error={error}
      />
    </>
  );
};

export default LoginCard;
