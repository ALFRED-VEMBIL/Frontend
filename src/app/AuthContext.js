'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost:8080/feedspotclone/me.php', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      setAuthenticated(data.authenticated);
      setUser(data.user || null); // store full user object
    } catch (err) {
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const refreshAuth = () => {
    setLoading(true);
    return checkAuth();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
