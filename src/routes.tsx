import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import AuthLogin  from "./Pages/Login/login";
import Register  from "./Pages/Register/register";
import Dashboard from "./Pages/Dashboard/dashboard"

export default () => (
  <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/login"/>
        )}/>
        <Route path="/login" component={AuthLogin} />
        <Route path="/register" component={Register} />
        <Route path="/:id" component={Dashboard} />
      </Switch>
  </Router>
);