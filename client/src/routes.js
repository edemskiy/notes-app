import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import NotesPage from "./pages/NotesPage";

export const useRoutes = isLogin => {
  if (isLogin) {
    return (
      <Switch>
        <Route path="/notes" exact>
          <NotesPage />
        </Route>
        <Redirect to={"/notes"} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        <Redirect to={"/"} />
      </Switch>
    );
  }
};
