import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/userContext.js";

const PrivateWrapper = () => {
  const [userContext, setUserContext] = useUserContext();
  console.log(userContext.token);
  return userContext.token ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateWrapper;
