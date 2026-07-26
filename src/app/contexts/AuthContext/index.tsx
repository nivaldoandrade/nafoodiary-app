import { useAccount } from '@/app/hooks/queries/useAccount';
import { AuthTokenManager } from '@/app/libs/AuthTokenManager';
import { queryClient } from '@/app/libs/queryClient';
import { AuthService } from '@/app/services/AuthService';
import { Service } from '@/app/services/Service';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useCallback, useEffect, useState } from 'react';

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
  const [appIsReady, setAppIsReady] = useState(false);

  const { loadAccount } = useAccount({ enabled: false });

  const setupAuth = useCallback(async (accessToken: string) => {
    Service.setAuthorizationToken(accessToken);
    await loadAccount();
    setIsSignedIn(true);
  }, [loadAccount]);

  useEffect(() => {
    async function getTokens() {
      try {
        const tokens = await AuthTokenManager.get();

        if (!tokens) {
          return;
        }

        await setupAuth(tokens.accessToken);
      } catch {

      } finally {
        setAppIsReady(true);
      }
    }

    getTokens();
  }, [setupAuth]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const signIn = useCallback(async (payload: AuthService.SignIn['params']) => {
    const response = await AuthService.signIn(payload);

    await AuthTokenManager.save(response);
    await setupAuth(response.accessToken);
  }, [setupAuth]);

  const signOut = useCallback(async () => {
    Service.removeAuthorizationToken();
    AuthTokenManager.remove();
    queryClient.clear();
    setIsSignedIn(false);
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
