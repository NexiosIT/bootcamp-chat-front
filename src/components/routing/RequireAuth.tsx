import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts";
import { PATH_LOGIN } from "../../pages/routes";

export const RequireAuth = () => {
  const { user, jwt } = useUserContext();
  const isAuthenticated = user !== undefined;
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={PATH_LOGIN} state={{ from: location }} />;
  }

  return <Outlet />;
}