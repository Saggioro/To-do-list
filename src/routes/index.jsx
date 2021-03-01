import React, { Children } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Todo from "../pages/Todo";

function Routes({ children }) {
  return (
    <BrowserRouter>
      {children}
      <Switch>
        <Route path="/" exact component={Todo}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
