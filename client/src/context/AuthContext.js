import { createContext } from "react";

function pass() {}

export const AuthContext = createContext({
  userToken: null,
  userId: null,
  login: pass,
  logout: pass,
  isAuthenticated: false,
});
