import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";

function App() {
  const { login, logout, userToken, userId } = useAuth();
  const isUserLoggedIn = !!userToken;

  const [searchPattern, setSearchPattern] = React.useState("");
  const routes = useRoutes(isUserLoggedIn, searchPattern);

  return (
    <AuthContext.Provider value={{ login, logout, userToken, userId, isUserLoggedIn }}>
      {isUserLoggedIn && <NavBar setSearchPattern={setSearchPattern} />}
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
