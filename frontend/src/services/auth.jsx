import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const ROLE_CLIENT = "CLIENT";
const ROLE_ADMIN = "ADMIN";
const ROLE_DEV_ADMIN = "DEV_ADMIN";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser({
      id: 1,
      name: "Usuario Demo",
      email: "demo@example.com",
      role
    });
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, login, logout, roles: { ROLE_CLIENT, ROLE_ADMIN, ROLE_DEV_ADMIN } }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
