'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/profile/');
      setUser({ username: response.data.username, email: response.data.email, role: response.data.role });
    } catch (error) {
      console.error('Failed to fetch user', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, userName, userEmail, userRole } = response.data;
      Cookies.set('token', access_token, { expires: 1 }); // 1 day expiry
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      setUser({ username: userName, email: userEmail, role: userRole })

      if (access_token) {
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (username,email, password) => {
    try {
      const response = await api.post('/auth/register', { username, email, password });
      const { access_token, user, role } = response.data;
      Cookies.set('token', access_token, { expires: 1 });
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      if (access_token) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const registerAdmin = async (username,email, password) => {
    try {
      const response = await api.post('/auth/register-admin', { username, email, password });
      const { access_token, user, role } = response.data;
      Cookies.set('token', access_token, { expires: 1 });
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      if (access_token) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    router.push('/auth/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading component
  }

  return (
    <AuthContext.Provider value={{ user, login, register,registerAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
