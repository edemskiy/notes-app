import React, { useState, useContext } from "react";
import { useRequest } from "../../hooks/request";
import { AuthContext } from "../../context/AuthContext";
import InfoMessage from "../../components/InfoMessage";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

import "./AuthPage.scss";

export default function AuthPage() {
  const { login } = useContext(AuthContext);
  const { isLoading, request, error, clearError } = useRequest();
  const [infoMessageVisible, setInfoMessageVisible] = useState(false);
  const [infoMessageText, setInfoMessageText] = useState("");
  function onInfoMessageClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setInfoMessageText("");
    setInfoMessageVisible(false);
    clearError();
  }

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  function inputCredentialsHandler(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  function registerHandler() {
    request("/api/auth/register", "POST", { ...credentials }).then((data) => {
      setInfoMessageText(data.message);
      setInfoMessageVisible(true);
    });
  }

  function loginHandler() {
    request("/api/auth/login", "POST", { ...credentials })
      .then((data) => {
        if (data.userToken && data.userId) {
          return login(data.userToken, data.userId);
        }
        setInfoMessageText(data.message);
        setInfoMessageVisible(true);
      })
      .catch((err) => null);
  }

  return (
    <>
      <Container>
        <div className="auth_card">
          <h1>Login or register</h1>
          <TextField onChange={inputCredentialsHandler} label="email" name="email" type="text" disabled={isLoading} />
          <TextField
            onChange={inputCredentialsHandler}
            label="password"
            name="password"
            type="password"
            disabled={isLoading}
          />
          <div className="auth_buttons">
            <button disabled={isLoading} onClick={loginHandler}>
              Login
            </button>
            <button disabled={isLoading} onClick={registerHandler}>
              Register
            </button>
          </div>
        </div>
      </Container>
      <InfoMessage
        visible={infoMessageVisible}
        message={infoMessageText}
        onClose={onInfoMessageClose}
        variant={error ? "error" : "success"}
      />
    </>
  );
}
