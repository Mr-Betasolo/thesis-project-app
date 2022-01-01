import React, { useEffect, useCallback, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../context/userContext.js";
import Loader from "../../components/Loader/Loader";

const PrivateWrapper = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch("http://localhost:8081/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return userContext.token === null ? (
    <Navigate to="/auth" />
  ) : userContext.token ? (
    <Outlet />
  ) : (
    <Loader />
  );
};

export default PrivateWrapper;
