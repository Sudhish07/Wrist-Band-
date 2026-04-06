import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [expiry, setExpiry] = useState(() => {
    const savedExpiry = localStorage.getItem("token_expiry");
    return savedExpiry ? Number(savedExpiry) : null;
  });

  const login = (newToken, newUser = null, expiresInMs = 6 * 60 * 60 * 1000) => {
    const expiresAt = Date.now() + expiresInMs;

    localStorage.setItem("token", newToken);
    localStorage.setItem("token_expiry", String(expiresAt));
    setToken(newToken);
    setExpiry(expiresAt);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_expiry");
    setToken(null);
    setUser(null);
    setExpiry(null);
  };

  useEffect(() => {
    if (!token || !expiry) return;

    if (Date.now() >= expiry) {
      logout();
      return;
    }

    const timeout = setTimeout(() => {
      logout();
    }, expiry - Date.now());

    return () => clearTimeout(timeout);
  }, [token, expiry]);

  const value = useMemo(
    () => ({
      token,
      user,
      expiry,
      isAuthenticated: !!token && !!expiry && Date.now() < expiry,
      isAdmin: user?.role === "admin",
      login,
      logout,
    }),
    [token, user, expiry]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };