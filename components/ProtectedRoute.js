'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../app/contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/unauthorized');
    } else if (!allowedRoles.includes(user.role)) {
      router.push('/unauthorized');
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
