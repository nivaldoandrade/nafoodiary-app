import { useAccount } from '@/app/hooks/queries/useAccount';
import { AuthTokenManager } from '@/app/libs/AuthTokenManager';
import { queryClient } from '@/app/libs/queryClient';
import { AuthService } from '@/app/services/AuthService';
import { Service } from '@/app/services/Service';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useCallback, useEffect, useState } from 'react';

interface IAuthContext {
  isSignedIn: boolean;
  isSignedUp: boolean;
  signIn: (params: AuthService.SignIn['params']) => Promise<void>;
  signUp: (params: AuthService.SignUp['params']) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const { loadAccount } = useAccount({ enabled: false });

  const signOut = useCallback(async () => {
    Service.removeAuthorizationToken();
    Service.removeInterceptorId();
    AuthTokenManager.remove();
    queryClient.clear();
    setIsSignedIn(false);
  }, []);

  const setupAuth = useCallback(async (accessToken: string) => {

    Service.setAuthorizationToken(accessToken);
    Service.setupRefreshInterceptor(async () => {
      try {
        const storedTokens = await AuthTokenManager.get();

        if (!storedTokens) {
          throw new Error('No tokens available.');
        }

        const newTokens = await AuthService.refreshToken({
          refreshToken: storedTokens.refreshToken,
        });

        await AuthTokenManager.save(newTokens);
        Service.setAuthorizationToken(newTokens.accessToken);
      } catch (error) {
        await signOut();
        throw error;
      }
    });

    await loadAccount({ throwOnError: true });
    setIsSignedIn(true);
  }, [loadAccount, signOut]);

  const signIn = useCallback(async (payload: AuthService.SignIn['params']) => {
    const response = await AuthService.signIn(payload);

    await AuthTokenManager.save(response);
    await setupAuth(response.accessToken);
  }, [setupAuth]);

  const signUp = useCallback(async (payload: AuthService.SignUp['params']): Promise<void> => {
    const response = await AuthService.signUp(payload);

    await AuthTokenManager.save(response);
    await setupAuth(response.accessToken);
    setIsSignedUp(true);
  }, [setupAuth]);

  useEffect(() => {
    async function getTokens() {
      try {
        const tokens = await AuthTokenManager.get();

        if (!tokens) {
          return;
        }

        await setupAuth(tokens.accessToken);

      } catch {
        await signOut();
      } finally {
        setAppIsReady(true);
      }
    }

    getTokens();
  }, [setupAuth, signOut]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      isSignedIn,
      isSignedUp,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
