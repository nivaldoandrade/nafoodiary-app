import { ErrorCode, getApiErrorCode } from '@/app/errors/apiErrors';
import { useAccount } from '@/app/hooks/queries/useAccount';
import { AuthTokenManager } from '@/app/libs/AuthTokenManager';
import { queryClient } from '@/app/libs/queryClient';
import { AccountsService } from '@/app/services/AccountsService';
import { AuthService } from '@/app/services/AuthService';
import { Service } from '@/app/services/Service';
import * as SplashScreen from 'expo-splash-screen';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface IAuthContext {
  shouldShowOnboarding: boolean;
  isSignedIn: boolean;
  isSignedUp: boolean;
  signIn: (params: AuthService.SignIn['params']) => Promise<void>;
  signUp: (params: AuthService.SignUp['params']) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithSocial: (response: AuthService.SignInWithSocial['response']) => Promise<boolean>;
  completeOnboarding: (profile: Omit<AccountsService.CompleteOnboardingParams, 'accessToken'>) => Promise<void>;
  completeSocialOnboarding: (response: AuthService.SignInWithSocial['response'], profile: Omit<AccountsService.CompleteOnboardingParams, 'accessToken'>) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
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
    setIsSignedUp(false);
    setShouldShowOnboarding(false);
  }, []);

  const setupAuth = useCallback(async (accessToken: string): Promise<boolean> => {

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

    const { data: account } = await loadAccount({ throwOnError: true });
    setIsSignedIn(true);

    const isOnboarded = account?.isOnboarded ?? false;
    setShouldShowOnboarding(!isOnboarded);

    return isOnboarded;
  }, [loadAccount, signOut]);

  const signInWithSocial = useCallback(
    async (response: AuthService.SignInWithSocial['response']): Promise<boolean> => {
      const { accessToken, refreshToken } = response;
      await AuthTokenManager.save({ accessToken, refreshToken });

      return setupAuth(response.accessToken);
    }, [setupAuth]);

  const completeOnboarding = useCallback(async (profile: Omit<AccountsService.CompleteOnboardingParams, 'accessToken'>) => {
    const storedTokens = await AuthTokenManager.get();

    if (!storedTokens) {
      throw new Error('No tokens available.');
    }

    await AccountsService.completeOnboarding({
      ...profile,
      accessToken: storedTokens.accessToken,
    }).catch(async (error) => {
      if (getApiErrorCode(error) === ErrorCode.INVALID_GRANT) {
        await AuthTokenManager.remove();
      }

      throw error;
    });

    const newTokens = await AuthService.refreshToken({
      refreshToken: storedTokens.refreshToken,
    });

    await AuthTokenManager.save(newTokens);
    await setupAuth(newTokens.accessToken);

    setIsSignedUp(true);
  }, [setupAuth]);

  const completeSocialOnboarding = useCallback(
    async (
      response: AuthService.SignInWithSocial['response'],
      profile: Omit<AccountsService.CompleteOnboardingParams, 'accessToken'>,
    ) => {
      await AuthTokenManager.save({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      await completeOnboarding(profile);
    }, [completeOnboarding]);

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
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        document.getElementById('pwa-splash')?.remove();
      }
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      shouldShowOnboarding,
      isSignedIn,
      isSignedUp,
      signIn,
      signUp,
      signOut,
      signInWithSocial,
      completeOnboarding,
      completeSocialOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
