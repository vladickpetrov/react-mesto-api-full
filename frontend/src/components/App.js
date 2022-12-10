import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { checkToken } from "../utils/auth";
import Login from "./Login";
import Mesto from "./Mesto";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  function handleLogIn(email) {
    setLoggedIn(true);
  }

  useEffect(() => {
    checkAppToken();
  }, []);

  function checkAppToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            const email = res.data.email;
            setLoggedIn(true);
            setEmail(email);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        loggedIn={loggedIn}
        component={Mesto}
        email={email}
      />
      <Route path="/login">
        <Login handleLogIn={handleLogIn} history={history} />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
