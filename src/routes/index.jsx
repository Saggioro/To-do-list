import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Todo from "../pages/Todo";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Todo}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
