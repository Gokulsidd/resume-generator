'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';

export default function RegisterAdmin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if not admin
  // if (user && user.role !== 'admin') {
  //   router.push('/dashboard');
  //   return null;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register-admin', { username, email, password });
      alert('Admin registered successfully');
      setEmail('');
      setPassword('');
      router.push('/dashboard')
    } catch (error) {
      console.error('Admin registration failed', error);
      alert('Failed to register admin: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Register New Admin</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register Admin</button>
      </form>
    </div>
  );
}