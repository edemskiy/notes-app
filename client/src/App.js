import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { login, logout, userToken, userId, isReady } = useAuth();
  const userLoggedIn = !!userToken;
  const routes = useRoutes(userLoggedIn);
  return (
    <AuthContext.Provider
      value={{ login, logout, userToken, userId, userLoggedIn }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
