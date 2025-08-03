import { useState, useEffect } from 'react';
import { User } from '@/types/movie';
import { getAuthState, loginUser, registerUser, logoutUser } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { user: storedUser, isAuthenticated: storedAuth } = getAuthState();
    setUser(storedUser);
    setIsAuthenticated(storedAuth);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const user = await registerUser(email, password, name);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
};