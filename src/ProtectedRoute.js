import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./context/Context";

function ProtectedRoute({ component: Component, ...rest }) {
  const { login } = useContext(LoginContext);


  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
