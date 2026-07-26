import { useAccount } from '@/app/hooks/queries/useAccount';
import { AuthTokenManager } from '@/app/libs/AuthTokenManager';
import { queryClient } from '@/app/libs/queryClient';
import { AuthService } from '@/app/services/AuthService';
import { Service } from '@/app/services/Service';
import { createContext, useCallback, useLayoutEffect, useReducer } from 'react';

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

  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const { account, loadAccount } = useAccount({ enabled: false });

  useLayoutEffect(() => {
    async function getTokens() {
      const tokens = await AuthTokenManager.get();

      if (!tokens) {
        return;
      }
      Service.setAuthorizationToken(tokens.accessToken);
      await loadAccount();
    }

    getTokens();
  }, [loadAccount]);

  const signIn = useCallback(async (payload: AuthService.SignIn['params']) => {
    const response = await AuthService.signIn(payload);

    await AuthTokenManager.save(response);
    Service.setAuthorizationToken(response.accessToken);
    await loadAccount();
  }, [loadAccount]);

  const signOut = useCallback(async () => {
    AuthTokenManager.remove();
    queryClient.clear();
    forceUpdate();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn: !!account, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
