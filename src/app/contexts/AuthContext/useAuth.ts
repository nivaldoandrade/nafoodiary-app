import { AuthContext } from '@/app/contexts/AuthContext';
import { use } from 'react';

export function useAuth() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used inside <AuthProvider />');
  }

  return value;

}
