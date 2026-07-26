import { AuthTokenManager } from '@/app/libs/AuthTokenManager';
import { AuthService } from '@/app/services/AuthService';
import { createContext, useCallback, useLayoutEffect, useState } from 'react';

interface IAuthContext {
  isSignedIn: boolean;
  signIn: (params: AuthService.SignIn['params']) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {

  const [isSignedIn, setIsSignedIn] = useState(false);

  useLayoutEffect(() => {
    async function getTokens() {
      const tokens = await AuthTokenManager.get();

      if (!tokens) {
        return;
      }

      setIsSignedIn(true);
    }

    getTokens();
  }, []);

  const signIn = useCallback(async (payload: AuthService.SignIn['params']) => {
    const response = await AuthService.signIn(payload);

    await AuthTokenManager.save(response);
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    AuthTokenManager.remove();
    setIsSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
