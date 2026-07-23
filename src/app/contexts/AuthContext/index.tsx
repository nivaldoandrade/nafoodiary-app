import { AuthService } from '@/app/services/AuthService';
import { createContext, useCallback, useState } from 'react';

interface IAuthContext {
  isSignedIn: boolean;
  signIn: (params: AuthService.SignIn['params']) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = useCallback(async (payload: AuthService.SignIn['params']) => {
    const response = await AuthService.signIn(payload);
    console.log(response);
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    setIsSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
