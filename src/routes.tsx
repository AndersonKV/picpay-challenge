import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Payment from "./components/Payment";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/payment" component={Payment} />
      </Switch>
    </BrowserRouter>
  );
}
