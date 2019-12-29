import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";

function App() {
  const { login, logout, userToken, userId, isReady } = useAuth();
  const isUserLoggedIn = !!userToken;
  const routes = useRoutes(isUserLoggedIn);
  return (
    <AuthContext.Provider
      value={{ login, logout, userToken, userId, isUserLoggedIn }}
    >
      {isUserLoggedIn && <NavBar logout={logout} />}
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
