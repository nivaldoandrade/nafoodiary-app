import { createContext, useState } from 'react';

interface IAuthContext {
  isSignedIn: boolean;
}

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProvider {
  children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {

  const [isSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
