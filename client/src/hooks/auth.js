import { useState, useCallback, useEffect } from "react";

const userLocalDataName = "authData";

export function useAuth() {
  const [userToken, setUserToken] = useState(null);
  const [isReady, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((token, id) => {
    setUserToken(token);
    setUserId(id);
    localStorage.setItem(userLocalDataName, JSON.stringify({ userId: id, userToken: token }));
  }, []);

  const logout = useCallback(() => {
    setUserToken(null);
    setUserId(null);
    localStorage.removeItem(userLocalDataName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(userLocalDataName));
    if (data && data.userToken) {
      login(data.userToken, data.userId);
    }
    setReady(true);
  }, [login]);

  return { login, logout, userToken, userId, isReady };
}
